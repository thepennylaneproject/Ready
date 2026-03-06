# Finding data-007: Three migration files lack timestamp prefixes

**ID:** data-007  
**Category:** migration-gap  
**Severity:** low  
**Status:** fixed

## Summary

Three migration files had no date/sequence prefix, making their execution order
relative to other migrations ambiguous:

| Old name                  | New name                                  |
|---------------------------|-------------------------------------------|
| `add_onboarding_cols.sql` | `20250601_add_onboarding_cols.sql`        |
| `create_profile_trigger.sql` | `20250602_create_profile_trigger.sql`  |
| `fix_rls.sql`             | `20250603_fix_rls.sql`                    |

Additionally, `add_onboarding_cols.sql` adds `goal TEXT` and `focus_areas TEXT[]`
columns that are already defined in `001_ready_schema.sql`. This is safe because it
uses `ADD COLUMN IF NOT EXISTS`, but it suggests the file predates the base schema
consolidation and should be reviewed for removal in a future cleanup.

`create_profile_trigger.sql` and `fix_rls.sql` duplicate logic already present in
`001_ready_schema.sql` (using idempotent `CREATE OR REPLACE` / `DROP … IF EXISTS`
patterns). These are harmless but add noise to the migration history.

## Affected Files

- `supabase/migrations/add_onboarding_cols.sql` → renamed
- `supabase/migrations/create_profile_trigger.sql` → renamed
- `supabase/migrations/fix_rls.sql` → renamed

## Fix Applied

Files renamed with `20250601`–`20250603` prefixes to establish unambiguous ordering.
