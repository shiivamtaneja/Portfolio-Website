import React from "react";
import Link from "next/link";

import { experiences } from "@/lib/constants/experience";
import { CircleDot } from "lucide-react";
import { calculateTotalExperience } from "@/lib/utils";

const ExperienceSection = () => {
  const totalExp = calculateTotalExperience(experiences);

  return (
    <section aria-labelledby="experience-heading">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <h2
            className="text-xl font-bold dark:text-white text-zinc-900"
            id="experience-heading"
          >
            Experience
          </h2>
          <Link
            href={"/experience"}
            className="underline p-0 text-sm dark:text-white text-zinc-900"
            aria-label="View more experience"
          >
            View More
          </Link>
          <span className="text-sm dark:text-neutral-400 text-neutral-500">
            ({totalExp})
          </span>
        </div>

        <div className="relative pl-4 after:absolute after:inset-y-0 after:w-px dark:after:bg-white/20 after:bg-zinc-400/40 after:left-0">
          <ul className="flex flex-col gap-4 list-disc ml-4">
            {experiences.slice(0, 2).map((item, idx) => (
              <li
                className="dark:text-neutral-400 text-neutral-600 flex w-full gap-4 items-start justify-between relative"
                key={idx}
              >
                <div className="absolute -left-[21px] top-1">
                  <CircleDot
                    className="h-4 w-4 dark:text-white text-zinc-900"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex gap flex-col">
                    <p className="dark:text-white text-zinc-900">
                      {item.title}
                    </p>
                    <p>
                      {item.companyName} | {item.workLocation}
                    </p>
                  </div>

                  <p className="dark:text-neutral-400 text-neutral-600 break-words">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <p className="flex gap-1 md:flex-row flex-col">
                    <time dateTime={item.startISO}>{item.start}</time>
                    {" - "}
                    {item.end ? (
                      <time dateTime={item.endISO}>{item.end}</time>
                    ) : (
                      "Present"
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
