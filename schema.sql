-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS telegram_logs CASCADE;
DROP TABLE IF EXISTS tutor_applications CASCADE;
DROP TABLE IF EXISTS parent_requests CASCADE;
DROP TABLE IF EXISTS tutors CASCADE;

-- 1. Tutors Table
CREATE TABLE tutors (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subjects TEXT[] DEFAULT '{}',
  grade_levels TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{}'::jsonb,
  experience TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_open_for_jobs BOOLEAN DEFAULT TRUE,
  number_of_jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Parent Requests Table (Jobs)
CREATE TABLE parent_requests (
  job_code TEXT PRIMARY KEY,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_grade TEXT NOT NULL,
  subject TEXT NOT NULL,
  schedule TEXT,
  location TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'posted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tutor Applications Table
CREATE TABLE tutor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_code TEXT REFERENCES parent_requests(job_code) ON DELETE CASCADE,
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'applied' CHECK (status IN ('applied', 'selected', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(job_code, tutor_id) -- Prevent multiple applications to same job
);

-- 4. Telegram Logs Table
CREATE TABLE telegram_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_code TEXT REFERENCES parent_requests(job_code) ON DELETE CASCADE,
  message_type TEXT NOT NULL CHECK (message_type IN ('bot_notification', 'channel_post', 'tutor_suggestion')),
  telegram_message_id TEXT,
  status TEXT DEFAULT 'success',
  error_details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activate Row Level Security (RLS)
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_logs ENABLE ROW LEVEL SECURITY;

-- Setup Basic Policies

-- Tutors can read and update their own profile
CREATE POLICY "Tutors can view own profile" ON tutors
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Tutors can update own profile" ON tutors
  FOR UPDATE USING (auth.uid() = id);

-- Public can insert parent requests safely (no auth needed)
CREATE POLICY "Anyone can insert a request" ON parent_requests
  FOR INSERT WITH CHECK (true);

-- Applications are readable by the tutor who made them
CREATE POLICY "Tutors can view own applications" ON tutor_applications
  FOR SELECT USING (auth.uid() = tutor_id);

-- Tutors can insert applications if they match their ID
CREATE POLICY "Tutors can apply" ON tutor_applications
  FOR INSERT WITH CHECK (auth.uid() = tutor_id);

-- NOTE: For ADMIN access (Superuser bypasses RLS if configured via service key, 
-- but if using standard JWTs, you'll want an admin check policy here). 
-- Example: CREATE POLICY "Admins full access" ON X USING ( (select role from auth.users where id = auth.uid()) = 'admin' );
