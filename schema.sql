create extension if not exists pgcrypto;
drop policy if exists "Tutors can view own profile" on tutors;
drop policy if exists "Tutors can update own profile" on tutors;
drop policy if exists "Anyone can insert a request" on parent_requests;
drop policy if exists "Tutors can view own applications" on tutor_applications;
drop policy if exists "Tutors can apply" on tutor_applications;
drop table if exists telegram_logs cascade;
drop table if exists tutor_applications cascade;
drop table if exists parent_requests cascade;
drop table if exists tutors cascade;
create table tutors (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  subjects text [] not null default '{}',
  grade_levels text [] not null default '{}',
  availability jsonb not null default '{}'::jsonb,
  years_experience integer not null default 0,
  experience text,
  is_verified boolean not null default false,
  is_open_for_jobs boolean not null default true,
  number_of_jobs_completed integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table parent_requests (
  id uuid primary key default gen_random_uuid(),
  job_code text not null unique,
  parent_name text not null,
  phone text not null,
  student_name text,
  student_grade text not null,
  subject text not null,
  schedule text,
  location text,
  notes text,
  status text not null default 'pending' check (
    status in (
      'pending',
      'approved',
      'posted',
      'completed',
      'cancelled'
    )
  ),
  approved_by uuid references auth.users(id),
  selected_tutor_id uuid references tutors(id),
  posted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table tutor_applications (
  id uuid primary key default gen_random_uuid(),
  job_code text not null references parent_requests(job_code) on delete cascade,
  tutor_id uuid not null references tutors(id) on delete cascade,
  status text not null default 'applied' check (status in ('applied', 'selected', 'rejected')),
  created_at timestamptz not null default now(),
  unique (job_code, tutor_id)
);
create table telegram_logs (
  id uuid primary key default gen_random_uuid(),
  job_code text references parent_requests(job_code) on delete
  set null,
    message_type text not null check (
      message_type in (
        'parent_request',
        'channel_post',
        'top3_shortlist'
      )
    ),
    target_chat text not null,
    payload text not null,
    telegram_message_id text,
    status text not null default 'success' check (status in ('success', 'failed')),
    error_details text,
    created_at timestamptz not null default now()
);
create index idx_parent_requests_status_created_at on parent_requests(status, created_at desc);
create index idx_parent_requests_job_code on parent_requests(job_code);
create index idx_tutor_applications_job_code on tutor_applications(job_code);
create index idx_tutor_applications_tutor_id on tutor_applications(tutor_id);
create index idx_tutors_verified_open on tutors(is_verified, is_open_for_jobs);
alter table tutors enable row level security;
alter table parent_requests enable row level security;
alter table tutor_applications enable row level security;
alter table telegram_logs enable row level security;
create or replace function is_admin() returns boolean language sql stable as $$
select coalesce(
    (auth.jwt()->'app_metadata'->>'role') = 'admin'
    or (auth.jwt()->'user_metadata'->>'is_admin')::boolean,
    false
  );
$$;
create policy "Tutors can view own profile" on tutors for
select using (auth.uid() = id);
create policy "Tutors can update own profile" on tutors for
update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins full access tutors" on tutors for all using (is_admin()) with check (is_admin());
create policy "Anyone can insert a request" on parent_requests for
insert with check (true);
create policy "Admins full access parent requests" on parent_requests for all using (is_admin()) with check (is_admin());
create policy "Tutors can view own applications" on tutor_applications for
select using (auth.uid() = tutor_id);
create policy "Tutors can apply" on tutor_applications for
insert with check (auth.uid() = tutor_id);
create policy "Admins full access tutor applications" on tutor_applications for all using (is_admin()) with check (is_admin());
create policy "Admins full access telegram logs" on telegram_logs for all using (is_admin()) with check (is_admin());