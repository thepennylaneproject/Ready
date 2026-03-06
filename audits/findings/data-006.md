# Finding data-006: `readiness_snapshots` missing DELETE RLS policy

**ID:** data-006  
**Category:** missing-rls  
**Severity:** low  
**Status:** fixed

## Summary

The `readiness_snapshots` table has RLS enabled with policies for SELECT and INSERT
only. No UPDATE or DELETE policies exist.

The append-only snapshot pattern (INSERT + SELECT) is intentional for tracking
readiness over time, and an UPDATE policy is not needed. However, the absence of a
DELETE policy means users cannot remove their own historical snapshots, which may
conflict with data-deletion obligations (e.g., account deletion flows).

Note: the `001_ready_schema.sql` `ON DELETE CASCADE` on the `user_id` FK to
`auth.users` ensures snapshots are removed when the auth user is deleted, so the
risk is contained to manual deletion scenarios.

## Affected Files

- `supabase/migrations/001_ready_schema.sql` (`readiness_snapshots` RLS section)

## Fix Applied

Added a DELETE policy for `readiness_snapshots` in
`supabase/migrations/20260306_fix_missing_rls_policies.sql`.
