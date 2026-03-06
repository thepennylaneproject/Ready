-- Migration: Fix missing RLS policies
-- Description: Add UPDATE and DELETE policies for interview_sessions.
--              Add DELETE policy for readiness_snapshots so users can manage
--              their own records.

-- interview_sessions: allow users to update and delete their own records
DROP POLICY IF EXISTS "Users can update their own interview sessions" ON public.interview_sessions;
CREATE POLICY "Users can update their own interview sessions"
  ON public.interview_sessions FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own interview sessions" ON public.interview_sessions;
CREATE POLICY "Users can delete their own interview sessions"
  ON public.interview_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- readiness_snapshots: allow users to delete their own snapshots
DROP POLICY IF EXISTS "Users can delete their own readiness snapshots" ON public.readiness_snapshots;
CREATE POLICY "Users can delete their own readiness snapshots"
  ON public.readiness_snapshots FOR DELETE
  USING (auth.uid() = user_id);
