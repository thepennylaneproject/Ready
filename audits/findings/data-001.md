# Finding data-001: Missing `handle_updated_at()` trigger function

**ID:** data-001  
**Category:** schema-mismatch  
**Severity:** high  
**Status:** fixed

## Summary

The base migration `001_ready_schema.sql` creates 8 `BEFORE UPDATE` triggers that
call `public.handle_updated_at()`, but this function is never defined in any migration
file. A comment in the migration states:
> "We assume public.handle_updated_at() exists from Relevnt schema"

This external dependency means any fresh database deployment will fail every `UPDATE`
operation on all 8 tables (`ready_profiles`, `interview_prep`,
`interview_practice_sessions`, `linkedin_profiles`, `portfolio_analyses`,
`skill_gap_analyses`, `career_narratives`, `negotiation_sessions`).

## Affected Files

- `supabase/migrations/001_ready_schema.sql` (lines 172–195)

## Fix Applied

Added `supabase/migrations/20250101_add_handle_updated_at.sql` which defines:

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

This migration is timestamped `20250101` so it runs before `001_ready_schema.sql`
in alphabetical order. Remove the external dependency assumption.
