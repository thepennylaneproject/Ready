# Finding data-002: `ReadyProfile` TypeScript interface missing `tier` field

**ID:** data-002  
**Category:** type-drift  
**Severity:** medium  
**Status:** fixed

## Summary

Migration `20251231_add_tier_to_profiles.sql` adds a `tier TEXT DEFAULT 'free'`
column to `public.ready_profiles`. However, the `ReadyProfile` TypeScript interface
in `src/types/index.ts` does not declare this field.

As a result:
- `AuthContext` fetches `ready_profiles` with `select('*')` and casts the result to
  `ReadyProfile`, silently dropping `tier` from the typed value.
- Two Netlify functions (`interview_evaluate.ts`, `interview_prepare.ts`) query
  `ready_profiles.tier` directly and cast the result to `UserTier`, bypassing the
  type mismatch only because they select a single column.
- Any code accessing `profile.tier` via the `AuthContext` will get `undefined` at
  runtime despite the column existing in the database.

## Affected Files

- `src/types/index.ts` (`ReadyProfile` interface)
- `supabase/migrations/20251231_add_tier_to_profiles.sql`

## Fix Applied

Added `tier: string` to the `ReadyProfile` interface in `src/types/index.ts`.
