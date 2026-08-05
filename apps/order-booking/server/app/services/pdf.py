"""Load sheet as PDF.

This is the sheet that gets printed and carried into the warehouse, or sent to
a supplier over WhatsApp. Excel is for the admin who wants to pivot; PDF is for
the person holding a clipboard next to a stack of cartons.

It is laid out to be *read while counting*: one block per supplier, product
name left, box count right in a large bold figure, and a per-supplier subtotal
so a partial delivery can be checked off one brand at a time.
"""

from __future__ import annotations

from datetime import date
from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)
from sqlalchemy.orm import Session

from . import reports

GREEN = colors.HexColor("#1E7D3A")
DARK = colors.HexColor("#14211A")
MUTED = colors.HexColor("#6B7A73")
RULE = colors.HexColor("#E6EBE8")

_title = ParagraphStyle(
    "title", fontName="Helvetica-Bold", fontSize=17, textColor=DARK, leading=21
)
_subtitle = ParagraphStyle(
    "subtitle", fontName="Helvetica", fontSize=9.5, textColor=MUTED, leading=13
)
_brand = ParagraphStyle(
    "brand", fontName="Helvetica-Bold", fontSize=11.5, textColor=GREEN, leading=15
)


def _rupees(paise: int) -> str:
    """Indian grouping, whole rupees. 12345678 -> '1,23,456'."""
    whole = round(paise / 100)
    text = str(abs(whole))
    if len(text) > 3:
        head, tail = text[:-3], text[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        text = ",".join(parts) + "," + tail
    return ("-" if whole < 0 else "") + text


def build_load_sheet(db: Session, from_date: date, to_date: date) -> bytes:
    sheet = reports.load_sheet(db, from_date, to_date)

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        leftMargin=16 * mm,
        rightMargin=16 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=f"Ecoo Basket load sheet {from_date.isoformat()}",
        author="Ecoo Basket",
    )

    when = (
        from_date.strftime("%d %b %Y")
        if from_date == to_date
        else f"{from_date.strftime('%d %b %Y')} to {to_date.strftime('%d %b %Y')}"
    )

    story: list = [
        Paragraph("Ecoo Basket — Load Sheet", _title),
        Paragraph(
            f"{when} &nbsp;·&nbsp; {sheet.total_boxes} boxes across "
            f"{len(sheet.lines)} products",
            _subtitle,
        ),
        Spacer(1, 7 * mm),
    ]

    if not sheet.lines:
        story.append(Paragraph("No orders booked in this period.", _subtitle))
        doc.build(story)
        return buffer.getvalue()

    # One block per supplier: the warehouse raises a separate purchase order
    # per brand, so the sheet has to be readable one brand at a time.
    by_brand: dict[str, list] = {}
    for line in sheet.lines:
        by_brand.setdefault(line.brand or "Unassigned", []).append(line)

    for brand in sorted(by_brand, key=lambda b: (b == "Unassigned", b.lower())):
        lines = sorted(by_brand[brand], key=lambda x: -x.total_boxes)
        rows = [["Product", "Boxes", "Value"]]
        rows += [
            [line.product_name, str(line.total_boxes), _rupees(line.total_value_paise)]
            for line in lines
        ]
        rows.append(
            [
                "Subtotal",
                str(sum(line.total_boxes for line in lines)),
                _rupees(sum(line.total_value_paise for line in lines)),
            ]
        )

        table = Table(rows, colWidths=[110 * mm, 28 * mm, 40 * mm], repeatRows=1)
        table.setStyle(
            TableStyle(
                [
                    ("FONT", (0, 0), (-1, 0), "Helvetica-Bold", 9),
                    ("TEXTCOLOR", (0, 0), (-1, 0), MUTED),
                    ("LINEBELOW", (0, 0), (-1, 0), 0.6, RULE),
                    ("FONT", (0, 1), (0, -2), "Helvetica", 11),
                    # The box count is the number being counted against, so it
                    # is the largest thing on the row.
                    ("FONT", (1, 1), (1, -2), "Helvetica-Bold", 13),
                    ("FONT", (2, 1), (2, -2), "Helvetica", 10),
                    ("TEXTCOLOR", (1, 1), (1, -2), DARK),
                    ("TEXTCOLOR", (2, 1), (2, -1), MUTED),
                    ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("FONT", (0, -1), (-1, -1), "Helvetica-Bold", 10),
                    ("LINEABOVE", (0, -1), (-1, -1), 0.6, RULE),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -2), [colors.white, colors.HexColor("#FAFBFA")]),
                ]
            )
        )
        # Keeps a supplier's heading with at least the start of its table
        # rather than stranding it at the foot of a page.
        story.append(KeepTogether([Paragraph(brand, _brand), Spacer(1, 2 * mm), table]))
        story.append(Spacer(1, 6 * mm))

    total = Table(
        [["TOTAL", str(sheet.total_boxes), _rupees(
            sum(line.total_value_paise for line in sheet.lines)
        )]],
        colWidths=[110 * mm, 28 * mm, 40 * mm],
    )
    total.setStyle(
        TableStyle(
            [
                ("FONT", (0, 0), (-1, -1), "Helvetica-Bold", 12),
                ("TEXTCOLOR", (0, 0), (-1, -1), GREEN),
                ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
                ("LINEABOVE", (0, 0), (-1, 0), 1.1, GREEN),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(total)

    doc.build(story)
    return buffer.getvalue()


def filename_for(from_date: date, to_date: date) -> str:
    if from_date == to_date:
        return f"ecoo-load-sheet-{from_date.isoformat()}.pdf"
    return f"ecoo-load-sheet-{from_date.isoformat()}-to-{to_date.isoformat()}.pdf"
