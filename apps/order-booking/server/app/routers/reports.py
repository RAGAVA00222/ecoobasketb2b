from __future__ import annotations

from datetime import date

from fastapi import APIRouter, Depends, Query, Response
from sqlalchemy.orm import Session

from .. import schemas
from ..db import get_db
from ..services import excel, pdf, reports
from ..services.clock import today_local

router = APIRouter(prefix="/api/v1", tags=["reports"])


def _range(on: date | None, from_date: date | None, to_date: date | None):
    start = from_date or on or today_local()
    end = to_date or on or today_local()
    return (start, end) if start <= end else (end, start)


@router.get("/reports/summary", response_model=schemas.ReportSummary)
def summary(
    db: Session = Depends(get_db),
    on: date | None = Query(default=None),
    from_date: date | None = None,
    to_date: date | None = None,
):
    start, end = _range(on, from_date, to_date)
    return reports.summary(db, start, end)


@router.get("/reports/load-sheet", response_model=schemas.LoadSheet)
def load_sheet(
    db: Session = Depends(get_db),
    on: date | None = Query(default=None),
    from_date: date | None = None,
    to_date: date | None = None,
):
    start, end = _range(on, from_date, to_date)
    return reports.load_sheet(db, start, end)


@router.get(
    "/export/load-sheet.pdf",
    response_class=Response,
    responses={200: {"content": {"application/pdf": {}}}},
)
def export_load_sheet_pdf(
    db: Session = Depends(get_db),
    on: date | None = Query(default=None),
    from_date: date | None = None,
    to_date: date | None = None,
):
    """The warehouse's copy: one block per supplier, box counts set large
    enough to read while counting cartons."""
    start, end = _range(on, from_date, to_date)
    payload = pdf.build_load_sheet(db, start, end)
    return Response(
        content=payload,
        media_type="application/pdf",
        headers={
            "Content-Disposition": (
                f'attachment; filename="{pdf.filename_for(start, end)}"'
            )
        },
    )


@router.get(
    "/export/orders.xlsx",
    response_class=Response,
    responses={200: {"content": {"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {}}}},
)
def export_orders(
    db: Session = Depends(get_db),
    on: date | None = Query(default=None),
    from_date: date | None = None,
    to_date: date | None = None,
):
    """One click, one workbook: Orders + Load Sheet + Summary."""
    start, end = _range(on, from_date, to_date)
    payload = excel.build_workbook(db, start, end)
    return Response(
        content=payload,
        media_type=(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ),
        headers={
            "Content-Disposition": (
                f'attachment; filename="{excel.filename_for(start, end)}"'
            )
        },
    )
