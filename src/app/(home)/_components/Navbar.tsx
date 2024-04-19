"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from "react";

import { delays } from '@/lib/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

import { Variants, motion, useAnimationControls } from 'framer-motion';
import Logo from "./Logo";
import NavContent from './NavContent';

const navVariants: Variants = {
  close: {
    width: 0,
    opacity: 0,
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5
    }
  },
  open: {
    width: 'inherit',
    opacity: 1,
    transition: {
      // type: 'spring',
      // damping: 10,
      duration: 0.4
    }
  }
};

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const headerRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(headerRef.current, {
      opacity: 1,
      y: -100,
      delay: delays['pre-loader'],
      duration: 0.75
    });
  }, { scope: headerRef });

  const navControls = useAnimationControls();

  useEffect(() => {
    if (navOpen) {
      navControls.start('open');
    } else {
      navControls.start('close');
    }
  }, [navOpen]);

  return (
    <header className='fixed top-0 z-[15] w-full' ref={headerRef}>
      <nav className='flex justify-between px-4 items-center py-3 max-w-screen-2xl mx-auto'>
        <Link
          href={'/'}
          className=''
          aria-label='Back to home'
        >
          <Logo />
        </Link>

        <button
          className='rounded-full flex h-16 w-16 flex-col items-center justify-center bg-accent-300 relative transition-all duration-100 ease-in-out hover:scale-90 scale-100'
          onClick={() => setNavOpen(true)}
        >
          <span className="absolute h-[2px] w-7 rounded-full bg-dark 2xl:w-9 -translate-y-1" />
          <span className="absolute h-[2px] w-7 rounded-full bg-dark 2xl:w-9 translate-y-1" />
        </button>
        {navOpen &&
          <>
            <div className='absolute inset-0 z-50 bg-black/60 h-screen w-screen'></div>
            <div
              className='fixed z-50 h-screen flex w-screen top-0 right-0 pointer-events-none'
            >
            <motion.div
              variants={navVariants}
              initial="close"
              animate={navControls}
              className='flex top-0 right-0 fixed h-screen pointer-events-auto max-w-screen-xs p-3'
            >
              <NavContent
                navOpen={navOpen}
                setNavOpen={setNavOpen}
              />
            </motion.div>
            </div>
          </>
        }
      </nav>
    </header>
  );
};

export default Navbar;