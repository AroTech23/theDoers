-- SQL to confirm existing users in auth.users
-- Run this in Supabase -> SQL Editor -> Click 'Run'

UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
