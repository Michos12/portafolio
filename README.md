# Personal Portfolio — Full Stack (Angular + FastAPI)

A professional developer portfolio built with a **decoupled architecture**: the
frontend and backend are developed, deployed and scaled independently, each on the
platform that does its job best — all on free tiers.

> The portfolio itself is the demo: dynamic projects served from my own API, a
> JWT-protected admin panel, a rate-limited contact form, and live GitHub activity.

## Architecture

```
GitHub (monorepo: /frontend + /backend)
   │  push → CI/CD
   ├── Frontend: Angular SPA ─────► Vercel (CDN + SSL)
   │        │  HttpClient (camelCase JSON)
   │        ▼
   └── Backend: FastAPI ──────────► Render
            │  ├─ GET  /api/projects        (public, from DB)
            │  ├─ POST /api/contact         (rate-limited + honeypot)
            │  ├─ GET  /api/github/activity (cached GitHub proxy)
            │  └─ /api/admin/*              (project CRUD, JWT)
            ▼
        Supabase (PostgreSQL): projects, messages
```

## Tech stack
| Layer | Tech | Host |
| --- | --- | --- |
| Frontend | Angular 22 (zoneless, Signals), TypeScript | Vercel |
| Backend | Python, FastAPI, Pydantic v2 | Render |
| Database | PostgreSQL | Supabase |
| Auth | JWT (python-jose) + bcrypt | — |

## Project structure
```
portafolio/
├── frontend/        # Angular SPA  (see frontend/README.md)
├── backend/         # FastAPI API  (see backend/README.md)
├── shared/
│   └── models.ts    # shared FE↔BE data contract
└── README.md
```

## Run it locally
Two terminals:

```bash
# 1) Backend  → http://localhost:8000/docs
cd backend
python -m venv .venv && .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
cp .env.example .env            # fill in the values
uvicorn app.main:app --reload

# 2) Frontend → http://localhost:4200
cd frontend
npm install
npm start
```

The admin panel lives at `/admin` (sign in with the credentials from your backend `.env`).

## Highlights
- **Decoupled deploy**: frontend and backend ship independently from the same repo.
- **Security**: JWT auth, bcrypt password hashing, CORS locked to the frontend origin,
  rate limiting + honeypot on the public contact form.
- **Cold-start handling**: the SPA pings `/api/health` on load to pre-warm the free
  Render instance; a keep-alive cron keeps it awake.
- **Type-safe contract**: a single `shared/models.ts` mirrors the backend Pydantic
  schemas; the API speaks camelCase end to end.
