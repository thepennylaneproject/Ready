# Finding data-003: No TypeScript type for `interview_sessions` table

**ID:** data-003  
**Category:** type-drift  
**Severity:** medium  
**Status:** fixed

## Summary

Migration `20260101_add_interview_sessions.sql` creates the `public.interview_sessions`
table with columns: `id`, `user_id`, `interview_prep_id`, `question`, `user_answer`,
`feedback` (JSONB NOT NULL), `score` (INTEGER nullable), `created_at`.

No corresponding TypeScript interface exists in `src/types/index.ts`. Two Netlify
functions (`interview_evaluate.ts`, `get_practice_performance.ts`) insert into and
query this table using untyped `any` objects, eliminating compile-time safety.

## Affected Files

- `src/types/index.ts` (missing `InterviewSession` interface)
- `supabase/migrations/20260101_add_interview_sessions.sql`
- `netlify/functions/interview_evaluate.ts`
- `netlify/functions/get_practice_performance.ts`

## Fix Applied

Added `InterviewSession` TypeScript interface to `src/types/index.ts`:

```ts
export interface InterviewSession {
  id: string
  user_id: string
  interview_prep_id: string | null
  question: string
  user_answer: string
  feedback: any
  score: number | null
  created_at: string
}
```
