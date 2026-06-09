# UI/UX And Visibility Audit

## Current Direction

The website now uses a premium institute interface: light cream background, green ELEL identity, orange action color, clean cards, journey sections, mobile-first navigation and table-first CMS controls.

Reference-inspired improvements:
- Event-style pass cards for admission, class and result flows.
- Course journey rail for learning steps.
- Scroll-stacked cards for program growth.
- Clean timeline and project architecture sections.
- Light theme maintained across dark-inspired sections to avoid unreadable text.

## Visibility Fixes

Checked and improved:
- White text is used only on dark or accent button backgrounds.
- Light sections use dark body text and green/orange accents.
- Mobile heading sizes use `clamp()` with stable limits.
- Buttons become full-width on mobile content areas, while header buttons stay compact.
- CMS tables use dark text on light rows.
- Result, notice and admin cards use stronger text contrast.

## Mobile UX

Verified:
- Hamburger menu is visible on mobile.
- Mobile menu includes home, courses, projects, notices, admission result, monthly result and contact.
- Text size stays readable on 390px viewport.
- Header does not overflow.
- Tables scroll horizontally instead of breaking layout.

## CMS UX

Improved:
- Results, notices, courses, team, media and admins are shown in tables.
- Each table has search.
- Each table has status/type filter.
- Sortable columns are available.
- Rows have edit, publish, hide/archive and delete actions where relevant.
- Result import includes guidance: after import, rows can be edited from the database table.

## Remaining Production Recommendation

For final client delivery, replace local JSON storage with PostgreSQL. The UI and routes are ready for that change, but persistent production data should live in a database, not a serverless file.

