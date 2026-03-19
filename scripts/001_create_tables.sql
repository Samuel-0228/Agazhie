-- Create profiles table for all users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text default 'parent' check (role in ('parent', 'tutor', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Create tutors table
create table if not exists public.tutors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  university text not null,
  degree text,
  year_of_study text,
  major text,
  subjects text[] not null,
  grade_levels text[],
  specialization text,
  hourly_rate integer not null,
  bio text,
  experience text,
  availability text,
  languages text[] default array['Amharic', 'English'],
  location text,
  is_verified boolean default false,
  is_active boolean default true,
  rating numeric(2,1) default 0,
  review_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.tutors enable row level security;

create policy "tutors_select_all" on public.tutors for select using (is_active = true);
create policy "tutors_insert_own" on public.tutors for insert with check (auth.uid() = user_id);
create policy "tutors_update_own" on public.tutors for update using (auth.uid() = user_id);

-- Create tutor applications table
create table if not exists public.tutor_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  university text not null,
  year_of_study text,
  major text,
  subjects text[] not null,
  grade_levels text[],
  specialization text,
  hourly_rate integer not null,
  bio text,
  experience text,
  availability text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

alter table public.tutor_applications enable row level security;

-- Only admins can view all applications
create policy "applications_admin_select" on public.tutor_applications 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Anyone can insert an application
create policy "applications_insert_any" on public.tutor_applications 
  for insert with check (true);

-- Only admins can update applications
create policy "applications_admin_update" on public.tutor_applications 
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create tutor requests table
create table if not exists public.tutor_requests (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references auth.users(id) on delete set null,
  parent_name text not null,
  email text not null,
  phone text not null,
  student_name text not null,
  grade_level text not null,
  subjects text[] not null,
  session_type text check (session_type in ('in-person', 'online', 'both')),
  frequency text,
  location text,
  notes text,
  tutor_id uuid references public.tutors(id) on delete set null,
  status text default 'new' check (status in ('new', 'contacted', 'matched', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.tutor_requests enable row level security;

-- Parents can view their own requests
create policy "requests_select_own" on public.tutor_requests 
  for select using (auth.uid() = parent_id);

-- Anyone can insert a request
create policy "requests_insert_any" on public.tutor_requests 
  for insert with check (true);

-- Admins can view all requests
create policy "requests_admin_select" on public.tutor_requests 
  for select using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update all requests
create policy "requests_admin_update" on public.tutor_requests 
  for update using (
    exists (
      select 1 from public.profiles 
      where id = auth.uid() and role = 'admin'
    )
  );

-- Create reviews table
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  tutor_id uuid references public.tutors(id) on delete cascade,
  parent_id uuid references auth.users(id) on delete set null,
  parent_name text,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "reviews_select_all" on public.reviews for select using (true);
create policy "reviews_insert_own" on public.reviews for insert with check (auth.uid() = parent_id);

-- Create function to update tutor rating
create or replace function update_tutor_rating()
returns trigger as $$
begin
  update public.tutors
  set 
    rating = (select avg(rating) from public.reviews where tutor_id = new.tutor_id),
    review_count = (select count(*) from public.reviews where tutor_id = new.tutor_id)
  where id = new.tutor_id;
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for rating updates
drop trigger if exists on_review_created on public.reviews;
create trigger on_review_created
  after insert on public.reviews
  for each row
  execute function update_tutor_rating();
