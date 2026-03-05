# Ready — Investor Overview

## Executive Summary

**Ready** is an AI-powered interview preparation and career coaching platform that transforms how professionals get hired. By combining structured self-assessment, AI-driven coaching, and a proprietary "Readiness Score," Ready gives job seekers a clear, measurable path from uncertain to interview-ready — in days, not months.

Ready is purpose-built as the coaching layer on top of **Relevnt** (relevnt.work), a job search and application-tracking platform. Together, the two products form a full-stack career platform: Relevnt finds the right roles; Ready prepares candidates to land them.

---

## The Problem

The modern hiring process is broken for candidates:

- **Lack of self-awareness.** Most job seekers don't know how they actually appear to recruiters — their LinkedIn, portfolio, and interview presence are rarely evaluated objectively.
- **No structured preparation.** Interview prep is fragmented across YouTube videos, generic tips, and expensive one-on-one coaches. There is no personalized, measurable path to readiness.
- **No feedback loop.** Candidates receive rejection emails with no actionable insight, repeating the same mistakes interview after interview.
- **Skills gaps go unaddressed.** Professionals know they're missing something but can't pinpoint what — or how to fix it before the next application.

---

## The Solution

Ready solves each of these problems with a single, cohesive platform built on four evidence-based pillars of interview readiness:

| Pillar | Weight | What It Measures |
|---|---|---|
| **Practice** | 25% | Mock interview quality (AI-scored) and volume |
| **Assessment** | 25% | LinkedIn and portfolio analysis scores |
| **Skills** | 25% | Percentage of identified skill gaps addressed |
| **Narrative** | 25% | Completion of a compelling career story |

The platform continuously calculates a **Readiness Score (0–100%)**. When a user crosses 80%, they unlock a milestone celebration and a clear signal: *"You're Ready — start applying."*

---

## Product Features

### Dashboard
A real-time command center showing the user's current Readiness Score, pillar breakdowns, recommended next actions, and recent activity. Designed to replace the anxiety of "what should I do next?" with a clear, prioritized queue.

### Mirror — Profile Analysis
AI analysis of the user's LinkedIn profile and/or portfolio website, scored across headline strength, summary quality, social proof, keyword alignment, and visual presentation. Shows candidates exactly how recruiters and ATS systems perceive them.

### Practice Center — AI Mock Interviews
Users build interview prep templates per target role and company. The AI generates tailored questions and conducts live mock interview sessions. Every session is scored and stored, feeding back into the Readiness Score.

### Skills Gap Analysis
Users upload their resume against a target job description. The AI identifies missing technical and soft skills, ranks them by criticality, and tracks progress as gaps are addressed.

### Learning Paths
Personalized resource recommendations (courses, articles, tools) automatically generated from the user's skill gap profile. Users mark learning progress, which updates their Skills pillar score.

### Coaching Hub
Two specialized AI coaching tools:
- **Rejection Debrief** — Paste a rejection email and receive a structured analysis of likely reasons and concrete, actionable next steps.
- **Negotiation Coach** — Prepare for salary negotiations with tailored scripts, market-rate anchoring, and objection-handling strategies.

### Career Narrative Builder
A guided workflow to craft the user's personal story: origin, career pivot rationale, core value proposition, and future vision — ready to deploy in any interview or cover letter.

### Playback — Performance Analytics
A historical record of practice sessions, scores, skills addressed, and assessments completed. Users can track their improvement trajectory over time.

---

## Business Model

Ready operates as a **freemium SaaS** with tiered subscription plans:

| Tier | Target User |
|---|---|
| **Free** | Casual users, students, first-time job seekers |
| **Pro** | Active job seekers (primary paid tier) |
| **Premium** | Power users seeking higher AI quality and unlimited usage |
| **Coach** | Professional career coaches managing clients |

Monetization levers include per-session AI quality upgrades, usage limits on AI calls, and premium coaching features. The platform also benefits from cross-product engagement with Relevnt, creating a virtuous loop: users who apply via Relevnt return to Ready for further prep.

---

## Technology

Ready is built on a modern, cloud-native stack designed for rapid iteration and scale:

- **Frontend:** React 19 + TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Netlify serverless functions (Node.js)
- **Database:** PostgreSQL via Supabase with Row-Level Security
- **AI:** Multi-provider routing across OpenAI, Anthropic (Claude), DeepSeek, and AIML API — enabling model selection by quality tier and cost
- **Infrastructure:** Netlify (zero-ops, auto-scaling CDN + functions)

The multi-provider AI architecture gives Ready a competitive cost and quality advantage: it can route tasks to the best available model for the budget tier, rather than being locked into a single vendor.

---

## Market Opportunity

- **Hundreds of millions of professionals** actively use LinkedIn for job searching in North America and globally, representing a massive addressable audience.
- The **online career coaching and interview prep market** is a multi-billion-dollar global segment growing rapidly as AI tools democratize access to services previously available only through expensive human coaches.
- Average time-to-hire has grown substantially in recent years, creating prolonged candidate anxiety and strong demand for structured, self-directed preparation tools.
- High rejection rates in competitive markets (FAANG, finance, consulting) create strong willingness to pay for an edge.

---

## Competitive Differentiation

| Competitor | Their Approach | Ready's Edge |
|---|---|---|
| Interview.io / Pramp | Human peer mock interviews | AI-always-on, no scheduling needed; integrated with full readiness lifecycle |
| LinkedIn Premium | Job matching + generic learning | Purpose-built coaching with a measurable Readiness Score and structured prep |
| Big Interview | Recorded video practice | Real AI-scored feedback, multi-pillar readiness model, rejection coaching |
| Career coaches (human) | 1:1 sessions at $100–$300/hr | Fraction of the cost, available 24/7, quantified outcomes |

Ready is not just a practice tool — it is the **only platform that unifies profile analysis, skills development, mock interviews, rejection coaching, negotiation prep, and career narrative** into a single, scored workflow.

---

## Traction Signals

- End-to-end product with live Supabase backend, full authentication, user profiles, and data persistence.
- Integrated with Relevnt (relevnt.work) for post-readiness job application flow, closing the loop from preparation to application.
- Full-featured AI coaching pipeline spanning six distinct use cases, backed by multi-model routing for resilience and cost efficiency.

---

## Vision

Ready's long-term vision is to become the **professional coaching layer of the internet** — the platform where any motivated professional, regardless of background or budget, can walk in uncertain and walk out ready. Starting with interview preparation, Ready will expand into onboarding coaching, performance review preparation, and promotion readiness, building a lifelong career development relationship with every user.

---

*Ready is a product of The Penny Lane Project.*
