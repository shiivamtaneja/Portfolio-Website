"use client";

import { useEffect, useState } from "react";
import { usePostHog } from "posthog-js/react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const INDIA_MESSAGES = [
  "Would you like some Parle-G with your chai? ☕️ We use cookies for analytics.",
  "Accept our cookies? We promise they are as good as a fresh batch of Good Day! 🍪",
  "We use cookies to serve you better (and no, not the ones from the bakery down the street). 🍪",
];

const UK_MESSAGES = [
  "Would you like some biscuits with your tea? 🫖 We use them for analytics.",
  "We use biscuits to track your experience on this site! 🍪",
  "Accept our biscuits for a better browsing experience! 🍪",
];

const DEFAULT_MESSAGES = [
  "We use cookies to improve your experience! 🍪",
  "Accept our cookies for a better site experience! 🍪",
  "We track some analytics using cookies. Is that okay? 🍪",
];

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [message, setMessage] = useState(DEFAULT_MESSAGES[0]);
  const posthog = usePostHog();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent) {
      return;
    }

    setShowBanner(true);

    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        let options = DEFAULT_MESSAGES;
        if (data.country === "IN") {
          options = INDIA_MESSAGES;
        } else if (data.country === "GB" || data.country === "UK") {
          options = UK_MESSAGES;
        }

        const randomMsg = options[Math.floor(Math.random() * options.length)];
        setMessage(randomMsg);
      })
      .catch(() => {
        const randomMsg =
          DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)];
        setMessage(randomMsg);
      });
  }, [posthog]);

  if (!showBanner) return null;

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    posthog?.opt_in_capturing();
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    posthog?.opt_out_capturing();
    setShowBanner(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:bottom-6 md:left-6 md:right-auto md:max-w-md animate-in slide-in-from-bottom-full fade-in duration-700 ease-out">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-6 shadow-[0_20px_50px_rgba(0,_0,_0,_0.1)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] transition-all">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold tracking-tight text-foreground">
            Cookie Preferences
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {message}
        </p>
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={acceptCookies}
            className="w-full sm:flex-1 font-medium transition-all hover:scale-[1.02] active:scale-95"
            size="sm"
          >
            Accept
          </Button>
          <Button
            onClick={declineCookies}
            variant="outline"
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
