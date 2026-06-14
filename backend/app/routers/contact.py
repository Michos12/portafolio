"""Public contact form endpoint.

Anti-spam protections:
- Rate limiting (slowapi): max 5 submissions per minute per IP.
- Honeypot: hidden `website` field; if it arrives filled we assume a bot and discard.
"""

from fastapi import APIRouter, Request

from ..db import get_supabase
from ..limiter import limiter
from ..schemas import MessageCreate

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", status_code=201)
@limiter.limit("5/minute")
def create_message(request: Request, payload: MessageCreate):
    # Honeypot: still return 201 so we don't tip off the bot, but persist nothing.
    if payload.website:
        return {"status": "ok"}

    sb = get_supabase()
    sb.table("messages").insert(
        {
            "name": payload.name,
            "email": payload.email,
            "body": payload.body,
        }
    ).execute()
    return {"status": "ok"}
