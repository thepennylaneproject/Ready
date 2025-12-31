-- Migration: Add tier column to ready_profiles
-- Description: AI feature gating requires a user tier.

ALTER TABLE public.ready_profiles ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'free';
