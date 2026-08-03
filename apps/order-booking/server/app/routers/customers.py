from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..services.orders import get_or_create_customer

router = APIRouter(prefix="/api/v1/customers", tags=["customers"])


@router.get("/lookup", response_model=schemas.CustomerOut)
def lookup(mobile: str, db: Session = Depends(get_db)):
    """Mobile -> name. The device answers this from its own SQLite mirror
    first; this route exists for cold devices and for the admin console."""
    try:
        normalised = schemas.normalise_mobile(mobile)
    except ValueError as exc:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, str(exc)) from exc
    customer = db.scalar(
        select(models.Customer).where(models.Customer.mobile == normalised)
    )
    if customer is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "customer not found")
    return customer


@router.get("", response_model=list[schemas.CustomerOut])
def list_customers(
    db: Session = Depends(get_db),
    updated_since: datetime | None = Query(default=None),
    limit: int = Query(default=2000, le=10000),
):
    stmt = select(models.Customer)
    if updated_since is not None:
        stmt = stmt.where(models.Customer.updated_at > updated_since)
    stmt = stmt.order_by(models.Customer.updated_at).limit(limit)
    return list(db.scalars(stmt))


@router.post("", response_model=schemas.CustomerOut, status_code=status.HTTP_201_CREATED)
def upsert_customer(payload: schemas.CustomerIn, db: Session = Depends(get_db)):
    customer = get_or_create_customer(db, payload.mobile, payload.name)
    db.commit()
    return customer
