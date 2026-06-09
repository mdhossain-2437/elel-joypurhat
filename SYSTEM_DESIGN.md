# System Design

## Public Website

- `/` is a mostly static landing page using SSG for fast delivery.
- Official project media is stored in `apps/web/public/media`.
- Branch, admission, course, staff, district, and contact data lives in `apps/web/src/lib/content.ts`.

## Result Portals

- `/results/admission`: candidate lookup by roll number and phone number.
- `/results/monthly`: monthly exam lookup by phone number only.
- Current MVP uses seeded local data in `apps/web/src/lib/results.ts`.
- Production should replace local data with a server-side query from published result batches only.

## Merit Rule

Admission merit is generated from `written + viva`, sorted descending.
Same total marks share the same merit rank.
Default ranking sequence is standard competition ranking: `1, 1, 3`.

## CRM Model

Recommended production tables:

- `admins`: identity, role, password hash, status, timestamps.
- `admin_invitations`: invited email, role, invited_by, owner_approved_at, token_hash.
- `password_reset_tokens`: admin_id, token_hash, expires_at, used_at.
- `result_batches`: type, title, batch_name, status, published_at, created_by.
- `result_rows`: batch_id, roll, phone_hash, marks, status, metadata.
- `audit_logs`: actor_id, action, entity_type, entity_id, request_ip, created_at.
- `applicants`: admission form data, photo object key, admit card roll, status.

## Rendering Strategy

- Public homepage: SSG.
- Result pages: static shell with client-side demo lookup now; production should use Server Actions or Route Handlers with rate limiting.
- Admin routes: SSR with server-side authorization checks in every route.
- Static branch/course content: ISR when moved to CMS.
