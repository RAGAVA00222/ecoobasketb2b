/**
 * Lead capture: validation, normalisation and delivery.
 *
 * Everything in this file is SERVER-ONLY. It is imported exclusively by
 * app/api/leads/route.ts. No credential read here is prefixed NEXT_PUBLIC_,
 * so none of them can be inlined into the browser bundle.
 */

export interface LeadInput {
  name?: unknown;
  mobile?: unknown;
  email?: unknown;
  businessName?: unknown;
  area?: unknown;
  message?: unknown;
  /** Honeypot. Real users never see this field, so a filled value means a bot. */
  company?: unknown;
}

export interface Lead {
  name: string;
  mobile: string;
  email: string;
  businessName: string;
  area: string;
  message: string;
  receivedAt: string;
  sourceIp: string;
  userAgent: string;
}

export interface ValidationResult {
  ok: boolean;
  /** field -> human-readable problem. Safe to show the visitor. */
  errors: Record<string, string>;
  lead?: Lead;
}

/** Upper bounds so one request cannot be used to flood storage or logs. */
const LIMITS = {
  name: 100,
  mobile: 20,
  email: 254,
  businessName: 150,
  area: 100,
  message: 2000,
} as const;

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

/** Strip all non-digits so "+91 93423 58226" and "9342358226" compare equal. */
export const digitsOnly = (value: string): string => value.replace(/[^0-9]/g, "");

/**
 * Indian mobile numbers are 10 digits starting 6-9. The same number written
 * with the 91 country code (with or without "+") or a leading 0 is accepted
 * and normalised down to the bare 10 digits.
 */
export function normaliseMobile(raw: string): string | null {
  let digits = digitsOnly(raw);
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  if (!"6789".includes(digits.charAt(0))) return null;
  return digits;
}

/**
 * Deliberately permissive. Over-strict email rules reject real customers - an
 * earlier version of this form rejected every address containing a capital
 * letter. Email is OPTIONAL here; mobile is the channel that matters for a
 * kirana-store customer base.
 */
export function isPlausibleEmail(value: string): boolean {
  if (value.length > LIMITS.email) return false;
  if (/\s/.test(value)) return false;
  const at = value.indexOf("@");
  if (at < 1 || at !== value.lastIndexOf("@")) return false;
  const domain = value.slice(at + 1);
  if (domain.length < 3 || !domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;
  return true;
}

export function validateLead(
  input: LeadInput,
  meta: { sourceIp: string; userAgent: string }
): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot: a bot filled a field no human can see. Returned as a generic
  // failure so the bot learns nothing about why it was rejected.
  if (asString(input.company)) {
    return { ok: false, errors: { form: "Submission rejected." } };
  }

  const name = asString(input.name);
  const mobileRaw = asString(input.mobile);
  const email = asString(input.email);
  const businessName = asString(input.businessName);
  const area = asString(input.area);
  const message = asString(input.message);

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  let mobile: string | null = null;
  if (!mobileRaw) {
    errors.mobile = "Please enter your mobile number.";
  } else if (mobileRaw.length > LIMITS.mobile) {
    errors.mobile = "Mobile number is too long.";
  } else {
    mobile = normaliseMobile(mobileRaw);
    if (!mobile) errors.mobile = "Enter a valid 10-digit Indian mobile number.";
  }

  // Optional - validated only when the visitor actually supplied one.
  if (email && !isPlausibleEmail(email)) {
    errors.email = "Enter a valid email address, or leave it blank.";
  }

  if (!message) errors.message = "Please tell us what you need.";
  else if (message.length > LIMITS.message) errors.message = "Message is too long.";

  if (businessName.length > LIMITS.businessName) {
    errors.businessName = "Business name is too long.";
  }
  if (area.length > LIMITS.area) errors.area = "Area is too long.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    errors: {},
    lead: {
      name,
      mobile: mobile as string,
      email,
      businessName,
      area,
      message,
      receivedAt: new Date().toISOString(),
      sourceIp: meta.sourceIp,
      userAgent: meta.userAgent.slice(0, 200),
    },
  };
}

/** Human-readable rendering used for the notification email and server log. */
export function formatLead(lead: Lead): string {
  return [
    "Name          : " + lead.name,
    "Mobile        : +91 " + lead.mobile,
    "Email         : " + (lead.email || "(not provided)"),
    "Business/Shop : " + (lead.businessName || "(not provided)"),
    "Area          : " + (lead.area || "(not provided)"),
    "Message       : " + lead.message,
    "Received      : " + lead.receivedAt,
  ].join("\n");
}

export interface DeliveryOutcome {
  /** true when at least one durable destination accepted the lead. */
  delivered: boolean;
  /** Names of destinations that accepted it. */
  via: string[];
  /** Non-fatal problems, for server logs only. Never sent to the browser. */
  failures: string[];
  /** true when this deployment has no destination configured at all. */
  unconfigured: boolean;
}

const DELIVERY_TIMEOUT_MS = 8000;

async function deliverToWebhook(lead: Lead): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) throw new Error("LEAD_WEBHOOK_URL not set");

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  // Shared secret lets the receiver reject anything that is not from this site.
  if (secret) headers["X-Ecoo-Signature"] = secret;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ source: "ecoobasketb2b.com", lead }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("webhook responded " + response.status);
  } finally {
    clearTimeout(timer);
  }
}

async function deliverByEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) throw new Error("email delivery not configured");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);
  try {
    const subject =
      "New enquiry: " + lead.name + (lead.businessName ? " - " + lead.businessName : "");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email || undefined,
        subject,
        text: formatLead(lead),
      }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("resend responded " + response.status);
  } finally {
    clearTimeout(timer);
  }
}

/** True when this deployment has at least one lead destination configured. */
export function hasConfiguredDestination(): boolean {
  if (process.env.LEAD_WEBHOOK_URL) return true;
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEAD_NOTIFY_EMAIL &&
      process.env.LEAD_FROM_EMAIL
  );
}

/**
 * Attempts every configured destination; succeeds if ANY of them accepts.
 *
 * When nothing is configured, `unconfigured` comes back true and the caller
 * MUST NOT report success to the visitor. Reporting a false success is the
 * exact bug this pipeline exists to eliminate.
 */
export async function deliverLead(lead: Lead): Promise<DeliveryOutcome> {
  const destinations: Array<{ name: string; run: () => Promise<void> }> = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    destinations.push({ name: "webhook", run: () => deliverToWebhook(lead) });
  }
  if (
    process.env.RESEND_API_KEY &&
    process.env.LEAD_NOTIFY_EMAIL &&
    process.env.LEAD_FROM_EMAIL
  ) {
    destinations.push({ name: "email", run: () => deliverByEmail(lead) });
  }

  if (destinations.length === 0) {
    return { delivered: false, via: [], failures: [], unconfigured: true };
  }

  const results = await Promise.allSettled(destinations.map((d) => d.run()));
  const via: string[] = [];
  const failures: string[] = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") via.push(destinations[index].name);
    else failures.push(destinations[index].name + ": " + String(result.reason).slice(0, 200));
  });

  return { delivered: via.length > 0, via, failures, unconfigured: false };
}
