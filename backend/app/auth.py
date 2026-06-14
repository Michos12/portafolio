"""Admin panel authentication: simple JWT for a single administrator.

The admin username/password live in environment variables. The password is
stored as a bcrypt hash (ADMIN_PASSWORD_HASH), never in plaintext.
"""

import secrets
from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from .config import get_settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")

_credentials_exc = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not authorized",
    headers={"WWW-Authenticate": "Bearer"},
)


def hash_password(plain: str) -> str:
    """Return the bcrypt hash of a password (helper to generate credentials)."""
    return bcrypt.hashpw(plain.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def authenticate_admin(username: str, password: str) -> bool:
    """Compare against env credentials in a timing-safe way."""
    settings = get_settings()
    if not username or not password or not settings.admin_password_hash:
        return False
    user_ok = secrets.compare_digest(username, settings.admin_username)
    pass_ok = verify_password(password, settings.admin_password_hash)
    return user_ok and pass_ok


def create_access_token(subject: str) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def get_current_admin(token: str = Depends(oauth2_scheme)) -> str:
    """Dependency that protects routes: validates the JWT and returns the subject."""
    settings = get_settings()
    try:
        payload = jwt.decode(
            token, settings.jwt_secret, algorithms=[settings.jwt_algorithm]
        )
    except JWTError:
        raise _credentials_exc
    subject = payload.get("sub")
    if subject is None:
        raise _credentials_exc
    return subject
