"use client";

import Link from 'next/link';
import { useEffect, useRef } from "react";

import { delays, socialIcons } from '@/lib/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Logo from "./Logo";

const Navbar = () => {
  const headerRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from(headerRef.current, {
      opacity: 1,
      y: -100,
      delay: delays['pre-loader'],
      duration: 0.75
    });
  });

  return (
    <header className='flex w-full px-5 py-3 max-w-screen-xl mx-auto justify-between' ref={headerRef}>
      <Link
        href=''
        className="flex items-center justify-center gap-12"
      >
        <Logo />
      </Link>
      <div>
        {socialIcons.map((socials, index) => (
          <SocialIcon
            style={{
              width: 80,
              height: 80
            }}
            url={socials.link}
            fgColor='gray'
            bgColor='transparent'
            target='_blank'
            key={index}
          />
        ))}
      </div>
    </header>
  );
};

export default Navbar;