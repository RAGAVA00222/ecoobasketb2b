from __future__ import annotations

from datetime import date, datetime, timezone
from zoneinfo import ZoneInfo

from ..config import get_settings


def local_tz() -> ZoneInfo:
    return ZoneInfo(get_settings().timezone)


def today_local() -> date:
    return datetime.now(local_tz()).date()


def to_local_date(moment: datetime) -> date:
    """A 23:40 IST booking belongs to that day's load sheet, not tomorrow's
    UTC one — so the business date always comes from the local wall clock."""
    if moment.tzinfo is None:
        moment = moment.replace(tzinfo=timezone.utc)
    return moment.astimezone(local_tz()).date()
