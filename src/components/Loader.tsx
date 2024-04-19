'use client';

import { useGSAP, } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      // document.body.classList.add('overflow-hidden');
    }

    const t1 = gsap.timeline({
      onComplete: () => {
        // window.scroll({
        //   left: 0,
        //   top: 0,
        //   behavior: 'smooth'
        // })
        containerRef.current?.remove()
        // document.body.classList.remove('overflow-hidden');
      }
    });

    t1.from('.text-reveal', {
      opacity: 0,
      y: 100,
      stagger: {
        each: 0.05,
      },
      autoAlpha: 0,
      duration: 1.05,
    }).to(containerRef.current, {
      y: '-100vh',
      duration: 0.75,
      delay: 0.5
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className='fixed top-0 left-0 bg-darkest flex h-svh w-screen items-center justify-center text-special font-bold leading-[115%] text-accent-300 z-[999999]'>
      <div className="z-50 flex flex-col items-center">
        <span className="overflow-hidden">
          <span className="flex text-reveal invisible">Shivam Taneja</span>
        </span>
        <span className="text-accent-500 overflow-hidden">
          {/* <span className="flex text-reveal text-works-title invisible">© {new Date().getFullYear()}</span> */}
          <span className="flex text-reveal text-works-title invisible">{`<Upcoming Engineer />`}</span>
        </span>
      </div>
    </section>
  );
};

export default Loader;