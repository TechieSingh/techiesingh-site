# techiesingh.com

Personal site of Aditya Singh: a public portfolio plus an invite-only learning space.

| Area | What it is | Who sees it |
| --- | --- | --- |
| `/`, `/projects`, `/resume`, `/contact` | Portfolio | Everyone |
| `/blog` | Journal entries the owner chose to publish | Everyone |
| `/learn` | GoalForge — study plan, review queue, progress (synced to your account) | Signed-in members, each sees only their own |
| `/journal` | Private journal; entries can attach that day's study from Learn | Signed-in members, each sees only their own |
| `/admin` | Invite and remove members | Owner only |

**Stack:** Next.js 16 (App Router) on Vercel · Supabase (Postgres + Auth, row-level security) · GoalForge as a static app in `public/learn`.

## Editing content
All public text lives in **`src/content/profile.ts`**: bio, links, projects and resume. Empty fields are hidden. Blog posts are written in the Journal and published with the “Publish on the blog” switch.

## One-time setup

### 1. Supabase (sign-in and storage)
1. Create a project at [supabase.com](https://supabase.com) (the free tier is enough).
2. **SQL Editor** → paste and run `supabase/migrations/20261023000000_init.sql`.
3. **Authentication → Sign In / Providers → Email**: keep Email enabled, and turn **off** “Allow new users to sign up” (membership is by invitation only).
4. **Authentication → URL Configuration**: Site URL `https://techiesingh.com`; add redirect URLs `https://techiesingh.com/**` and `https://*-adityas-projects-b3917679.vercel.app/**` (preview deployments).
5. **Authentication → Emails → Templates**. So links work even when opened on another device, change the link in two templates:
   - *Magic Link*: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=magiclink&next=/journal`
   - *Invite user*: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite&next=/welcome`
6. Recommended: **Authentication → Emails → SMTP** — connect a sender such as Resend. Supabase’s built-in mailer only sends a few emails per hour.
7. **Authentication → Users → Invite user** → your own email. Then make yourself the owner (SQL Editor):
   ```sql
   update public.profiles set role = 'owner' where email = 'YOUR-EMAIL';
   ```

### 2. Vercel
1. Import this repository as a new project (framework: Next.js; no other settings needed).
2. Environment variables (Production and Preview), from Supabase → Project Settings → API:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret; used only for inviting/removing members)
   - `NEXT_PUBLIC_SITE_URL=https://techiesingh.com`
3. **Settings → Domains** → add `techiesingh.com` and `www.techiesingh.com`, then set the DNS records Vercel shows at your domain registrar.

Until Supabase is connected the public pages work and the private area shows that sign-in isn’t set up.

## Development
```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000
npm test                     # site tests + GoalForge tests
```

- `tests/database.test.ts` runs the real migration in PGlite and checks the security rules (privacy between members, owner-only publishing, cascade deletes).
- `goalforge/` holds GoalForge’s tests and the plan builder (`npm run build-plan`). The app itself is in `public/learn`.

## How sync works
GoalForge keeps a copy in the browser so it is fast and works offline. When it runs on this site it loads your account copy at start, merges (the newest version of each item wins, deletions are kept), and sends every change back within a couple of seconds. If someone else signs in on the same browser, the previous person’s local copy is cleared first.
