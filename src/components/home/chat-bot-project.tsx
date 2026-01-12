'use client';

import React from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { useChatbotHighlight } from '@/provider/chatbot-highlight';

import { ExternalLink, Info } from 'lucide-react';
// import { GoDotFill } from 'react-icons/go';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const ChatBotProject = () => {
  const { highlight } = useChatbotHighlight();

  const { data, error } = useQuery<{ count: number }>({
    queryKey: ['chatBotUserCtn'],
    queryFn: async () => {
      const response = await fetch('/api/chat/count')

      if (!response.ok)
        throw new Error('Error fetching user count')

      return response.json()
    },
    retry: false,
    refetchOnWindowFocus: false
  })

  return (
    <li className='dark:text-neutral-500 text-neutral-600 flex w-full gap-4 items-start justify-between'>
      <div className='flex flex-col gap-2 flex-1'>
        <div className='flex gap-2 items-center flex-wrap'>
          <p className='dark:text-white text-zinc-900'>
            1.
          </p>
          <div className="flex items-center gap-2">
            <div
              className='dark:text-white text-zinc-900 underline capitalize dark:hover:text-neutral-300 hover:text-zinc-600 transition-colors cursor-pointer'
              onClick={() => highlight()}
            >
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <div>
                    Chatbot
                    <ExternalLink className="inline-block ml-1 w-3 h-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View project</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Link
              href={'/projects/chat-bot'}
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
        <p className='dark:text-neutral-400 text-neutral-600 break-words ml-4'>
          a site-embedded AI assistant trained on my portfolio content.
        </p>
      </div>

      {!error && data &&
        <div className='flex gap-2 items-center shrink-0'>
          <p>{data.count} users</p>

          {/* <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
              <GoDotFill size={15} className='hover:scale-110 scale-100 transition duration-75 ease-in-out text-green-500' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Actively working on it</p>
            </TooltipContent>
          </Tooltip> */}
        </div>
      }
    </li>
  )
}

export default ChatBotProject