-- ==============================================================================
-- theDoers Supabase Complete Fix & Policy Reset
-- Paste this entire file into Supabase SQL Editor and click 'RUN'
-- ==============================================================================

-- 1. Create / Update the Trigger to extract all metadata upon user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    username,
    phone,
    program,
    year,
    headline,
    bio,
    github_url,
    linkedin_url,
    portfolio_url,
    whatsapp_url,
    instagram_url,
    facebook_url,
    role,
    status
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'program',
    new.raw_user_meta_data->>'year',
    new.raw_user_meta_data->>'headline',
    new.raw_user_meta_data->>'bio',
    new.raw_user_meta_data->>'github_url',
    new.raw_user_meta_data->>'linkedin_url',
    new.raw_user_meta_data->>'portfolio_url',
    new.raw_user_meta_data->>'whatsapp_url',
    new.raw_user_meta_data->>'instagram_url',
    new.raw_user_meta_data->>'facebook_url',
    'doer',
    'pending'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    username = EXCLUDED.username,
    phone = EXCLUDED.phone,
    program = EXCLUDED.program,
    year = EXCLUDED.year,
    headline = EXCLUDED.headline,
    bio = EXCLUDED.bio,
    github_url = EXCLUDED.github_url,
    linkedin_url = EXCLUDED.linkedin_url,
    portfolio_url = EXCLUDED.portfolio_url,
    whatsapp_url = EXCLUDED.whatsapp_url,
    instagram_url = EXCLUDED.instagram_url,
    facebook_url = EXCLUDED.facebook_url;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Ensure Trigger is attached to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Reset and Permissively Open Row Level Security on public.users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Allow all select on users" ON public.users;
DROP POLICY IF EXISTS "Allow all update on users" ON public.users;
DROP POLICY IF EXISTS "Allow all insert on users" ON public.users;

CREATE POLICY "Allow all select on users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow all update on users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Allow all insert on users" ON public.users FOR INSERT WITH CHECK (true);

-- 4. Reset and Open RLS on public.doer_skills & public.skills
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doer_skills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Skills are viewable by everyone" ON public.skills;
DROP POLICY IF EXISTS "Authenticated users can insert skills" ON public.skills;
DROP POLICY IF EXISTS "Doer skills are viewable by everyone" ON public.doer_skills;
DROP POLICY IF EXISTS "Doers can manage own skills" ON public.doer_skills;
DROP POLICY IF EXISTS "Allow all on skills" ON public.skills;
DROP POLICY IF EXISTS "Allow all on doer_skills" ON public.doer_skills;

CREATE POLICY "Allow all on skills" ON public.skills FOR ALL USING (true);
CREATE POLICY "Allow all on doer_skills" ON public.doer_skills FOR ALL USING (true);

-- 5. Delete previous test user so you can register fresh with all fields populated!
DELETE FROM public.users WHERE email = 'developerp070@gmail.com';
DELETE FROM auth.users WHERE email = 'developerp070@gmail.com';
