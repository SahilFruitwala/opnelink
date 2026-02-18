globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../chunks/_@astro-renderers_CVAcGqfW.mjs';

const BEEHIIV_API = "https://api.beehiiv.com/v2";
function isValidEmail(value) {
  if (typeof value !== "string" || value.length > 254) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value.trim());
}
const POST = async ({ request }) => {
  const apiKey = "o4vJ3jjhoyMwBFGXO5b4f6yCgYLY8j9TjPzTFD1IrD6JLFHhpMa36IZvzIZLYulH";
  const publicationId = "pub_de11f462-99c1-4164-9392-90f5b09d89ab";
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const email = body.email;
  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ error: "A valid email is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const payload = {
    email: email.trim().toLowerCase(),
    send_welcome_email: true
  };
  const optionalFields = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "referring_site"
  ];
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  if (response.ok) {
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  const contentType = response.headers.get("content-type");
  let errorMessage = "Subscription failed. Please try again.";
  if (contentType?.includes("application/json")) {
    try {
      const data = await response.json();
      const msg = data.message ?? data.error;
      if (typeof msg === "string" && msg.length < 200) {
        errorMessage = msg;
      }
    } catch {
    }
  }
  const status = response.status >= 500 ? 502 : response.status;
  return new Response(
    JSON.stringify({ error: errorMessage }),
    { status, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
