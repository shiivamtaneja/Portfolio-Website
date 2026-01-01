'use client';

import { useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { useLenis } from '@studio-freight/react-lenis';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import NavContent from './NavContent';

const navVariants: Variants = {
  close: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  },
  open: {
    width: 'inherit',
    opacity: 1,
    transition: {
      duration: 0.4
    }
  }
};
const Hamburger = () => {
  const [navOpen, setNavOpen] = useState(false);

  const hamburgerRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const lenis = useLenis();

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(hamburgerButtonRef.current, {
      scrollTrigger: {
        trigger: hamburgerButtonRef.current,
        markers: false,
        start: '20px top',
        end: '20px',
        onEnter: () => {
          hamburgerButtonRef.current!.classList.add('scale-100');
          hamburgerButtonRef.current!.classList.remove('scale-0');
        },
        onLeaveBack: () => {
          hamburgerButtonRef.current!.classList.add('scale-0');
          hamburgerButtonRef.current!.classList.remove('scale-100');
        },
      },
    });

  }, { scope: hamburgerRef });

  useEffect(() => {
    const button = hamburgerButtonRef.current;

    if (button) {
      if (navOpen) {
        button.classList.add("!scale-100");
        document.body.classList.add('overflow-hidden');
        lenis?.stop();
      } else {
        document.body.classList.remove('overflow-hidden');
        lenis?.start();
        button.classList.remove("!scale-100");
      }
    }
  }, [navOpen]);

  return (
    <>
      <div className='flex justify-start items-center max-w-screen-3xl mx-auto' ref={hamburgerRef}>
        <button
          className={`rounded-full flex h-16 w-16 flex-col items-center justify-center bg-accent-300 fixed transition-all duration-300 ease-in-out hover:scale-90 z-[999] top-6 ml-6 scale-0`}
          onClick={() => setNavOpen(!navOpen)}
          ref={hamburgerButtonRef}
        >
          <span
            className={`${navOpen ? "translate-y-0 rotate-45" : "-translate-y-1 rotate-0"} absolute h-[2px] w-7 rounded-full bg-dark-200 2xl:w-9 transition-all duration-300 ease-in-out`}
          />
          <span
            className={`${navOpen ? "translate-y-0 -rotate-45" : "translate-y-1 rotate-0"} absolute h-[2px] w-7 rounded-full bg-dark-200 2xl:w-9 transition-all duration-300 ease-in-out`}
          />
        </button>
      </div>
      <AnimatePresence mode='wait'>
        {navOpen &&
          <>
            <div
              className='fixed inset-0 z-50 bg-black/60 h-svh w-screen cursor-pointer'
              onClick={() => setNavOpen(false)}
            />
            <div
              className='fixed z-50 h-svh flex w-full top-0 left-0 pointer-events-none border border-black'
            >
              <motion.div
                variants={navVariants}
                initial="close"
                animate="open"
                exit="close"
                className='flex top-0 left-0 fixed h-svh pointer-events-auto max-w-screen-xs p-3'
              >
                <NavContent
                  navOpen={navOpen}
                  setNavOpen={setNavOpen}
                />
              </motion.div>
            </div>
          </>
        }
      </AnimatePresence>
    </>
  );
};

export default Hamburger;