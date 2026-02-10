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
    posthog.capture("$pageview", {
      ...context?.utm,
      sourcePlatform: context?.sourcePlatform ?? undefined,
      referrerHost: context?.referrerHost ?? undefined,
    });
  }, []);

  return <>{children}</>;
}

