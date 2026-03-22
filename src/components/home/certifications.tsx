import React from "react";

import Link from "next/link";

import { certifications } from "@/lib/constants/certifications";

import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const CertificationsSection = () => {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h2 className="text-xl font-bold dark:text-white text-zinc-900">
            Certifications
          </h2>
          <Link
            href={"/certificates"}
            className="underline p-0 text-sm dark:text-white text-zinc-900"
          >
            View More
          </Link>
        </div>

        <ul className="flex flex-col gap-4">
          {certifications.slice(0, 3).map((item, idx) => (
            <li
              className="dark:text-neutral-500 text-neutral-600 flex w-full gap-4 items-start justify-between"
              key={idx}
            >
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2 items-center flex-wrap">
                  <p className="dark:text-white text-zinc-900">
                    {idx + 1}
                    {"."}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={item.link}
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
                          <p>View certification</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                    <span className="text-sm dark:text-neutral-400 text-neutral-500 hidden sm:inline-block">
                      |
                    </span>
                    <span className="text-sm dark:text-neutral-400 text-neutral-500">
                      {item.company}
                    </span>
                    <span className="sr-only">
                      {item.description} Skills: {item.skills?.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CertificationsSection;
