# Finding data-005: `interview_sessions` table missing UPDATE and DELETE RLS policies

**ID:** data-005  
**Category:** missing-rls  
**Severity:** medium  
**Status:** fixed

## Summary

The `interview_sessions` table has RLS enabled with only two policies:
- `"Users can view their own interview sessions"` (SELECT)
- `"Users can insert their own interview sessions"` (INSERT)

No UPDATE or DELETE policies exist. While the append-only pattern may be intentional
for audit trails, the lack of a DELETE policy prevents users from exercising their
right to delete their own data (GDPR / privacy concern). The lack of an UPDATE
policy means corrections to erroneous records are impossible.

Additionally, the server-side `interview_evaluate.ts` uses `createAdminClient()` which
uses the service-role key (bypassing RLS) — meaning inserts succeed from the server.
But if client-side code ever attempts DELETE via the anon key, it will be silently
rejected without a meaningful error.

## Affected Files

- `supabase/migrations/20260101_add_interview_sessions.sql`

## Fix Applied

Added `supabase/migrations/20260306_fix_missing_rls_policies.sql` with:
- UPDATE policy for `interview_sessions` (`auth.uid() = user_id`)
- DELETE policy for `interview_sessions` (`auth.uid() = user_id`)
- DELETE policy for `readiness_snapshots` (`auth.uid() = user_id`)
