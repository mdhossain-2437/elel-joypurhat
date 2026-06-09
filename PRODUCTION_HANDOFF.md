# Production Handoff

## Hosting Plan

Recommended setup: one Next.js application hosted on Vercel, with one managed PostgreSQL database on Neon.

Why one application is enough:
- Public website, result lookup API, admin CMS, sitemap and robots are all inside the same Next.js app.
- The API routes are lightweight and do not require a separate backend server.
- One deployment keeps domain, SSL, SEO, admin routes and public routes easier to manage.

Use two services only if the client later needs a separate mobile app API, heavy file processing, SMS gateway worker, or a large external CRM.

## Database Plan

Current starter mode:
- CMS data is stored in `apps/web/data/cms-store.json`.
- This is good for local demo, testing, and client preview.
- It is not the final production database for a serverless deployment, because serverless file changes are not guaranteed to persist.

Production mode:
- Use Neon PostgreSQL as the permanent database.
- Data saved there will remain even after deploys, restarts, or server scaling.
- Tables should cover: admins, notices, courses, team members, media assets, admission results, monthly results, site settings and audit logs.

Recommended environment variables:

```txt
DATABASE_URL=postgresql://...
ADMIN_EMAIL=admin@example.com
ADMIN_NAME=ELeL Joypurhat Admin
ADMIN_PASSWORD_HASH=pbkdf2$iterations$salt$hash
ADMIN_SESSION_SECRET=long-random-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
SMS_API_KEY=
SMS_SENDER_ID=
EMAIL_API_KEY=
```

Credentials needed for final setup:
- GitHub repository access for deployment updates.
- Vercel account or team access for hosting.
- Domain DNS access for custom domain and SSL.
- Neon PostgreSQL connection string for the live database.
- SMS provider API key and sender ID if SMS result/notice alerts are enabled.
- Email provider key if password reset or notice email is enabled.
- A strong admin session secret generated for production only.
- Private admin email and password hash. These must be set in Vercel/hosting env, not committed to GitHub.

## Admin CMS

Built-in admin features:
- Secure admin login with session cookie.
- Role-aware admin/API protection.
- Notice, course, team, media and result management.
- Admission result and monthly result publishing.
- Monthly result Lab A, Lab B, Lab C support.
- Monthly result all-lab merit and lab-wise merit mode.
- CSV/TSV result import.
- Data tables with search, status filter, column sort and row actions.
- Imported result rows can be edited from the result database table.
- Publish, hide/archive and delete controls.
- Audit log for content changes.

Admin credentials are intentionally not published in this repository. The seed data contains only a locked placeholder admin; the real admin account is loaded from private environment variables. Share the login only with the project owner or authorized manager, then change it before final handoff.

## SEO Checklist

Already included:
- Dynamic metadata in `layout.tsx`.
- Open Graph and Twitter metadata.
- `robots.txt` route.
- `sitemap.xml` route.
- Structured organization data.
- Bangla page titles and descriptions.
- Public pages for home, courses, project, notices and result lookup.

Before live launch:
- Set `NEXT_PUBLIC_SITE_URL` to the final domain.
- Connect Google Search Console.
- Submit `/sitemap.xml`.
- Add real Open Graph image if the client wants branded social preview.

## Deployment Steps

1. Push the repository to GitHub.
2. Import the GitHub repo into Vercel.
3. Add environment variables.
4. Connect Neon PostgreSQL.
5. Run database migration/seed script when the database layer is connected.
6. Add custom domain.
7. Test:
   - Home page
   - Mobile menu
   - Admission result lookup
   - Monthly result lookup
   - Admin login
   - Notice/course/result publish
   - Sitemap and robots
