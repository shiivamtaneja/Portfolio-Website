"use client";

import posthog from "posthog-js";

import { analyticsEvents, type AnalyticsEvent } from "./analytics-events";

export { analyticsEvents };
export type { AnalyticsEvent } from "./analytics-events";

type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>;

export function captureEvent(
  event: AnalyticsEvent,
  properties: AnalyticsProperties = {},
) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  posthog.capture(event, {
    path: window.location.pathname,
    ...properties,
  });
}
