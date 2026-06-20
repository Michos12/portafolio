"""Entry point for the portfolio API (FastAPI).

Run locally:    uvicorn app.main:app --reload
Interactive docs: http://localhost:8000/docs
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from .config import get_settings
from .limiter import limiter
from .routers import admin, contact, github, projects

settings = get_settings()

app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
    description="Full Stack portfolio backend: projects, contact and GitHub.",
    docs_url="/docs" if settings.enable_docs else None,
    redoc_url="/redoc" if settings.enable_docs else None,
    openapi_url="/openapi.json" if settings.enable_docs else None,
)

# Rate limiting (slowapi)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS: only allowed origins (Vercel in prod, localhost in dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects.router)
app.include_router(contact.router)
app.include_router(github.router)
app.include_router(admin.router)


@app.get("/api/health", tags=["health"])
def health():
    """Lightweight endpoint for the keep-alive cron and Render health checks."""
    return {"status": "ok"}
