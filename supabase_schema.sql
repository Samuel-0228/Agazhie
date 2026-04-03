-- Enable the uuid-ossp extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create tutor_applications table
CREATE TABLE tutor_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    university TEXT NOT NULL,
    major TEXT NOT NULL,
    year_of_study TEXT NOT NULL,
    subjects TEXT[] NOT NULL DEFAULT '{}',
    grade_levels TEXT[] NOT NULL DEFAULT '{}',
    specialization TEXT,
    hourly_rate NUMERIC NOT NULL,
    availability TEXT NOT NULL,
    bio TEXT NOT NULL,
    experience TEXT,
    transcript_url TEXT,
    euee_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'reviewing', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create badge_applications table
CREATE TABLE badge_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES tutor_applications(id) ON DELETE CASCADE,
    badge_type TEXT NOT NULL,
    proof_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create tutors table (Public facing)
CREATE TABLE tutors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- We'll link this manually initially since there's no auth for tutors
    name TEXT NOT NULL,
    initials TEXT NOT NULL,
    university TEXT NOT NULL,
    subjects TEXT[] NOT NULL DEFAULT '{}',
    grades TEXT[] NOT NULL DEFAULT '{}',
    badges TEXT[] DEFAULT '{}',
    hourly_rate NUMERIC NOT NULL,
    location TEXT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    specialization TEXT,
    bio TEXT,
    rating NUMERIC DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    ratings_json JSONB DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'open', -- 'open', 'closed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create tutor_requests table
CREATE TABLE tutor_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    student_name TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    subjects TEXT[] NOT NULL DEFAULT '{}',
    session_type TEXT NOT NULL,
    frequency TEXT NOT NULL,
    budget NUMERIC NOT NULL,
    payment_duration TEXT NOT NULL,
    location TEXT,
    notes TEXT,
    preferred_tutor_id UUID REFERENCES tutors(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'draft', 'sent', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================
-- FILE STORAGE BUCKETS (Make sure to run these exactly as is)
-- =========================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('application_documents', 'application_documents', false) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('badge_proofs', 'badge_proofs', false) ON CONFLICT DO NOTHING;

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

ALTER TABLE tutor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_requests ENABLE ROW LEVEL SECURITY;

-- Guests can insert applications, only authenticated/admins can select
CREATE POLICY "Enable insert for anonymous users" on tutor_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" on tutor_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" on tutor_applications FOR UPDATE TO authenticated USING (true);

-- Guests can insert badge applications, only authenticated/admins can select
CREATE POLICY "Enable insert for anonymous users" on badge_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" on badge_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" on badge_applications FOR UPDATE TO authenticated USING (true);

-- EVERYONE can select tutors. Only authenticated can insert/update
CREATE POLICY "Enable select for public" on tutors FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users only" on tutors FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" on tutors FOR UPDATE TO authenticated USING (true);

-- Guests can insert requests, only authenticated/admins can select
CREATE POLICY "Enable insert for anonymous users" on tutor_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" on tutor_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" on tutor_requests FOR UPDATE TO authenticated USING (true);

-- Storage bucket policies (Allow guests to upload, only authenticated can read)
CREATE POLICY "Allow public uploads" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('application_documents', 'badge_proofs'));
CREATE POLICY "Allow authenticated reads" ON storage.objects FOR SELECT TO authenticated USING (bucket_id IN ('application_documents', 'badge_proofs'));
