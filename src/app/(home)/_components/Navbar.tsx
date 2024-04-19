"use client";

import Link from 'next/link';
import { useRef, useState } from "react";

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { delays } from '@/lib/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

import Logo from "./Logo";
import NavContent from './NavContent';

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
        <Link
          href={'/#about'}
          scroll={false}
          className='inline-block transition-transform duration-700 group-hover:translate-x-6'
        >
          click
        </Link>
        <Drawer direction='right'>
          <DrawerTrigger
            className='rounded-full flex h-16 w-16 flex-col items-center justify-center bg-accent-300 relative transition-all duration-100 ease-in-out hover:scale-90 scale-100'
            onClick={() => setNavOpen(true)}
          >
            <span className="absolute h-[2px] w-7 rounded-full bg-dark 2xl:w-9 -translate-y-1" />
            <span className="absolute h-[2px] w-7 rounded-full bg-dark 2xl:w-9 translate-y-1" />
          </DrawerTrigger>
          <DrawerContent>
            <NavContent
              navOpen={navOpen}
            />
          </DrawerContent>
        </Drawer>
      </nav>
    </header>
  );
};

export default Navbar;