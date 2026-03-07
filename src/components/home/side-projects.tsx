import React from "react";

import Link from "next/link";

import { sideProjects } from "@/lib/constants/side-projects";

import ChatBotProject from "./chat-bot-project";

import { ExternalLink, Info } from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SideProjectsSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl font-bold dark:text-white text-zinc-900">
            Side Projects
          </h2>
          <Link
            href={"/projects"}
            className="underline p-0 text-sm dark:text-white text-zinc-900"
          >
            View More
          </Link>
        </div>

        <ul className="flex flex-col gap-4">
          <ChatBotProject />

          {sideProjects.slice(0, 4).map((item, idx) => (
            <li
              className="dark:text-neutral-500 text-neutral-600 flex w-full gap-4 items-start justify-between"
              key={idx}
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2 items-center flex-wrap">
                  <p className="dark:text-white text-zinc-900">
                    {idx + 2}
                    {"."}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.projLink}
                      className="dark:text-white text-zinc-900 underline capitalize dark:hover:text-neutral-300 hover:text-zinc-600 transition-colors"
                      target="_blank"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <div>
                            {item.title}
                            <ExternalLink className="inline-block ml-1 w-3 h-3" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View project</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>

                    <Link
                      href={item.descLink}
                      className="dark:text-neutral-400 text-neutral-600 dark:hover:text-white hover:text-zinc-900 transition-colors"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View project details</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
                <p className="dark:text-neutral-400 text-neutral-600 break-words ml-4">
                  {item.desc}
                </p>
              </div>

              <div className="flex gap-2 items-center shrink-0">
                {item.userCount && <p>{item.userCount}</p>}

                {item.activelyWorking && (
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <GoDotFill
                        size={15}
                        className="hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Actively working on it</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SideProjectsSection;
