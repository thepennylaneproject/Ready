-- Migration: Add handle_updated_at trigger function
-- Description: Define the handle_updated_at() trigger function required by all
--              updated_at triggers in the schema. Must run before 001_ready_schema.sql.

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
