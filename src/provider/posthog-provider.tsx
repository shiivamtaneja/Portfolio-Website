"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

let posthogInitialized = false;

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    const search = searchParams.toString();
    const url = `${window.location.origin}${pathname}${search ? `?${search}` : ""}`;

    posthog.capture("$pageview", {
      $current_url: url,
    });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || posthogInitialized) return;

    posthogInitialized = true;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: true,
      person_profiles: "identified_only",

      opt_out_capturing_by_default: true,

      disable_session_recording: true,
      capture_heatmaps: false,
      enable_heatmaps: false,
      capture_dead_clicks: false,
      capture_performance: false,
      disable_surveys: true,

      loaded: (posthogClient) => {
        if (process.env.NODE_ENV === "development") posthogClient.debug();
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
