-- ==============================================================================
-- Create Default theDoers Administrator Account
-- Run this in Supabase -> SQL Editor -> Click 'RUN'
-- ==============================================================================

-- 1. Enable pgcrypto for password hashing if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Insert or Update Admin in auth.users with confirmed email
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'a0000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'admin@thedoers.com',
  crypt('admin123456', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"theDoers Administrator","role":"admin"}',
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = NOW(),
  raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- 3. Insert or Update Admin in public.users with 'admin' role and 'approved' status
INSERT INTO public.users (
  id,
  email,
  full_name,
  username,
  role,
  status,
  headline,
  bio
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'admin@thedoers.com',
  'theDoers Administrator',
  'admin',
  'admin',
  'approved',
  'Platform Moderator & System Administrator',
  'Managing student vetting, moderation, and ethical engineering standards.'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  status = 'approved',
  email = 'admin@thedoers.com',
  full_name = 'theDoers Administrator';
