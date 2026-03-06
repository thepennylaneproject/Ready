# Finding data-004: `skill_gap_analyze.ts` references non-existent `analysis_results` column

**ID:** data-004  
**Category:** schema-mismatch  
**Severity:** medium  
**Status:** fixed

## Summary

In `netlify/functions/skill_gap_analyze.ts` (line 115), the code reads:

```ts
analysis: savedAnalysis?.analysis_results || analysis,
```

The `skill_gap_analyses` table does **not** have an `analysis_results` column.
Its columns are `gaps` (JSONB), `strengths` (TEXT[]), and `action_plan` (TEXT).

Because `savedAnalysis?.analysis_results` always evaluates to `undefined`, the
`|| analysis` fallback silently masks the bug — the structured analysis is always
returned from the in-memory variable rather than the database record, so the saved
row is never verified to be complete.

## Affected Files

- `netlify/functions/skill_gap_analyze.ts` (line 115)
- `supabase/migrations/001_ready_schema.sql` (`skill_gap_analyses` table definition)

## Fix Applied

Removed the non-existent column reference and always return the local `analysis`
object (which is fully populated before the insert):

```ts
analysis: savedAnalysis?.id ? analysis : analysis,
// simplified to:
analysis,
```
