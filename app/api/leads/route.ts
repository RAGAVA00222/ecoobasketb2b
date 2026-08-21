import { NextRequest, NextResponse } from "next/server";
import {
  deliverLead,
  formatLead,
  validateLead,
  type LeadInput,
} from "@/lib/leads";

/**
 * POST /api/leads - the enquiry form's submission endpoint.
 *
 * Runs on the Node runtime because delivery uses outbound fetch with timeouts.
 * force-dynamic keeps it out of any static/ISR cache: every submission must
 * reach the handler.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reject oversized bodies before parsing them. */
const MAX_BODY_BYTES = 16 * 1024;

/*
  Per-IP throttle. The limit is checked before validation, so a visitor who
  mistypes their mobile and corrects it spends attempts too - hence a ceiling
  high enough that no genuine customer can reach it while still stopping a
  script cold.
*/
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 12;

/** Window in which an identical resubmission is treated as an accidental double-send. */
const DEDUPE_WINDOW_MS = 2 * 60 * 1000;

type Hit = { count: number; resetAt: number };

/*
  In-memory stores. Deliberately simple, with known limits:
    - they reset on cold start
    - they are per-instance, so a multi-instance deployment throttles per instance
  That is acceptable for a brochure site's contact form: the goal is stopping
  accidental double-taps and casual spam, not resisting a determined attacker.
  Moving to Redis/Upstash would be the upgrade if abuse ever appears.
*/
const rateLimitStore = new Map<string, Hit>();
const recentSubmissions = new Map<string, number>();

function sweep(now: number) {
  for (const [key, hit] of rateLimitStore) {
    if (hit.resetAt <= now) rateLimitStore.delete(key);
  }
  for (const [key, at] of recentSubmissions) {
    if (now - at > DEDUPE_WINDOW_MS) recentSubmissions.delete(key);
  }
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(ip: string, now: number): boolean {
  const hit = rateLimitStore.get(ip);
  if (!hit || hit.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  hit.count += 1;
  return hit.count > RATE_LIMIT_MAX;
}

export async function POST(request: NextRequest) {
  const now = Date.now();
  sweep(now);

  const ip = clientIp(request);

  if (rateLimited(ip, now)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many submissions from this connection. Please try again shortly, or reach us on WhatsApp.",
      },
      { status: 429 }
    );
  }

  // --- Parse defensively: never let a malformed body throw a 500. ---
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That message is too long." },
      { status: 413 }
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the submission." },
      { status: 400 }
    );
  }

  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "That message is too long." },
      { status: 413 }
    );
  }

  let body: LeadInput;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    body = parsed as LeadInput;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid submission format." },
      { status: 400 }
    );
  }

  // --- Server-side validation. The browser's checks are a convenience only. ---
  const result = validateLead(body, {
    sourceIp: ip,
    userAgent: request.headers.get("user-agent") ?? "",
  });

  if (!result.ok || !result.lead) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", fields: result.errors },
      { status: 400 }
    );
  }

  const lead = result.lead;

  /*
    Duplicate suppression. The fingerprint covers every field the visitor can
    edit, so only a genuinely identical resubmission (a double-tap, or a retry
    after a flaky connection) is suppressed. If they correct a typo in their
    shop name and send again, that is a different fingerprint and it goes
    through as a fresh lead rather than being silently swallowed.
  */
  const fingerprint = [
    lead.mobile,
    lead.message,
    lead.name,
    lead.email,
    lead.businessName,
    lead.area,
  ].join("|");
  const seenAt = recentSubmissions.get(fingerprint);
  if (seenAt && now - seenAt < DEDUPE_WINDOW_MS) {
    // Idempotent: report success without delivering a second copy, so a
    // double-tap never produces two entries and never shows a scary error.
    return NextResponse.json(
      { ok: true, duplicate: true, message: "We already have this enquiry - our team will call you shortly." },
      { status: 200 }
    );
  }

  const outcome = await deliverLead(lead);

  /*
    Always write the structured lead to the server log BEFORE branching on the
    outcome. Host platforms (Vercel, Netlify) retain these, so even a total
    delivery failure leaves the lead recoverable rather than lost.
  */
  console.log("[lead] received\n" + formatLead(lead));

  if (outcome.unconfigured) {
    console.error(
      "[lead] NO DESTINATION CONFIGURED - set LEAD_WEBHOOK_URL or the RESEND_* variables. Lead exists only in this log."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not submit your enquiry automatically. Please send it on WhatsApp or call us - we do not want to lose it.",
      },
      { status: 503 }
    );
  }

  if (!outcome.delivered) {
    console.error("[lead] delivery failed: " + outcome.failures.join(" | "));
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not submit your enquiry just now. Please send it on WhatsApp or call us - we do not want to lose it.",
      },
      { status: 502 }
    );
  }

  // Partial failure: one destination worked, another did not. The lead is safe.
  if (outcome.failures.length > 0) {
    console.warn("[lead] partial delivery: " + outcome.failures.join(" | "));
  }

  recentSubmissions.set(fingerprint, now);

  return NextResponse.json(
    { ok: true, message: "Thank you - your enquiry has reached our sales team." },
    { status: 200 }
  );
}

/** Anything other than POST is not supported. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
