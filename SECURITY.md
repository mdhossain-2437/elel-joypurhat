# Security Notes

## Current MVP

- The admin page is a CRM preview, not a real authenticated dashboard.
- `/api/admin/results/import` returns a JSON architecture placeholder.
- Result data is seeded locally for demo testing.

## Production Requirements

- Hash admin passwords with Argon2id or bcrypt.
- Store phone numbers encrypted or store a keyed lookup hash plus masked display value.
- Rate-limit result lookup, login, password reset, and CSV upload.
- Recheck admin role in every Server Component, Server Action, and Route Handler.
- Do not rely on middleware/proxy as the only authorization layer.
- Validate CSV files with a strict schema before import.
- Keep result batches in draft until a permitted admin publishes them.
- Write audit logs for login, invite, approval, import, publish, rollback, and password reset.
- Require owner approval before a new admin account becomes active.

## Audit Note

`npm audit` currently reports a moderate PostCSS advisory through Next.js 16.2.7's nested dependency chain. The attempted root override for `postcss@8.5.10+` does not silence npm's advisory because it is attributed through Next's declared dependency tree. Avoid `npm audit fix --force` here because npm suggests a breaking downgrade path. Recheck when a patched Next.js stable release is available.
