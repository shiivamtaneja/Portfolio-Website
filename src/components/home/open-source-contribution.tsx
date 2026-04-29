import React from "react";

import Image from "next/image";
import Link from "next/link";

import { openSourceContribution } from "@/lib/constants/open-source-contribution";

import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const OpenSourceContributionSection = () => {
  return (
    <section aria-labelledby="open-source-heading">
      <div className="flex flex-col gap-2">
        <h2
          className="text-xl font-bold dark:text-white text-zinc-900"
          id="open-source-heading"
        >
          Open Source Contribution
        </h2>

        <ul className="flex flex-col gap-4">
          {openSourceContribution.map((item, idx) => (
            <li
              className="dark:text-neutral-400 text-neutral-600 flex w-full gap-4 items-start justify-between"
              key={idx}
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2 items-center flex-wrap">
                  <p className="dark:text-white text-zinc-900">
                    <Image
                      src={item.logo}
                      width={15}
                      height={100}
                      alt={item.logoAlt}
                    />
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.link}
                      className="dark:text-white text-zinc-900 underline capitalize dark:hover:text-neutral-300 hover:text-zinc-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                          <div>
                            {item.title}
                            <ExternalLink
                              className="inline-block ml-1 w-3 h-3"
                              aria-hidden="true"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View contribution</p>
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
                <p>{item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OpenSourceContributionSection;
