-- =====================================================
-- Agazhie Tutoring Platform - Full Database Schema
-- =====================================================
-- Run this in your Supabase SQL editor after the base schema (scripts/init.sql)
-- This file adds all MVP + Growth feature tables

-- =====================================================
-- ASSIGNMENTS MARKETPLACE
-- =====================================================
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references auth.users(id) on delete set null,
  student_name text not null,
  title text not null,
  subject text not null,
  grade_level text,
  description text not null,
  deadline_hours integer not null,
  budget integer not null,
  status text default 'open' check (status in ('open', 'in-progress', 'completed', 'disputed', 'cancelled')),
  accepted_tutor_id uuid references public.tutors(id) on delete set null,
  solution_url text,
  solution_submitted_at timestamptz,
  payment_released boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.assignments enable row level security;
create policy "assignments_select_all" on public.assignments for select using (true);
create policy "assignments_insert_own" on public.assignments for insert with check (auth.uid() = student_id or student_id is null);
create policy "assignments_update_own" on public.assignments for update using (auth.uid() = student_id);

-- Assignment files/attachments
create table if not exists public.assignment_attachments (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

alter table public.assignment_attachments enable row level security;
create policy "attachments_select_all" on public.assignment_attachments for select using (true);
create policy "attachments_insert_own" on public.assignment_attachments for insert with check (auth.uid() = uploaded_by);

-- Assignment applications (tutors applying)
create table if not exists public.assignment_applications (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references public.assignments(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete cascade,
  message text,
  status text default 'pending' check (status in ('pending', 'accepted', 'rejected')),
  created_at timestamptz default now(),
  unique(assignment_id, tutor_id)
);

alter table public.assignment_applications enable row level security;
create policy "asgn_apps_select" on public.assignment_applications for select using (
  auth.uid() = (select user_id from public.tutors where id = tutor_id) or
  auth.uid() = (select student_id from public.assignments where id = assignment_id)
);
create policy "asgn_apps_insert" on public.assignment_applications for insert with check (
  auth.uid() = (select user_id from public.tutors where id = tutor_id)
);

-- =====================================================
-- IN-APP MESSAGING
-- =====================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  participant_1 uuid references auth.users(id) on delete cascade,
  participant_2 uuid references auth.users(id) on delete cascade,
  subject text,
  last_message_at timestamptz default now(),
  created_at timestamptz default now(),
  -- Ensure participant_1 < participant_2 to avoid (A,B) and (B,A) duplicates
  constraint conversations_ordered check (participant_1 < participant_2),
  unique(participant_1, participant_2)
);

alter table public.conversations enable row level security;
create policy "conversations_select_own" on public.conversations for select using (
  auth.uid() = participant_1 or auth.uid() = participant_2
);
-- When inserting a conversation, always pass least(uid1,uid2) as participant_1
-- and greatest(uid1,uid2) as participant_2 to satisfy the ordering constraint.
create policy "conversations_insert_own" on public.conversations for insert with check (
  auth.uid() = participant_1 or auth.uid() = participant_2
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  content text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;
create policy "messages_select_own" on public.messages for select using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and (c.participant_1 = auth.uid() or c.participant_2 = auth.uid())
  )
);
create policy "messages_insert_own" on public.messages for insert with check (
  auth.uid() = sender_id
);

-- =====================================================
-- ESCROW WALLET SYSTEM
-- =====================================================
create table if not exists public.wallets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  balance integer default 0 check (balance >= 0),
  escrow_balance integer default 0 check (escrow_balance >= 0),
  total_earned integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.wallets enable row level security;
create policy "wallets_select_own" on public.wallets for select using (auth.uid() = user_id);
create policy "wallets_insert_own" on public.wallets for insert with check (auth.uid() = user_id);
create policy "wallets_update_own" on public.wallets for update using (auth.uid() = user_id);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid references public.wallets(id) on delete cascade,
  type text not null check (type in ('deposit', 'withdrawal', 'escrow_hold', 'escrow_release', 'payout', 'refund', 'commission')),
  amount integer not null,
  description text,
  reference_id uuid,
  reference_type text,
  status text default 'completed' check (status in ('pending', 'completed', 'failed', 'reversed')),
  created_at timestamptz default now()
);

alter table public.wallet_transactions enable row level security;
create policy "txns_select_own" on public.wallet_transactions for select using (
  exists (select 1 from public.wallets w where w.id = wallet_id and w.user_id = auth.uid())
);

-- Escrow records
create table if not exists public.escrow (
  id uuid primary key default gen_random_uuid(),
  payer_id uuid references auth.users(id) on delete set null,
  payee_id uuid references auth.users(id) on delete set null,
  amount integer not null check (amount > 0),
  commission integer default 0,
  reference_type text check (reference_type in ('session', 'assignment')),
  reference_id uuid,
  status text default 'held' check (status in ('held', 'released', 'refunded', 'disputed')),
  held_at timestamptz default now(),
  released_at timestamptz,
  release_deadline timestamptz,
  notes text
);

alter table public.escrow enable row level security;
create policy "escrow_select_own" on public.escrow for select using (
  auth.uid() = payer_id or auth.uid() = payee_id
);
create policy "escrow_insert_own" on public.escrow for insert with check (auth.uid() = payer_id);

-- =====================================================
-- LIVE SESSIONS
-- =====================================================
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid references public.tutors(id) on delete set null,
  student_id uuid references auth.users(id) on delete set null,
  subject text not null,
  grade_level text,
  scheduled_at timestamptz not null,
  duration_minutes integer default 60,
  session_type text default 'online' check (session_type in ('online', 'in-person')),
  status text default 'scheduled' check (status in ('scheduled', 'in-progress', 'completed', 'cancelled', 'no-show')),
  jitsi_room text,
  notes text,
  student_rating integer check (student_rating >= 1 and student_rating <= 5),
  student_feedback text,
  escrow_id uuid references public.escrow(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.sessions enable row level security;
create policy "sessions_select_own" on public.sessions for select using (
  auth.uid() = student_id or
  auth.uid() = (select user_id from public.tutors where id = tutor_id)
);
create policy "sessions_insert_own" on public.sessions for insert with check (auth.uid() = student_id);
create policy "sessions_update_own" on public.sessions for update using (
  auth.uid() = student_id or
  auth.uid() = (select user_id from public.tutors where id = tutor_id)
);

-- =====================================================
-- Q&A SYSTEM
-- =====================================================
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  question text not null,
  subject text,
  grade_level text,
  upvotes integer default 0,
  is_resolved boolean default false,
  created_at timestamptz default now()
);

alter table public.questions enable row level security;
create policy "questions_select_all" on public.questions for select using (true);
create policy "questions_insert_any" on public.questions for insert with check (true);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references public.questions(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete set null,
  author_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  content text not null,
  upvotes integer default 0,
  is_best boolean default false,
  created_at timestamptz default now()
);

alter table public.answers enable row level security;
create policy "answers_select_all" on public.answers for select using (true);
create policy "answers_insert_any" on public.answers for insert with check (true);

-- =====================================================
-- DISPUTES
-- =====================================================
create table if not exists public.disputes (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('payment', 'quality', 'no-show', 'fraud', 'other')),
  reporter_id uuid references auth.users(id) on delete set null,
  against_id uuid references auth.users(id) on delete set null,
  reference_type text check (reference_type in ('session', 'assignment')),
  reference_id uuid,
  title text not null,
  description text,
  amount integer,
  status text default 'open' check (status in ('open', 'reviewing', 'resolved', 'rejected')),
  resolution text,
  resolved_by uuid references auth.users(id) on delete set null,
  resolved_at timestamptz,
  priority text default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at timestamptz default now()
);

alter table public.disputes enable row level security;
create policy "disputes_select_own" on public.disputes for select using (
  auth.uid() = reporter_id or
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "disputes_insert_own" on public.disputes for insert with check (auth.uid() = reporter_id);
create policy "disputes_admin_update" on public.disputes for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- =====================================================
-- REFERRAL SYSTEM
-- =====================================================
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid references auth.users(id) on delete cascade,
  referred_id uuid references auth.users(id) on delete cascade,
  referral_code text not null,
  status text default 'pending' check (status in ('pending', 'completed', 'expired')),
  reward_amount integer default 140,
  reward_paid boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(referrer_id, referred_id)
);

alter table public.referrals enable row level security;
create policy "referrals_select_own" on public.referrals for select using (auth.uid() = referrer_id);
create policy "referrals_insert_any" on public.referrals for insert with check (true);

-- =====================================================
-- FAVORITES / WATCHLISTS
-- =====================================================
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  tutor_id uuid references public.tutors(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, tutor_id)
);

alter table public.favorites enable row level security;
create policy "favorites_select_own" on public.favorites for select using (auth.uid() = user_id);
create policy "favorites_insert_own" on public.favorites for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own" on public.favorites for delete using (auth.uid() = user_id);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  is_read boolean default false,
  reference_type text,
  reference_id uuid,
  created_at timestamptz default now()
);

alter table public.notifications enable row level security;
create policy "notifications_select_own" on public.notifications for select using (auth.uid() = user_id);
create policy "notifications_update_own" on public.notifications for update using (auth.uid() = user_id);

-- =====================================================
-- BLOG / CMS
-- =====================================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  category text,
  featured boolean default false,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.blog_posts enable row level security;
create policy "blog_select_published" on public.blog_posts for select using (published = true);
create policy "blog_admin_all" on public.blog_posts for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
