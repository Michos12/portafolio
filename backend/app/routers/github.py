"""Proxy to the GitHub REST API with an in-memory cache (configurable TTL).

Avoids exposing the GitHub token to the frontend and prevents exhausting the
rate limit: the response is cached for GITHUB_CACHE_TTL seconds. If GitHub fails
and a previous (even expired) cache exists, that copy is returned as a fallback.
"""

import time

import httpx
from fastapi import APIRouter, HTTPException

from ..config import get_settings

router = APIRouter(prefix="/api/github", tags=["github"])

# Simple in-memory cache: { "activity": (timestamp, data) }
_cache: dict[str, tuple[float, list[dict]]] = {}


async def _fetch_repos(username: str, token: str) -> list[dict]:
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    url = f"https://api.github.com/users/{username}/repos"
    params = {"sort": "updated", "per_page": 6}
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(url, headers=headers, params=params)
        resp.raise_for_status()
        return resp.json()


@router.get("/activity")
async def github_activity():
    settings = get_settings()
    if not settings.github_username:
        raise HTTPException(status_code=503, detail="GITHUB_USERNAME is not configured")

    now = time.time()
    cached = _cache.get("activity")
    if cached and now - cached[0] < settings.github_cache_ttl:
        return cached[1]

    try:
        repos = await _fetch_repos(settings.github_username, settings.github_token)
    except httpx.HTTPError as exc:
        if cached:  # fall back to the stale copy if GitHub fails
            return cached[1]
        raise HTTPException(status_code=502, detail=f"Error querying GitHub: {exc}")

    data = [
        {
            "name": r["name"],
            "description": r.get("description"),
            "url": r["html_url"],
            "stars": r.get("stargazers_count", 0),
            "language": r.get("language"),
            "updatedAt": r["updated_at"],
        }
        for r in repos
    ]
    _cache["activity"] = (now, data)
    return data
