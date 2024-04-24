'use client';

import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { delays } from '@/lib/constants';
import { singleDay } from '@/utils/fonts';

const Description = () => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const t1 = gsap.timeline();

    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        markers: false,
        start: 'top 200px',
        end: 'top',
        // toggleActions: 'play reset reset reset'
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
      y: 100,
      delay: delays['hero-description'],
      stagger: {
        each: 0.03
      }
    });
  }, { scope: descriptionRef });

  return (
    <div className="z-10 uppercase h-1/2 mt-20" ref={descriptionRef}>
      <div className=''>
        <div className='flex flex-col items-center gap-y-3 '>
          <h1 className='sr-only'>Hi there, i&apos;m shivam taneja</h1>
          <h1 aria-hidden className='flex flex-col whitespace-nowrap text-dark font-semibold text-title relative leading-tight items-center'>
            <span className='flex gap-4' aria-hidden>
              <span className='flex' aria-hidden>
                {"Hi".split('').map((word, index) => (
                  word === ' ' ? <span className='text-stagger' key={index}>&nspb;</span> : <span className='text-stagger' key={index}>{word}</span>
                ))}
              </span>
              <span className='flex' aria-hidden>
                {"There,".split('').map((word, index) => (
                  word === ' ' ? <span className='text-stagger' key={index}>&nspb;</span> : <span className='text-stagger' key={index}>{word}</span>
                ))}
              </span>
              <span className='flex' aria-hidden>
                {"I'm".split('').map((word, index) => (
                  word === ' ' ? <span className='text-stagger' key={index}>&nspb;</span> : <span className='text-stagger' key={index}>{word}</span>
                ))}
              </span>
            </span>
            <span className={`${'flex gap-6' + " " + singleDay.className}`} aria-hidden>
              <span className='flex' aria-hidden>
                {"Shivam".split('').map((word, index) => (
                  word === ' ' ? <span className='text-stagger' key={index}>&nspb;</span> : <span className='text-stagger' key={index}>{word}</span>
                ))}
              </span>
              <span className='flex' aria-hidden>
                {"Taneja.".split('').map((word, index) => (
                  word === ' ' ? <span className='text-stagger' key={index}>&nspb;</span> : <span className='text-stagger' key={index}>{word}</span>
                ))}
              </span>
            </span>
          </h1>

          <h2>

          </h2>
        </div>
      </div>
    </div>
  );
};

export default Description;