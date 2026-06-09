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
ADMIN_SESSION_SECRET=long-random-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Admin CMS

Built-in admin features:
- Secure admin login with session cookie.
- Role-aware admin/API protection.
- Notice, course, team, media and result management.
- Admission result and monthly result publishing.
- CSV/TSV result import.
- Data tables with search, status filter, column sort and row actions.
- Imported result rows can be edited from the result database table.
- Publish, hide/archive and delete controls.
- Audit log for content changes.

Demo admin:

```txt
Email: owner@eleljoypurhat.local
Password: Demo@12345
```

Change this before production handoff.

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

