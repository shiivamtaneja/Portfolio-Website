'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { delays, pageInformations } from '@/lib/constants';

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
        start: '60% 50%',
        end: '80% 10%',
        scrub: true,
        onUpdate: (self) => {
          const { progress } = self;
          const opacity = 1 - (progress * 0.5);
          const y = progress * 100;
          const scale = 1 - (progress * 0.05);
          gsap.set(descriptionRef.current, { opacity, y, scale });
        },
      },
    });

    t1.from('.text-stagger', {
      opacity: 0,
      y: 110,
      delay: delays['hero-description'],
    });
  }, { scope: descriptionRef });

  return (
    <div className='flex flex-col md:gap-0 gap-4 items-center' ref={descriptionRef}>
      <div className='flex lg:hidden'>
        <Image
          src={'/assets/my_side_profile.jpg'}
          width={255}
          height={0}
          className='rounded-md text-stagger '
          alt='Headshot of Shivam wearing a white shirt with mountains in the background.'
        />
      </div>

      <h1 aria-hidden className='uppercase flex flex-col whitespace-nowrap text-dark-200 font-semibold text-title relative leading-tight items-center overflow-hidden'>
        <span className='text-stagger heading-underline'>Shivam Taneja</span>
      </h1>

      <div className='flex flex-row w-full justify-center text-mid-400 text-heading-1 font-semibold normal-case lg:h-96 gap-24'>
        <div className='hidden lg:flex'>
          <Image
            src={'/assets/me_mongo_db_event_12_sep_24.png'}
            width={255}
            height={0}
            className='rounded-md text-stagger aspect-[433/667]'
            alt='Shivam wearing a white patterned shirt and event lanyard standing in front of a MongoDB logo wall.'
          />
        </div>
        <div className='lg:w-1/3 w-full flex flex-col gap-4 justify-around md:text-left text-justify text-stagger px-4'>
          <h2 className='sr-only'>{pageInformations.homepageDescription}</h2>
          <h2 aria-hidden>{pageInformations.homepageDescription}</h2>

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