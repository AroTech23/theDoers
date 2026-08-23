-- ==============================================================================
-- theDoers Supabase Storage Buckets Setup & Policies
-- Paste this into Supabase SQL Editor and click 'RUN'
-- ==============================================================================

-- 1. Create the 'projects' public storage bucket for covers & screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'projects',
  'projects',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Create the 'avatars' public storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Set Open/Authenticated Storage Policies for uploads and viewing
DROP POLICY IF EXISTS "Public can view project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their project images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their project images" ON storage.objects;

CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id IN ('projects', 'avatars'));

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('projects', 'avatars'));

CREATE POLICY "Users can update their project images"
ON storage.objects FOR UPDATE
USING (bucket_id IN ('projects', 'avatars'));

CREATE POLICY "Users can delete their project images"
ON storage.objects FOR DELETE
USING (bucket_id IN ('projects', 'avatars'));
