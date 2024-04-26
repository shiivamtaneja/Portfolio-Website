'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { delays } from '@/lib/constants';
import calculateDateOfBirth from '@/utils/calculateDateOfBirth';

const Description = () => {
  const [currLocalTime, setCurrLocalTime] = useState<string>();

  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrLocalTime(new Date().toLocaleString("en-US", {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const t1 = gsap.timeline();

    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        markers: false,
        start: '100px top',
        end: '100px',
        onEnter: () => gsap.to(descriptionRef.current, {
          opacity: 0,
          duration: 1.2
        }),
        onLeaveBack: () => gsap.to(descriptionRef.current, {
          opacity: 1,
          duration: 1.2
        }),
      },
    });

    t1.from('.text-stagger', {
      opacity: 0,
      y: 110,
      delay: delays['hero-description'],
      // duration: 0.2,
      // stagger: {
      //   each: 0.03
      // }
    });
  }, { scope: descriptionRef });

  return (
    <div className='flex flex-col items-center justify-center h-full md:gap-0 gap-4' ref={descriptionRef}>
      <div className='flex lg:hidden'>
        <Image
          src={'/assets/my_side_profile.jpg'}
          width={150}
          height={0}
          className='rounded-md text-stagger '
          alt='Headshot of Shivam wearing a grey jacket.'
        />
      </div>
      <h1 className='sr-only'>shivam taneja</h1>
      <h1 aria-hidden className='uppercase flex flex-col whitespace-nowrap text-dark-200 font-semibold text-title relative leading-tight items-center overflow-hidden'>
        <span className='text-stagger heading-underline'>Shivam Taneja</span>
      </h1>

      <div className='flex flex-row w-full justify-center text-mid-400 text-heading-1 font-semibold normal-case lg:h-96 gap-24 '>
        <div className='hidden lg:flex h-full'>
          <Image
            src={'/assets/my_side_profile.jpg'}
            width={200}
            height={0}
            className='rounded-md text-stagger '
            alt='Headshot of Shivam wearing a grey jacket.'
          />
        </div>
        <div className='lg:w-1/3 w-full flex flex-col gap-4 justify-around text-justify'>
          <h2 className='sr-only'>A {calculateDateOfBirth('2002-05-31')}-year-old B-Tech College student who loves experimenting with cutting-edge technologies. Currently working as a Software Developer Inter and a full stack developer.</h2>
          <h2 aria-hidden >
            <span className='text-stagger ' aria-hidden>A {calculateDateOfBirth('2002-05-31')}-year-old B-Tech College student who loves experimenting with cutting-edge technologies. Currently working as a Software Developer Intern and a freelance Full Stack developer.</span>
          </h2>

          <div className='flex flex-row gap-3 text-stagger'>
            <p className='font-bold'>Local Time:</p>
            <p>{currLocalTime} New Delhi, IN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;