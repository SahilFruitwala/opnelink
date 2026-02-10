import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_API = "https://api.beehiiv.com/v2";

function isValidEmail(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 254) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    return NextResponse.json(
      { error: "Newsletter is not configured." },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email;
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 }
    );
  }

  const payload: Record<string, unknown> = {
    email: (email as string).trim().toLowerCase(),
    send_welcome_email: true,
  };

  const optionalFields = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "referring_site",
  ] as const;
  for (const key of optionalFields) {
    const value = body[key];
    if (typeof value === "string" && value.trim()) {
      payload[key] = value.trim();
    }
  }

  const url = `${BEEHIIV_API}/publications/${publicationId}/subscriptions`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return NextResponse.json({ success: true });
  }

  const contentType = response.headers.get("content-type");
  let errorMessage = "Subscription failed. Please try again.";
  if (contentType?.includes("application/json")) {
    try {
      const data = (await response.json()) as { message?: string; error?: string };
      const msg = data.message ?? data.error;
      if (typeof msg === "string" && msg.length < 200) {
        errorMessage = msg;
      }
    } catch {
      // keep default
    }
  }

  const status = response.status >= 500 ? 502 : response.status;
  return NextResponse.json({ error: errorMessage }, { status });
}
