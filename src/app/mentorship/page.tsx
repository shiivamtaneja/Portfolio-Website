import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { defaultMetadata } from "@/lib/constants/metadata";
import { mentorships } from "@/lib/constants/mentorship";
import { appendUTM } from "@/lib/utils";

import Wrapper from "@/components/wrapper";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Mentorship & Judging | Shivam Taneja - Full Stack Developer",
  description:
    "Explore my contributions as a mentor and judge in various hackathons and tech events.",
  alternates: {
    canonical: "https://www.shivamtaneja.com/mentorship",
  },
  openGraph: {
    title: "Mentorship & Judging | Shivam Taneja - Full Stack Developer",
    description:
      "Explore my contributions as a mentor and judge in various hackathons and tech events.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Mentorship & Judging | Shivam Taneja",
    description:
      "Explore my contributions as a mentor and judge in various hackathons and tech events.",
    ...defaultMetadata.twitter,
  },
};

const MentorshipPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Mentorship & Judging by Shivam Taneja",
    url: "https://www.shivamtaneja.com/mentorship",
    description:
      "A collection of hackathons and tech events where Shivam Taneja has served as a mentor or judge.",
    about: {
      "@id": "https://www.shivamtaneja.com/#person",
    },
  };

  return (
    <>
      <Script
        id="mentorship-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Wrapper>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Mentorship & Judging</h1>
            <p className="dark:text-neutral-400 text-neutral-600">
              Sharing knowledge and supporting the developer community through
              hackathons and tech events.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {mentorships.map((item, idx) => (
              <li
                className="dark:text-neutral-400 text-neutral-600 flex w-full gap-4 items-start justify-between"
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
                        href={appendUTM(item.link)}
                        className="dark:text-white text-zinc-900 underline capitalize dark:hover:text-neutral-300 hover:text-zinc-600 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Tooltip delayDuration={50}>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1">
                              {item.title}
                              <ExternalLink
                                className="inline-block ml-1 w-3 h-3"
                                aria-hidden="true"
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View LinkedIn Post</p>
                          </TooltipContent>
                        </Tooltip>
                      </Link>

                      <span className="text-sm dark:text-neutral-400 text-neutral-500 hidden sm:inline-block">
                        |
                      </span>
                      <span className="text-sm dark:text-neutral-400 text-neutral-500 capitalize">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </>
  );
};

export default MentorshipPage;
