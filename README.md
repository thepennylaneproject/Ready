# Ready — Career Interview Preparation Platform

A React + TypeScript + Vite app deployed on Netlify. Helps job seekers prepare for interviews with AI-powered coaching, skill-gap analysis, LinkedIn/portfolio review, and readiness scoring.

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- A [Supabase](https://supabase.com) project

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous (public) key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (server-side) | Supabase service role key — used only in Netlify Functions, never exposed to the browser |
| `ANTHROPIC_API_KEY` | Optional | Anthropic Claude API key for AI features |
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI features |
| `RAPIDAPI_API_KEY` | Optional | RapidAPI key for LinkedIn profile scraping |
| `DEEPSEEK_API_KEY` | Optional | DeepSeek API key for AI features |
| `AIMLAPI_API_KEY` | Optional | AIML API key for AI features |

> **Note:** `VITE_` prefixed variables are embedded into the client bundle at build time. Never put secrets in `VITE_` variables.

### Development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`. To run with Netlify Functions locally:

```bash
npx netlify dev
```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Typecheck and build for production |
| `npm run typecheck` | Run TypeScript type checking without emitting files |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |
| `npm run ci` | Run typecheck + build (mirrors the CI pipeline) |

### Deployment

The app is deployed to [Netlify](https://netlify.com). Configuration is in `netlify.toml`.

- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

Set the environment variables above in the Netlify dashboard under **Site settings → Environment variables**.

A health check is available at `/.netlify/functions/health`.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Auth & Database:** Supabase
- **AI:** OpenAI, Anthropic Claude, DeepSeek (via Netlify Functions)
- **Deployment:** Netlify (functions + static)
