"""Rate limiter (slowapi). Defined separately so it can be imported both from
main.py (registration) and from the routers (@limiter.limit decorators)."""

from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address


def client_ip(request: Request) -> str:
    """Best-effort real client IP, used as the rate-limit key.

    Behind Render's proxy every request arrives from the proxy's address, so
    keying on it would make all visitors share one bucket. The proxy appends the
    IP it saw to X-Forwarded-For; we take the right-most entry because anything
    to its left is supplied by the client and could be spoofed to dodge limits.
    """
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[-1].strip()
    return get_remote_address(request)


limiter = Limiter(key_func=client_ip)
