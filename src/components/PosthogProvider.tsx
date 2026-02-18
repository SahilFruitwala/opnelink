"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { initPosthog, posthog } from "../lib/posthogClient";
import { getTrackingContext } from "../lib/tracking";

type Props = {
  children: ReactNode;
};

export default function PosthogProvider({ children }: Props) {
  useEffect(() => {
    initPosthog();
    const context = getTrackingContext();
    posthog.capture("$pageview", {
      ...context?.utm,
      app: context?.app,
      sourcePlatform: context?.sourcePlatform ?? undefined,
      referrerHost: context?.referrerHost ?? undefined,
    });
  }, []);

  return <>{children}</>;
}

