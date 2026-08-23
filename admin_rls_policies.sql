-- ==============================================================================
-- theDoers Admin RLS Policy & Permissions Update
-- Run this in Supabase -> SQL Editor -> Click 'RUN'
-- ==============================================================================

-- 1. Helper function to check if current user is an admin without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Grant Admin Full Permissions on public.users
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
CREATE POLICY "Admins can update all users"
ON public.users
FOR UPDATE
USING (
  auth.uid() = id OR public.is_admin()
)
WITH CHECK (
  auth.uid() = id OR public.is_admin()
);

-- 3. Grant Admin Full Permissions on public.projects
DROP POLICY IF EXISTS "Admins can update all projects" ON public.projects;
CREATE POLICY "Admins can update all projects"
ON public.projects
FOR UPDATE
USING (
  auth.uid() = doer_id OR public.is_admin()
);

DROP POLICY IF EXISTS "Admins can delete all projects" ON public.projects;
CREATE POLICY "Admins can delete all projects"
ON public.projects
FOR DELETE
USING (
  auth.uid() = doer_id OR public.is_admin()
);
