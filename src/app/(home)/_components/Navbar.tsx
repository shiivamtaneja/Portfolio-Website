"use client";

import { useRef } from "react";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { delays, navLinks } from '@/lib/constants';
import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(headerRef.current, {
      opacity: 1,
      y: -100,
      delay: delays['pre-loader'],
      duration: 0.75,
    });
  }, { scope: headerRef });

  return (
    <header className='z-[15] w-full absolute' ref={headerRef}>
      <nav className='flex justify-between px-4 items-center py-3 max-w-screen-2xl mx-auto w-full'>
        <Link
          href={'/'}
          className=''
          aria-label='Back to home'
        >
          <Logo />
        </Link>

        <div className='gap-3 md:flex hidden flex-row'>
          {navLinks.map((data, index) => (
            data.showOnHeader &&
            <Link
              href={data.path}
              // target="_blank"
              // rel="noopener noreferrer"
              prefetch={false}
              key={index}
              className="font-semibold text-lg links relative overflow-hidden"
            >
              {data.name}
            </Link>
          ))}
        </div>
      </nav>
    </header >
  );
};

export default Navbar;