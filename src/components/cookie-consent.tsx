"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  COOKIE_MESSAGES,
  getRandomMessage,
} from "@/lib/constants/cookie-messages";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState<string>(COOKIE_MESSAGES.DEFAULT[0]);
  const posthog = usePostHog();
  const acceptRef = useRef<HTMLButtonElement>(null);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    posthog?.opt_in_capturing();
    setShowBanner(false);
  };

  const declineCookies = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    posthog?.opt_out_capturing();
    setShowBanner(false);
  }, [posthog]);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) return;

    setShowBanner(true);

    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => setMessage(getRandomMessage(data.country)))
      .catch(() => setMessage(getRandomMessage(null)));
  }, [posthog]);

  useEffect(() => {
    if (showBanner) acceptRef.current?.focus();
  }, [showBanner]);

  useEffect(() => {
    if (!showBanner) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") declineCookies();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [showBanner, declineCookies]);

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:bottom-6 md:left-6 md:right-auto md:max-w-md animate-in slide-in-from-bottom-full fade-in duration-700 ease-out"
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,_0,_0,_0.1)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] transition-all">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10"
            aria-hidden="true"
          >
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <h3
            id="cookie-consent-title"
            className="font-semibold tracking-tight text-foreground"
          >
            Cookie Preferences
          </h3>
        </div>
        <p
          id="cookie-consent-desc"
          className="text-sm text-muted-foreground leading-relaxed"
        >
          {message}
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Button
            ref={acceptRef}
            onClick={acceptCookies}
            aria-label="Accept cookies and enable analytics tracking"
            className="w-full sm:flex-1 font-medium transition-all hover:scale-[1.02] active:scale-95"
            size="sm"
          >
            Accept
          </Button>
          <Button
            onClick={declineCookies}
            variant="outline"
            aria-label="Decline cookies and disable analytics tracking"
            className="w-full sm:flex-1 font-medium transition-all hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 hover:scale-[1.02] active:scale-95"
            size="sm"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
