import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

import { defaultMetadata } from '@/lib/constants/metadata';
import { sideProjects } from '@/lib/constants/side-projects';

import ChatBotProject from '@/components/home/chat-bot-project';
import Wrapper from '@/components/wrapper';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, Info } from 'lucide-react';
import { GoDotFill } from "react-icons/go";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Projects | Shivam Taneja - Full Stack Developer",
  description: "Explore all projects by Shivam Taneja including web applications, AI tools, and open source contributions.",
  openGraph: {
    title: "Projects | Shivam Taneja - Full Stack Developer",
    description: "Explore all projects by Shivam Taneja including web applications, AI tools, and open source contributions.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Projects | Shivam Taneja",
    description: "Explore all projects by Shivam Taneja including web applications, AI tools, and open source contributions.",
    ...defaultMetadata.twitter
  },
};

const ProjectsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects by Shivam Taneja",
    "url": "https://www.shivamtaneja.com/projects",
    "description":
      "A collection of projects built by Shivam Taneja including web applications, AI tools, and open source work.",
    "about": {
      "@id": "https://www.shivamtaneja.com/#person"
    }
  };

  return (
    <>
      <Script
        id="projects-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Wrapper>
        <div className='flex flex-col gap-6'>
          <div className="flex flex-col gap-2">
            <h1 className='text-3xl font-bold'>All Projects</h1>
            <p className='text-neutral-400'>
              A collection of projects I&apos;ve built, ranging from AI-powered tools to collaborative platforms.
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            <ChatBotProject />

            {sideProjects.map((item, idx) => (
              <li className='text-neutral-500 flex w-full gap-4 items-start justify-between' key={idx}>
                <div className='flex flex-col gap-2 flex-1'>
                  <div className='flex gap-2 items-center flex-wrap'>
                    <p className='text-white'>
                      {idx + 2}{"."}
                    </p>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.projLink}
                        className='text-white underline capitalize hover:text-neutral-300 transition-colors'
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
                            <p className='p-2 bg-gray-500 text-white rounded'>View project</p>
                          </TooltipContent>
                        </Tooltip>
                      </Link>

                      <Link
                        href={item.descLink}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        <Tooltip delayDuration={50}>
                          <TooltipTrigger asChild>
                            <Info className="w-4 h-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className='p-2 bg-gray-500 text-white rounded'>View project details</p>
                          </TooltipContent>
                        </Tooltip>
                      </Link>
                    </div>
                  </div>
                  <p className='text-neutral-400 break-words ml-4'>
                    {item.desc}
                  </p>
                </div>

                <div className='flex gap-2 items-center shrink-0'>
                  {item.userCount &&
                    <p>{item.userCount}</p>
                  }

                  {item.activelyWorking && (
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger asChild>
                        <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className='p-2 bg-gray-500 text-white rounded'>Actively working on it</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Wrapper>
    </>
  )
}

export default ProjectsPage