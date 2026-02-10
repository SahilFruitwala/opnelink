"use client";

import { ReactNode, useEffect } from "react";
import { initPosthog, posthog } from "../lib/posthogClient";
import { getTrackingContext } from "../lib/tracking";

type Props = {
  children: ReactNode;
};

export function PosthogProvider({ children }: Props) {
  useEffect(() => {
    initPosthog();
    const context = getTrackingContext();
    if (context) {
      posthog.capture("$pageview", {
        ...context.utm,
        sourcePlatform: context.sourcePlatform,
        referrerHost: context.referrerHost,
      });
    }
  }, []);

  return <>{children}</>;
}

