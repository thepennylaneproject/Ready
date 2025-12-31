-- Migration: Add interview_sessions table
-- Description: Store individual question evaluations for history and analytics.

CREATE TABLE IF NOT EXISTS public.interview_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  interview_prep_id UUID REFERENCES public.interview_prep(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  feedback JSONB NOT NULL,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.interview_sessions ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own interview sessions" 
  ON public.interview_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interview sessions" 
  ON public.interview_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
