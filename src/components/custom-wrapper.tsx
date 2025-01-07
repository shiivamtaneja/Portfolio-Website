'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { delays } from '@/lib/constants';

import useLoadingStore from '@/store/loading-store';

import Nav from './nav';
import { TooltipProvider } from './ui/tooltip';

const CustomWrapper = ({
  children
}: {
  children: React.ReactNode
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isFirstLoad } = useLoadingStore();

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(wrapperRef.current, {
      opacity: 0,
      y: 110,
      delay: isFirstLoad ? delays['pre-loader-first-load'] : delays['pre-loader'],
    });
  }, { scope: wrapperRef });

  return (
    <TooltipProvider>
      <main ref={wrapperRef} className="mx-auto max-w-3xl py-12 flex flex-col gap-6 px-4 text-white">
        <Nav />

        {children}
      </main>
    </TooltipProvider>
  )
}

export default CustomWrapper