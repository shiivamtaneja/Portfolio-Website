'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

import { delays } from '@/lib/constants/delays';
import ChatbotHighlightProvider from '@/provider/chatbot-highlight';
import { useIsFirstLoad } from '@/store/loading-store';
import { TooltipProvider } from '../ui/tooltip';

import ChatBot from '../chat-bot';
import Nav from '../nav';
import FoldingLayout from './folding-layout';

const WrapperV2 = ({
  children
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useIsFirstLoad();

  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.from(contentRef.current, {
      opacity: 0,
      y: 110,
      delay: isFirstLoad ? delays['pre-loader-first-load'] : delays['pre-loader'],
    });
  }, { scope: contentRef });

  const MainContent = (
    <main
      ref={contentRef}
      className="mx-auto max-w-3xl pt-6 pb-12 flex flex-col gap-6 px-4 dark:text-white text-zinc-900"
    >
      <Nav />
      {pathname !== '/' && (
        <Link href="/" className="inline-flex items-center gap-2 dark:text-muted-foreground text-neutral-600 dark:hover:text-white hover:text-zinc-900 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      )}
      {children}
    </main>
  );

  return (
    <TooltipProvider>
      <ChatbotHighlightProvider>
        {pathname === '/' ? (
          <FoldingLayout>
            {MainContent}
          </FoldingLayout>
        ) : (
          MainContent
        )}

        <ChatBot />
      </ChatbotHighlightProvider>
    </TooltipProvider>
  )
}

export default WrapperV2;
