// Runs the real migration in PGlite (Postgres compiled to WebAssembly) with a minimal stand-in
// for Supabase's auth schema, then checks the row-level security rules as different users.
import { describe, it, expect, beforeAll } from 'vitest';
import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import path from 'node:path';

const OWNER = '11111111-1111-1111-1111-111111111111';
const MEMBER = '22222222-2222-2222-2222-222222222222';
const migration = fs.readFileSync(path.join(import.meta.dirname, '../supabase/migrations/20261023000000_init.sql'), 'utf8');

let db: PGlite;

// Supabase-like roles and auth.uid(), driven by a session setting.
const SUPABASE_STUB = `
  create role anon nologin;
  create role authenticated nologin;
  create schema auth;
  grant usage on schema auth to anon, authenticated;
  grant usage on schema public to anon, authenticated;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;
  grant execute on function auth.uid() to anon, authenticated;
`;

async function as<T>(role: 'anon' | 'authenticated', uid: string | null, sql: string, params: unknown[] = []) {
  await db.exec(`reset role; select set_config('request.jwt.claim.sub', '${uid ?? ''}', false); set role ${role};`);
  try {
    return (await db.query<T>(sql, params)).rows;
  } finally {
    await db.exec('reset role;');
  }
}

beforeAll(async () => {
  db = new PGlite();
  await db.exec(SUPABASE_STUB);
  await db.exec(migration);
  await db.exec(`insert into auth.users (id, email) values ('${OWNER}', 'owner@example.com'), ('${MEMBER}', 'member@example.com');`);
  await db.exec(`update public.profiles set role = 'owner' where id = '${OWNER}';`);
});

describe('database security', () => {
  it('creates a profile for every new user', async () => {
    const rows = (await db.query<{ email: string; role: string }>('select email, role from public.profiles order by email')).rows;
    expect(rows).toEqual([{ email: 'member@example.com', role: 'member' }, { email: 'owner@example.com', role: 'owner' }]);
  });

  it('keeps each person’s learning data private', async () => {
    await as('authenticated', OWNER, `insert into public.learn_state (data) values ('{"who":"owner"}')`);
    await as('authenticated', MEMBER, `insert into public.learn_state (data) values ('{"who":"member"}')`);
    const seenByMember = await as<{ data: { who: string } }>('authenticated', MEMBER, 'select data from public.learn_state');
    expect(seenByMember.map(r => r.data.who)).toEqual(['member']);
    const seenByAnon = await as('anon', null, 'select data from public.learn_state').catch(e => String(e));
    expect(String(seenByAnon)).toMatch(/permission denied/);
    // A member cannot write a row for someone else.
    await expect(as('authenticated', MEMBER, `insert into public.learn_state (user_id, data) values ('${OWNER}', '{}')`)).rejects.toThrow();
  });

  it('keeps private journal entries private', async () => {
    await as('authenticated', OWNER, `insert into public.journal_entries (title, body) values ('owner private', 'x')`);
    await as('authenticated', MEMBER, `insert into public.journal_entries (title, body) values ('member private', 'y')`);
    const member = await as<{ title: string }>('authenticated', MEMBER, 'select title from public.journal_entries');
    expect(member.map(r => r.title)).toEqual(['member private']);
    const anon = await as<{ title: string }>('anon', null, 'select title from public.journal_entries');
    expect(anon).toEqual([]);
    // Updating or deleting someone else's entry silently affects nothing.
    await as('authenticated', MEMBER, `update public.journal_entries set title = 'hacked' where title = 'owner private'`);
    await as('authenticated', MEMBER, `delete from public.journal_entries where title = 'owner private'`);
    const owner = await as<{ title: string }>('authenticated', OWNER, 'select title from public.journal_entries');
    expect(owner.map(r => r.title)).toEqual(['owner private']);
  });

  it('only the site owner can publish, and visitors see only published posts', async () => {
    await as('authenticated', OWNER, `insert into public.journal_entries (title, body, is_public, slug, published_at) values ('Hello world', 'hi', true, 'hello-world', now())`);
    await expect(as('authenticated', MEMBER, `insert into public.journal_entries (title, is_public, slug) values ('spam', true, 'spam')`)).rejects.toThrow(/row-level security/);
    await expect(as('authenticated', MEMBER, `update public.journal_entries set is_public = true, slug = 'mine' where title = 'member private'`)).rejects.toThrow(/row-level security/);
    const anon = await as<{ title: string }>('anon', null, 'select title from public.journal_entries');
    expect(anon.map(r => r.title)).toEqual(['Hello world']);
    const member = await as<{ title: string }>('authenticated', MEMBER, 'select title from public.journal_entries order by title');
    expect(member.map(r => r.title)).toEqual(['Hello world', 'member private']);
  });

  it('cannot publish without a valid slug', async () => {
    await expect(as('authenticated', OWNER, `insert into public.journal_entries (title, is_public) values ('no slug', true)`)).rejects.toThrow(/published_needs_slug/);
    await expect(as('authenticated', OWNER, `insert into public.journal_entries (title, is_public, slug) values ('bad', true, 'Bad Slug!')`)).rejects.toThrow();
  });

  it('members cannot promote themselves to owner', async () => {
    await expect(as('authenticated', MEMBER, `update public.profiles set role = 'owner' where id = '${MEMBER}'`)).rejects.toThrow(/permission denied/);
    await as('authenticated', MEMBER, `update public.profiles set display_name = 'Sam' where id = '${MEMBER}'`);
    const me = await as<{ display_name: string; role: string }>('authenticated', MEMBER, `select display_name, role from public.profiles where id = '${MEMBER}'`);
    expect(me).toEqual([{ display_name: 'Sam', role: 'member' }]);
    // Members only see their own profile; the owner sees everyone.
    expect((await as('authenticated', MEMBER, 'select id from public.profiles')).length).toBe(1);
    expect((await as('authenticated', OWNER, 'select id from public.profiles')).length).toBe(2);
  });

  it('removing a user removes all their data', async () => {
    await db.exec(`delete from auth.users where id = '${MEMBER}'`);
    const left = await db.query<{ n: number }>(`select (select count(*) from public.journal_entries where user_id = '${MEMBER}')::int + (select count(*) from public.learn_state where user_id = '${MEMBER}')::int as n`);
    expect(left.rows[0].n).toBe(0);
  });
});
