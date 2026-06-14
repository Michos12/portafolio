# Backend — Portfolio API (FastAPI)

REST API that powers the portfolio: dynamic projects, contact form, GitHub proxy
and a JWT-protected admin panel.

## Stack
- **FastAPI** + **Pydantic v2** (validation + automatic OpenAPI)
- **Supabase** (PostgreSQL) as storage
- **python-jose** (JWT) + **bcrypt** (admin auth)
- **slowapi** (rate limiting) + honeypot (anti-spam)
- **httpx** (async proxy to the GitHub API with in-memory cache)

## Structure
```
backend/
├── app/
│   ├── main.py          # FastAPI app, CORS, rate limiter, /api/health
│   ├── config.py        # settings from environment variables
│   ├── schemas.py       # data contract (Pydantic, camelCase)
│   ├── db.py            # Supabase client
│   ├── auth.py          # JWT + admin credential verification
│   ├── limiter.py       # slowapi instance
│   └── routers/
│       ├── projects.py  # GET  /api/projects, /api/projects/{id}
│       ├── contact.py   # POST /api/contact (rate-limited + honeypot)
│       ├── github.py    # GET  /api/github/activity (cached)
│       └── admin.py     # POST /api/admin/login + project CRUD (JWT)
├── schema.sql           # DDL to create the Supabase tables
├── requirements.txt
└── .env.example
```

## Endpoints
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/api/health` | — | Health check / keep-alive |
| GET | `/api/projects` | — | List projects (ordered) |
| GET | `/api/projects/{id}` | — | Project detail |
| POST | `/api/contact` | — | Send a message (5/min, honeypot) |
| GET | `/api/github/activity` | — | Recent repos (cached proxy) |
| POST | `/api/admin/login` | — | Admin login → returns JWT |
| POST | `/api/admin/projects` | JWT | Create project |
| PUT | `/api/admin/projects/{id}` | JWT | Update project |
| DELETE | `/api/admin/projects/{id}` | JWT | Delete project |

## Getting started (local)
```bash
cd backend
python -m venv .venv
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
# (Linux/Mac: source .venv/bin/activate)

pip install -r requirements.txt
cp .env.example .env      # then fill in the values
uvicorn app.main:app --reload
```
Open http://localhost:8000/docs to try the API (Swagger UI).

### Create the tables
Paste the contents of `schema.sql` into the Supabase SQL Editor and run it.

### Generate the admin password hash
```bash
python -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt()).decode())"
```
Paste the result into `ADMIN_PASSWORD_HASH` in your `.env`.

## Deployment (Render)
- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Define every environment variable from `.env.example` in the Render dashboard.
- `FRONTEND_ORIGIN` = your Vercel domain (for CORS).
- Remember the keep-alive cron hitting `/api/health` (the free tier sleeps after 15 min).
