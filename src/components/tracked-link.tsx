"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import {
  captureEvent,
  type AnalyticsEvent,
} from "@/lib/analytics";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    analyticsEvent?: AnalyticsEvent;
    analyticsProperties?: Record<string, string | number | boolean | null>;
    children: ReactNode;
  };

export default function TrackedLink({
  analyticsEvent,
  analyticsProperties,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        if (analyticsEvent) {
          captureEvent(analyticsEvent, analyticsProperties);
        }

        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
