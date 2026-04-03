# Supabase Integration Implementation Plan

This plan details how we will convert the Goongoon/Agazhie frontend into a fully functional backend-connected application using Supabase.

## User Review Required

> [!IMPORTANT]
> Please review the Database Schema and the Auth Strategy before we start the implementation to make sure they align perfectly with your business requirements.

## 1. Frontend Interactions & Backend Mapping

### Parents / Students
- **Browse Tutors** (`/tutors`): READ `tutors` (approved users).
- **Filter Tutors**: READ `tutors` with filters (subject, grade, price).
- **Request Tutor** (`/request`): CREATE `tutor_requests`. (We will log the request in Supabase before generating the Telegram link to ensure no requests are lost).

### Tutors
- **Apply to become a Tutor** (`/become-tutor`): CREATE `tutor_applications`. Uploads files (grade 12 transcript, EUEE result, optional badge proofs) to Supabase Storage.
- **Authentication** (`/auth/login`, `/auth/sign-up`): Use Supabase Auth email/password for Tutors and Admins.

### Admins
- **Admin Dashboard** (`/admin`): READ `tutor_applications`, `tutor_requests`, `tutors`.
- **Approve/Reject Application**: UPDATE `tutor_applications`. On approval, CREATE or UPDATE `tutors` record.
- **Manage Requests**: UPDATE `tutor_requests` (change status to sent/completed).

## 2. PostgreSQL Schema Design

**`profiles` table**: Maps to `auth.users` for extended user info.
- `id` (uuid, primary key, references auth.users)
- `email` (text)
- `role` (enum: 'admin', 'tutor', 'parent')
- `full_name` (text)
- `created_at` (timestamp, default now())

**`tutor_applications` table**:
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles, optional if guests apply)
- `full_name` (text), `email` (text), `phone` (text)
- `university` (text), `major` (text), `year_of_study` (text)
- `subjects` (text[]), `grade_levels` (text[]), `specialization` (text)
- `hourly_rate` (numeric), `availability` (text), `bio` (text), `experience` (text)
- `transcript_url` (text), `euee_url` (text)
- `status` (text: 'pending', 'reviewing', 'approved', 'rejected')
- `created_at` (timestamp, default now())

**`badge_applications` table**:
- `id` (uuid, primary key)
- `application_id` (uuid, references tutor_applications)
- `badge_type` (text)
- `proof_url` (text)
- `status` (text: 'pending', 'approved', 'rejected')

**`tutors` table** (Approved profiles shown on frontend):
- `id` (uuid, primary key, references profiles)
- `name` (text), `initials` (text), `university` (text)
- `subjects` (text[]), `grades` (text[]), `badges` (text[])
- `hourly_rate` (numeric), `location` (text), `is_verified` (boolean)
- `bio` (text), `specialization` (text)
- `rating` (numeric), `review_count` (integer)
- `ratings_json` (jsonb)

**`tutor_requests` table**:
- `id` (uuid, primary key)
- `parent_name` (text), `phone` (text)
- `student_name` (text), `grade_level` (text)
- `subjects` (text[])
- `session_type` (text), `frequency` (text)
- `budget` (numeric), `payment_duration` (text)
- `location` (text), `notes` (text)
- `preferred_tutor_id` (uuid, optional, references tutors)
- `status` (text: 'new', 'draft', 'sent', 'completed')
- `created_at` (timestamp, default now())

## 3. Authentication Strategy
- **Supabase Auth** (Email / Password).
- Middleware (`middleware.ts`) to protect `/admin` routes (only accessible if `role` == 'admin').
- Tutors can log in to view their applications (if we want them to have an account before applying). 

## 4. API / Data Layer
- **Client Supabase**: We'll create `lib/supabase/client.ts` (`createBrowserClient`) for reading the tutors list and submitting public forms.
- **Server Supabase**: We'll create `lib/supabase/server.ts` (`createServerClient`) for server-side operations like rendering the Admin dashboard with secure stats.
- **Custom Hooks**: e.g., `useSupabase()` and helper services to separate database logic from React components.

## 5. File Storage
- **Bucket**: `application_documents` (Private)
  - Saves file under `tutor_applications/{application_id}/grade_12_transcript.pdf`
- **Bucket**: `badge_proofs` (Private)
  - Saves badge proofs.
  
Only Admins will have read access to these buckets via Supabase Storage policies.

## 6. Realtime
- Enable **Supabase Realtime** on `tutor_requests` and `tutor_applications`. The Admin Dashboard will instantly reflect new applications and requests as parents/tutors submit them, without needing to refresh the page.

## 7. Security (Row Level Security - RLS)
- `tutors`: `SELECT` is public. `UPDATE`/`INSERT`/`DELETE` allowed for Admins.
- `tutor_applications`: `INSERT` is public (if guests apply). `SELECT` & `UPDATE` only for Admins.
- `tutor_requests`: `INSERT` is public. `SELECT` & `UPDATE` only for Admins.
- `profiles`: `SELECT` public. `UPDATE` only if `auth.uid() = id`. `INSERT` handled securely via a PostgreSQL Trigger when a user signs up.

## Open Questions

> [!WARNING]
> Please confirm these before we build:
1. **Tutor Sign-up Flow**: Should tutors be forced to create an account (`/auth/sign-up`) *before* applying to become a tutor, or can they apply freely as a guest and only get an account later once approved?
2. **Parent Requests**: Are parents allowed to request a tutor securely without an account?
3. **Telegram Integration**: Currently, your app builds a Telegram link directly on the user's browser. Do you still want the user to be redirected to Telegram, or should we just save the request to Supabase and email/notify you automatically behind the scenes?

## Verification Plan
### Automated Tests
- Connect Supabase locally or in cloud, verify the RLS policies by trying to fetch documents anonymously.
- Generating Database Types using Supabase CLI and checking for type errors.
### Manual Verification
- Go to `/become-tutor`, attach mock files, submit -> Verify data and files show up in Supabase.
- Go to `/request`, submit -> Verify the request is logged in DB.
- View `/tutors` -> Confirm data is coming live from the `tutors` table.
