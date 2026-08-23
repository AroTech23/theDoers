# Fix Row Level Security (RLS) and Trigger in Supabase
# Run this in Supabase -> SQL Editor -> Click 'Run'

-- 1. Update the handle_new_user trigger to populate all fields from raw_user_meta_data
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

-- 2. Ensure RLS policies allow authenticated and anon inserts smoothly
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.users FOR INSERT WITH CHECK (true);

-- 3. Ensure doer_skills RLS allows insert
DROP POLICY IF EXISTS "Doer skills are viewable by everyone" ON public.doer_skills;
DROP POLICY IF EXISTS "Doers can manage own skills" ON public.doer_skills;

CREATE POLICY "Doer skills are viewable by everyone" 
ON public.doer_skills FOR SELECT USING (true);

CREATE POLICY "Doers can manage own skills" 
ON public.doer_skills FOR ALL USING (true);
