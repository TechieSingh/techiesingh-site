-- techiesingh.com — initial schema
--
-- Everything is protected by row-level security (RLS): a signed-in person can only read and
-- write their own rows. The only public data is journal entries that the site owner has
-- chosen to publish as blog posts.
--
-- Run this once in the Supabase SQL editor (or with `supabase db push`).

-- ------------------------------------------------------------------------------------------
-- Profiles: one row per account, created automatically when a user is invited.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  role text not null default 'member' check (role in ('owner', 'member')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Is this user the site owner? Security definer so policies can call it without recursion.
create or replace function public.is_site_owner(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.profiles where id = uid and role = 'owner');
$$;

revoke all on function public.is_site_owner(uuid) from public;
grant execute on function public.is_site_owner(uuid) to anon, authenticated;

drop policy if exists "profiles: read own, owner reads all" on public.profiles;
create policy "profiles: read own, owner reads all" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_site_owner(auth.uid()));

-- People may change their display name (the column grant at the end allows nothing else).
drop policy if exists "profiles: update own name" on public.profiles;
create policy "profiles: update own name" on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, split_part(coalesce(new.email, ''), '@', 1))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------------------------------------
-- GoalForge data: the whole learning state of one person as a JSON document.

create table if not exists public.learn_state (
  user_id uuid primary key references auth.users (id) on delete cascade default auth.uid(),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.learn_state enable row level security;

drop policy if exists "learn_state: own row" on public.learn_state;
create policy "learn_state: own row" on public.learn_state
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ------------------------------------------------------------------------------------------
-- Journal

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  entry_date date not null default current_date,
  title text not null default '' check (char_length(title) <= 200),
  body text not null default '' check (char_length(body) <= 100000),
  mood smallint check (mood between 1 and 5),
  -- Link to what was studied that day in GoalForge (a snapshot, so it survives plan changes).
  goal_id text,
  study_day_id text,
  study_summary jsonb,
  -- Publishing (site owner only, enforced below).
  is_public boolean not null default false,
  slug text unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  excerpt text check (char_length(excerpt) <= 400),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_needs_slug check (not is_public or slug is not null)
);

create index if not exists journal_entries_user_date on public.journal_entries (user_id, entry_date desc);
create index if not exists journal_entries_public on public.journal_entries (published_at desc) where is_public;

alter table public.journal_entries enable row level security;

drop policy if exists "journal: read own" on public.journal_entries;
create policy "journal: read own" on public.journal_entries
  for select to authenticated
  using (user_id = auth.uid());

-- Anyone (signed in or not) can read entries the site owner has published.
drop policy if exists "journal: read published" on public.journal_entries;
create policy "journal: read published" on public.journal_entries
  for select to anon, authenticated
  using (is_public and public.is_site_owner(user_id));

drop policy if exists "journal: insert own" on public.journal_entries;
create policy "journal: insert own" on public.journal_entries
  for insert to authenticated
  with check (user_id = auth.uid() and (not is_public or public.is_site_owner(auth.uid())));

drop policy if exists "journal: update own" on public.journal_entries;
create policy "journal: update own" on public.journal_entries
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and (not is_public or public.is_site_owner(auth.uid())));

drop policy if exists "journal: delete own" on public.journal_entries;
create policy "journal: delete own" on public.journal_entries
  for delete to authenticated
  using (user_id = auth.uid());

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists journal_entries_touch on public.journal_entries;
create trigger journal_entries_touch
  before update on public.journal_entries
  for each row execute function public.touch_updated_at();

drop trigger if exists learn_state_touch on public.learn_state;
create trigger learn_state_touch
  before update on public.learn_state
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------------------------------------
-- Table privileges (RLS decides which rows).

grant select on public.journal_entries to anon;
grant select, insert, update, delete on public.journal_entries to authenticated;
grant select, insert, update on public.learn_state to authenticated;
grant select, update (display_name) on public.profiles to authenticated;
