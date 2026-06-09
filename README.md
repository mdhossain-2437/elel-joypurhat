# ELEL Joypurhat Branch

Industry-grade Next.js 16 starter for E-Learning & Earning Ltd Joypurhat Branch and the Department of Youth Development freelancing training flow.

## Stack

- Next.js 16.2.7 App Router
- React 19.2.7
- Tailwind CSS 4.3
- Turbopack dev server
- npm workspaces + Turborepo-ready root
- Seeded public content, admission result lookup, monthly result lookup, and admin CRM preview

## Run

```bash
cd apps/web
npm install
npm run dev
```

Open `http://localhost:3000`.

## Suggested Production Additions

- Neon Postgres + Drizzle ORM for applicants, admins, invitations, result batches, audit logs, and uploaded file metadata.
- Auth.js or custom session auth with server-side role checks in every Server Component, Server Action, and Route Handler.
- Resend or SMTP for password reset and owner-approved admin invitations.
- Object storage for admit-card photos and CSV import archives.
- Rate limiting on result lookup, admin login, password reset, and upload endpoints.
