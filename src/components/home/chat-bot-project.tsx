"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { useChatbotHighlight } from "@/provider/chatbot-highlight";
import { analyticsEvents, captureEvent } from "@/lib/analytics";

import { ExternalLink, Info } from "lucide-react";
// import { GoDotFill } from 'react-icons/go';
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ChatBotProject = () => {
  const { highlight } = useChatbotHighlight();
  const [userCount, setUserCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUserCount = async () => {
      const response = await fetch("/api/chat/count");

      if (!response.ok) throw new Error("Error fetching user count");

      const data = (await response.json()) as { count: number };
      if (!cancelled) setUserCount(data.count);
    };

    const scheduleFetch = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          fetchUserCount().catch(() => {
            if (!cancelled) setUserCount(null);
          });
        });
        return;
      }

      globalThis.setTimeout(() => {
        fetchUserCount().catch(() => {
          if (!cancelled) setUserCount(null);
        });
      }, 1);
    };

    scheduleFetch();
    window.addEventListener("chatbot-user-count-updated", fetchUserCount);

    return () => {
      cancelled = true;
      window.removeEventListener("chatbot-user-count-updated", fetchUserCount);
    };
  }, []);

  return (
    <li className="dark:text-neutral-400 text-neutral-600 flex w-full gap-4 items-start justify-between">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="dark:text-white text-zinc-900">1.</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="border-0 bg-transparent p-0 font-inherit dark:text-white text-zinc-900 underline capitalize dark:hover:text-neutral-300 hover:text-zinc-600 transition-colors cursor-pointer"
              onClick={() => {
                captureEvent(analyticsEvents.projectLiveOpened, {
                  project: "Chatbot",
                  source: "project_list",
                });
                highlight();
              }}
            >
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <div>
                    Chatbot
                    <ExternalLink
                      className="inline-block ml-1 w-3 h-3"
                      aria-hidden="true"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View project</p>
                </TooltipContent>
              </Tooltip>
            </button>

            <Link
              href={"/projects/chat-bot"}
              className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-zinc-900 transition-colors"
              aria-label="View details for Chatbot"
              onClick={() =>
                captureEvent(analyticsEvents.projectDetailOpened, {
                  project: "Chatbot",
                  source: "project_list",
                })
              }
            >
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4" aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>View project details</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          </div>
        </div>
        <p className="dark:text-neutral-400 text-neutral-600 break-words ml-4">
          a site-embedded AI assistant trained on my portfolio content.
        </p>
      </div>

      {userCount !== null && (
        <div className="flex gap-2 items-center shrink-0">
          <p>{userCount} users</p>

          {/* <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Actively working on it</p>
            </TooltipContent>
          </Tooltip> */}
        </div>
      )}
    </li>
  );
};

export default ChatBotProject;
