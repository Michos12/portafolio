"""Rate limiter (slowapi). Defined separately so it can be imported both from
main.py (registration) and from the routers (@limiter.limit decorators)."""

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
