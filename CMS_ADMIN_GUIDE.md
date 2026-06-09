# ELEL Joypurhat CMS/Admin Guide

## Local Admin Login

- URL: `http://localhost:3000/admin/login`
- Email: `owner@eleljoypurhat.local`
- Password: `Demo@12345`
- Role: `OWNER`

## What The CMS Controls

- Notices: create draft/published notices for `/notices`.
- Courses: add government projects, paid courses, and workshops for `/courses` and homepage featured cards.
- Admission results: publish private roll + phone lookup results.
- Monthly results: publish private phone-only class test results.
- Audit logs: every admin action is tracked in the local CMS database.

## Local Database

The current MVP uses a lightweight local JSON database:

```txt
apps/web/data/cms-store.json
```

This keeps the project fast on a local machine and avoids extra RAM-heavy database services during UI/CMS development.

## Security Model

- Signed `httpOnly` admin session cookie.
- Protected admin pages via Next.js Proxy.
- Protected admin APIs via server-side role checks.
- No public merit list.
- Result lookup requires candidate-specific data.
- Security headers and CSP are applied globally.
- `robots.txt` blocks `/admin` and `/api/admin`.

## Production Migration

Before live deployment:

1. Move `cms-store.json` data into Neon/Postgres.
2. Replace local JSON read/write functions in `src/lib/cms-store.ts` with database queries.
3. Set `ADMIN_SESSION_SECRET` in production environment.
4. Add SMS provider credentials if SMS delivery is required.
5. Add rate limiting for public result lookup endpoints.
