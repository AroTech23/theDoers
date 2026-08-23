# Supabase Database Migration for theDoers Platform
# Run this entire script in Supabase -> SQL Editor -> Click 'Run'

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE USERS / PROFILES TABLE (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'doer' CHECK (role IN ('visitor', 'doer', 'admin')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  program TEXT,
  year TEXT,
  headline TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  whatsapp_url TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. CREATE SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CREATE DOER_SKILLS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.doer_skills (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(doer_id, skill_id)
);

-- 5. CREATE PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  doer_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  market TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  image_url TEXT,
  problem TEXT,
  current_state TEXT,
  desired_state TEXT,
  process_steps JSONB DEFAULT '[]'::jsonb,
  solution TEXT,
  result TEXT,
  key_metric JSONB,
  screenshots TEXT[] DEFAULT '{}',
  doc_url TEXT,
  github_url TEXT,
  live_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 7. RLS POLICIES FOR PUBLIC DISCOVERY & ACCESS

-- Users Policies: Anyone can view approved profiles, users can edit their own, admins can edit all
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Skills Policies: Anyone can view, authenticated users can add
CREATE POLICY "Skills are viewable by everyone" 
ON public.skills FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert skills" 
ON public.skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Doer Skills Policies
CREATE POLICY "Doer skills are viewable by everyone" 
ON public.doer_skills FOR SELECT USING (true);

CREATE POLICY "Doers can manage own skills" 
ON public.doer_skills FOR ALL USING (auth.uid() = doer_id);

-- Projects Policies: Everyone can view published projects, Doers can manage own, Admins full access
CREATE POLICY "Published projects are viewable by everyone" 
ON public.projects FOR SELECT USING (status = 'published' OR auth.uid() = doer_id);

CREATE POLICY "Doers can insert own projects" 
ON public.projects FOR INSERT WITH CHECK (auth.uid() = doer_id);

CREATE POLICY "Doers can update own projects" 
ON public.projects FOR UPDATE USING (auth.uid() = doer_id);

CREATE POLICY "Doers can delete own projects" 
ON public.projects FOR DELETE USING (auth.uid() = doer_id);

-- 8. AUTOMATIC USER PROFILE CREATION ON SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, status)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'doer',
    'pending'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. POPULATE INITIAL POPULAR TECH SKILLS
INSERT INTO public.skills (name, category) VALUES
  ('Python', 'Programming'),
  ('React', 'Frontend'),
  ('Next.js', 'Frontend'),
  ('TypeScript', 'Programming'),
  ('Node.js', 'Backend'),
  ('FastAPI', 'Backend'),
  ('PostgreSQL', 'Database'),
  ('UI/UX', 'Design'),
  ('Figma', 'Design'),
  ('Machine Learning', 'AI'),
  ('Cybersecurity', 'Security'),
  ('IoT', 'Hardware'),
  ('Docker', 'DevOps'),
  ('Tailwind CSS', 'Frontend')
ON CONFLICT (name) DO NOTHING;
