'use client';

import { delays } from '@/lib/constants';
import { singleDay } from '@/utils/fonts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

const Description = () => {
  const descriptionRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

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
    <div className="z-10 uppercase h-1/2 mt-20" >
      <div className='' ref={descriptionRef}>
        <div className='flex flex-col items-center gap-y-3 '>
          <h1 className='sr-only'>Hi there, i'm shivam taneja</h1>
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
  )
}

export default Description