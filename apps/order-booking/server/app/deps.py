from __future__ import annotations

from fastapi import Header, HTTPException, status

from .config import get_settings


def require_admin(x_admin_key: str | None = Header(default=None)) -> None:
    """Guards the catalogue-write routes. Salesmen read prices; only admin
    sets them — the app has no login, so the key never ships to field devices.

    If ADMIN_API_KEY is unset the routes are refused outright rather than left
    open, so a missing env var can't silently publish price editing.
    """
    settings = get_settings()
    if not settings.admin_api_key:
        raise HTTPException(
            status.HTTP_503_SERVICE_UNAVAILABLE,
            "ADMIN_API_KEY is not configured on the server",
        )
    if x_admin_key != settings.admin_api_key:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid admin key")
