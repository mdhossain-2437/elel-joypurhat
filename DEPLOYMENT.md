# Deployment Guide (Vercel + Neon)

This app is a single Next.js 16 application. Public pages, result lookups, and
the admin CMS all live in `apps/web`. CMS content is stored as one JSONB
document in Postgres (Neon) so every admin edit is durable on serverless.

## What changed for production

The CMS used to read/write a local JSON file (`apps/web/data/cms-store.json`).
That cannot work on Vercel: the serverless filesystem is read-only and the file
is not bundled into the function. The data layer now works like this:

- **Reads** come from Postgres when `DATABASE_URL` is set. A bundled seed
  (`apps/web/src/data/cms-seed.json`) is imported into the build, so public
  pages never 500 even before the database is connected.
- **Writes** (publish notice/result, edit course, change admin password) go to
  Postgres. Without `DATABASE_URL` they fall back to an in-memory store (fine for
  local dev, not durable on serverless — so set `DATABASE_URL` in production).
- The whole store is a single row in a `cms_document` table. No migration of the
  existing merit/upsert logic was required.

## 1. Create the database (Neon)

1. Create a project at https://neon.tech and copy the **pooled** connection
   string (it contains `-pooler` and ends with `?sslmode=require`).
2. Locally, put it in `apps/web/.env` as `DATABASE_URL=...`.

## 2. Seed the database

From `apps/web`:

```bash
npm install
DATABASE_URL="postgres://...sslmode=require" npm run db:seed       # seed if empty
DATABASE_URL="postgres://...sslmode=require" npm run db:seed -- --force  # overwrite
```

The app also auto-seeds on first read if the table is empty, so this step is
optional but recommended for a predictable first deploy.

## 3. Environment variables

Set these in Vercel → Project → Settings → Environment Variables (and in
`apps/web/.env` for local dev). See `.env.example`.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string (durable CMS). |
| `NEXT_PUBLIC_SITE_URL` | Final public URL (SEO canonical, sitemap, OG). |
| `ADMIN_EMAIL` / `ADMIN_NAME` | Bootstrap owner admin. |
| `ADMIN_PASSWORD_HASH` | pbkdf2 hash — generate, do not store the raw password. |
| `ADMIN_RECOVERY_TOKEN` | Private emergency password-reset code. |
| `ADMIN_SESSION_SECRET` | Long random string for signing session cookies. |
| `SMS_API_KEY` / `SMS_SENDER_ID` / `EMAIL_API_KEY` | Optional providers. |

Generate the admin password hash and session secret:

```bash
node apps/web/scripts/hash-password.mjs "YourStrongPassw0rd!"
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

### ⚠️ `.env` files expand `$` — escape it

The pbkdf2 hash contains `$` (e.g. `pbkdf2$210000$salt$hash`). In a **`.env`
file**, Next.js (dotenv) treats `$...` as variable interpolation and will silently
truncate the value. Escape each `$` with a backslash **only in `.env` files**:

```ini
ADMIN_PASSWORD_HASH=pbkdf2\$210000\$salt\$hash
```

In the **Vercel dashboard** there is no `$` expansion — paste the raw hash
(`pbkdf2$210000$salt$hash`) with no backslashes.

## 4. Deploy

1. Push to GitHub and import the repo into Vercel (framework preset: Next.js,
   root directory `apps/web` or the monorepo root — the root `build` script
   targets `apps/web`).
2. Add the environment variables above.
3. Deploy, then smoke-test: home, mobile menu, admission + monthly result
   lookup, admin login, publish a notice/result, `/sitemap.xml`, `/robots.txt`.

## Notes

- The single-document store is ideal for this site's scale (one branch, a few
  admins). If concurrent admin writes ever become heavy, split `cms_document`
  into normalized tables (see `SYSTEM_DESIGN.md`).
- Rate limiting and the security headers live in `apps/web/src/proxy.ts`.
