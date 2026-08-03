"""Runtime configuration. Everything is env-driven so the same image runs
locally (SQLite) and in production (PostgreSQL)."""

from __future__ import annotations

import os
from functools import lru_cache


class Settings:
    def __init__(self) -> None:
        # postgresql+psycopg://user:pass@host:5432/ecoo_orders in production.
        self.database_url: str = os.getenv(
            "DATABASE_URL", "sqlite:///./ecoo_orders.db"
        )
        self.app_name: str = os.getenv("APP_NAME", "Ecoo Basket Order Booking API")
        # Salesmen devices send this; admin-only routes need the admin key.
        self.admin_api_key: str | None = os.getenv("ADMIN_API_KEY")
        self.cors_origins: list[str] = [
            o.strip()
            for o in os.getenv("CORS_ORIGINS", "*").split(",")
            if o.strip()
        ]
        # Images live in cloud storage; the API only stores/serves the URL.
        self.image_base_url: str = os.getenv("IMAGE_BASE_URL", "")
        # Reports and "today" are always computed in the distributor's timezone,
        # never in UTC — a 11pm order must land on the day the salesman booked it.
        self.timezone: str = os.getenv("TIMEZONE", "Asia/Kolkata")


@lru_cache
def get_settings() -> Settings:
    return Settings()
