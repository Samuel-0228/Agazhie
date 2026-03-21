# Changelog

All notable changes to the አጋዤ platform are documented here.
Format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased] – Production-Readiness Overhaul (March 2025)

### Added

- **Terms of Service page** (`/terms`) — full legal boilerplate covering acceptance,
  service description, payments/escrow, prohibited conduct, IP, liability, and governing
  law (Ethiopia). Linked from footer.
- **Privacy Policy page** (`/privacy`) — covers data collection, use, sharing, retention,
  security (HTTPS/TLS, RLS), cookies, children's privacy, and user rights. Linked from footer.
- **Help Center page** (`/help`) — FAQ page organised by category (Getting Started,
  Payments, Tutor Verification, Ratings). Linked from footer.
- **Contact Us page** (`/contact`) — contact form with Telegram, email, and phone options.
  Form POSTs to `/api/contact`.
- **API route `/api/requests` (POST/GET)** — saves tutor requests to the `tutor_requests`
  Supabase table. Validates all fields with Zod. Supports per-user and admin-level reads.
- **API route `/api/applications` (POST/GET)** — saves tutor applications to
  `tutor_applications`. Returns 409 on duplicate email. Admin-only GET.
- **API route `/api/admin/applications/[id]` (PATCH)** — approve or reject a tutor
  application. On approval, upserts a matching record into the `tutors` table.
  Requires admin role check.
- **API route `/api/tutors` (GET)** — list tutors from DB with filters: subject, location,
  rate range, verified status, search term. Paginated (max 50 per page). Enriched with
  profile name from `profiles` table.
- **API route `/api/contact` (POST)** — accepts contact form submissions. Optionally
  forwards to a webhook URL configured via `CONTACT_WEBHOOK_URL` env var.
- **`.env.example`** — comprehensive template listing all required and optional environment
  variables: Supabase, Telebirr, Firebase, SMS gateway, n8n webhook, commission rate.
- **`CHANGELOG.md`** — this file.

### Fixed

- **`middleware.ts`**: Renamed export from `proxy` → `middleware`. Next.js requires the
  default middleware export to be named `middleware` for it to execute on incoming requests.
  Previously the middleware was silently doing nothing.
- **Google Fonts build resilience**: Added `display: 'optional'` to both `Inter` and
  `Noto Sans Ethiopic` font configs. This prevents build failures in offline/restricted
  CI environments while keeping fonts working in production.

### Changed

- **`/app/request/page.tsx`**: `handleSubmit` now POSTs to `/api/requests` instead of
  simulating a delay. The Telegram draft and account-creation options still appear after
  submission regardless of API success (graceful degradation).
- **`/app/become-tutor/page.tsx`**: `handleSubmit` now POSTs to `/api/applications`.
  Returns proper errors on validation failure and 409 on duplicate email.
- **`/app/admin/applications/page.tsx`**: `handleAppStatus` now calls
  `/api/admin/applications/[id]` via PATCH for approve/reject actions, with optimistic UI
  and rollback on failure.

### Design Decisions / Defaults

- **Commission rate**: Defaulted to 20% (configurable via `PLATFORM_COMMISSION_PERCENT`).
  This sits in the middle of the 15–25% range stated in the brief.
- **Contact page**: Phone number is a placeholder (`+251 911 000 000`). Replace with the
  real number before launching.
- **Legal pages**: Dates and email addresses (`legal@agazhie.com`, `privacy@agazhie.com`,
  `support@agazhie.com`) are placeholders. Update before launch.
- **Tutor document uploads**: File references are stored client-side in state but not yet
  uploaded to Supabase Storage. To complete this flow, integrate Supabase `storage.upload`
  in `become-tutor/page.tsx` and save the resulting URL to `tutor_applications`.
- **Telegram draft**: The pre-filled Telegram link uses `https://t.me/agazhie?text=...`.
  Telegram opens this as a draft message to `@agazhie`; the user must press Send manually.
