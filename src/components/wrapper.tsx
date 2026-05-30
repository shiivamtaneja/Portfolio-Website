"use client";

import { useRef } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { delays } from "@/lib/constants/delays";
import { analyticsEvents, captureEvent } from "@/lib/analytics";

import ChatbotHighlightProvider from "@/provider/chatbot-highlight";

import { useIsFirstLoad } from "@/store/loading-store";

import Nav from "./nav";

import { ArrowLeft } from "lucide-react";
import { TooltipProvider } from "./ui/tooltip";

const ChatBot = dynamic(() => import("./chat-bot"), {
  ssr: false,
  loading: () => null,
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useIsFirstLoad();

  useGSAP(
    () => {
      const t1 = gsap.timeline();

      t1.from(wrapperRef.current, {
        opacity: 0,
        y: 110,
        delay: isFirstLoad
          ? delays["pre-loader-first-load"]
          : delays["pre-loader"],
      });
    },
    { scope: wrapperRef },
  );

  return (
    <TooltipProvider>
      <ChatbotHighlightProvider>
        <Link
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-md focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white dark:focus:bg-white dark:focus:text-zinc-900"
        >
          Skip to main content
        </Link>

        <main
          id="main-content"
          ref={wrapperRef}
          tabIndex={-1}
          className="mx-auto max-w-3xl pt-6 pb-12 flex flex-col gap-6 px-4 dark:text-white text-zinc-900"
        >
          <Nav />

          {pathname !== "/" && (
            <Link
              href="/"
              className="inline-flex items-center gap-2 dark:text-muted-foreground text-neutral-600 dark:hover:text-white hover:text-zinc-900 transition-colors"
              onClick={() => captureEvent(analyticsEvents.backToHomeClicked)}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
          )}

          {children}
        </main>

        <ChatBot />
      </ChatbotHighlightProvider>
    </TooltipProvider>
  );
};

export default Wrapper;
