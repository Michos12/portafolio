"""Central app configuration. Reads environment variables (.env in local dev).

Never hardcode secrets here: in production they are injected as environment
variables on the platform (Render). In local dev they are read from backend/.env
(see .env.example).
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    # --- Supabase (PostgreSQL) ---
    supabase_url: str = ""
    supabase_key: str = ""

    # --- Auth / JWT ---
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    admin_username: str = "admin"
    # bcrypt hash of the password (NOT the plaintext password). Generate it with:
    #   python -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASS', bcrypt.gensalt()).decode())"
    admin_password_hash: str = ""

    # --- GitHub API ---
    github_username: str = ""
    github_token: str = ""  # optional; raises the rate limit from 60 to 5000 req/h
    github_cache_ttl: int = 600  # seconds

    # --- CORS ---
    # Allowed origins, comma-separated. In production = your Vercel domain.
    frontend_origin: str = "http://localhost:4200"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.frontend_origin.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
