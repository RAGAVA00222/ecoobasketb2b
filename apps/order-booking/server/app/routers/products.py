from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import require_admin

router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("", response_model=list[schemas.ProductOut])
def list_products(
    db: Session = Depends(get_db),
    include_inactive: bool = False,
    updated_since: datetime | None = Query(
        default=None,
        description="Delta sync: return only rows changed after this timestamp.",
    ),
):
    stmt = select(models.Product)
    if not include_inactive and updated_since is None:
        # A delta sync must still learn about deactivations, so the filter only
        # applies to full catalogue pulls.
        stmt = stmt.where(models.Product.active.is_(True))
    if updated_since is not None:
        stmt = stmt.where(models.Product.updated_at > updated_since)
    stmt = stmt.order_by(models.Product.sort_order, models.Product.name)
    return list(db.scalars(stmt))


@router.post(
    "", response_model=schemas.ProductOut, status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_admin)],
)
def create_product(payload: schemas.ProductIn, db: Session = Depends(get_db)):
    if db.scalar(select(models.Product).where(models.Product.sku == payload.sku)):
        raise HTTPException(status.HTTP_409_CONFLICT, "sku already exists")
    product = models.Product(**payload.model_dump())
    db.add(product)
    db.commit()
    return product


@router.patch(
    "/{product_id}", response_model=schemas.ProductOut,
    dependencies=[Depends(require_admin)],
)
def update_product(
    product_id: int, payload: schemas.ProductPatch, db: Session = Depends(get_db)
):
    product = db.get(models.Product, product_id)
    if product is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "product not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(product, field, value)
    db.commit()
    return product


@router.delete(
    "/{product_id}", status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_admin)],
)
def deactivate_product(product_id: int, db: Session = Depends(get_db)):
    """Deactivates rather than deletes — historical order lines still point here."""
    product = db.get(models.Product, product_id)
    if product is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "product not found")
    product.active = False
    db.commit()
