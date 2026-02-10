import posthog from "posthog-js";

let initialized = false;

export function initPosthog() {
  if (initialized || typeof window === "undefined") return;
  if (process.env.NODE_ENV === "development") {
    initialized = true;
    return;
  }

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (!key) {
    initialized = true;
    return;
  }

  posthog.init(key, {
    api_host: host,
    capture_pageview: false,
    autocapture: true,
  });

  initialized = true;
}

export { posthog };

