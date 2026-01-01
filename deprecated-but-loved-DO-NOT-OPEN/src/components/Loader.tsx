'use client';

import React, { useRef } from 'react';

import { usePathname } from 'next/navigation';

import { useGSAP, } from '@gsap/react';
import gsap from 'gsap';

import { pathNames } from '@/lib/constants';

const Loader = ({ isFirstLoad }: { isFirstLoad: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    const t1 = gsap.timeline();

    if (!isFirstLoad) {
      t1.from(containerRef.current, {
        ease: 'power1.inOut',
        y: '100vh',
        borderTopLeftRadius: '100%',
        borderTopRightRadius: '100%',
        duration: 0.5,
      });
    }

    t1.from('.text-reveal', {
      y: isFirstLoad ? 100 : 50,
      duration: 0.3,
      autoAlpha: 0,
    }).to(containerRef.current, {
      ease: 'power1.inOut',
      y: '-100vh',
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%',
      delay: 0.5,
      duration: 0.5
    });

  }, { scope: containerRef, dependencies: [isFirstLoad] });

  return (
    <section ref={containerRef} className='fixed top-0 left-0 bg-dark-400 flex h-svh w-screen items-center justify-center text-special font-bold leading-[115%] text-accent-300 z-[999999]'>
      <div className="z-50 flex flex-col items-center">
        <span className={`${isFirstLoad ? "overflow-hidden" : ""}`}>
          <span className={`flex text-reveal ${isFirstLoad ? "invisible" : ''}`}>
            {pathNames[`${isFirstLoad}`][pathname]}
          </span>
        </span>

        {isFirstLoad && pathname === "/" &&
          <span className="text-accent-500 overflow-hidden">
            <span className="flex text-reveal text-body-1 invisible">{`<Software Engineer />`}</span>
          </span>
        }
      </div>
    </section>
  );
};

export default Loader;