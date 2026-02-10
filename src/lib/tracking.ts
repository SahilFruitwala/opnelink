export type UTMParams = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  [key: string]: string | undefined;
};

export type TrackingContext = {
  utm: UTMParams;
  sourcePlatform?: string;
  referrerHost?: string | null;
};

let cachedContext: TrackingContext | null = null;

const hostToPlatform: Record<string, string> = {
  "instagram.com": "instagram",
  "www.instagram.com": "instagram",
  "l.instagram.com": "instagram",
  "t.co": "x",
  "x.com": "x",
  "www.x.com": "x",
  "twitter.com": "x",
  "www.twitter.com": "x",
  "linkedin.com": "linkedin",
  "www.linkedin.com": "linkedin",
  "facebook.com": "facebook",
  "www.facebook.com": "facebook",
  "youtu.be": "youtube",
  "youtube.com": "youtube",
  "www.youtube.com": "youtube",
};

function derivePlatformFromHost(host: string | null): string | undefined {
  if (!host) return undefined;
  const lower = host.toLowerCase();
  if (hostToPlatform[lower]) return hostToPlatform[lower];
  const parts = lower.split(".");
  if (parts.length > 2) {
    const trimmed = parts.slice(parts.length - 2).join(".");
    if (hostToPlatform[trimmed]) return hostToPlatform[trimmed];
  }
  return undefined;
}

export function getTrackingContext(): TrackingContext | null {
  if (typeof window === "undefined") return null;
  if (cachedContext) return cachedContext;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  const incomingUTM: UTMParams = {};
  for (const key of params.keys()) {
    if (key.startsWith("utm_")) {
      incomingUTM[key] = params.get(key) ?? undefined;
    }
  }

  const referrer =
    typeof document !== "undefined" && document.referrer
      ? new URL(document.referrer)
      : null;
  const referrerHost = referrer?.host ?? null;
  const platformFromReferrer = derivePlatformFromHost(referrerHost);

  const utm: UTMParams = {
    utm_source: incomingUTM.utm_source ?? platformFromReferrer ?? "openlink",
    utm_medium: incomingUTM.utm_medium ?? "social",
    utm_campaign: incomingUTM.utm_campaign ?? "openlink",
    ...incomingUTM,
  };

  cachedContext = {
    utm,
    sourcePlatform: platformFromReferrer ?? incomingUTM.utm_source,
    referrerHost,
  };

  return cachedContext;
}

export function buildTrackedUrl(
  baseUrl: string,
  context: TrackingContext | null,
  extra?: Record<string, string>,
): string {
  if (!context) return baseUrl;

  try {
    const url = new URL(baseUrl);
    const params = url.searchParams;

    Object.entries(context.utm).forEach(([key, value]) => {
      if (!value) return;
      if (!params.has(key)) {
        params.set(key, value);
      }
    });

    if (extra) {
      Object.entries(extra).forEach(([key, value]) => {
        if (!value) return;
        params.set(key, value);
      });
    }

    url.search = params.toString();
    return url.toString();
  } catch {
    return baseUrl;
  }
}

