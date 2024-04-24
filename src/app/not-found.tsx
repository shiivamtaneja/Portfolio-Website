'use client';

import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NotFoundPage = () => {
  const notFoundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.from('.text-stagger', {
      opacity: 0,
      y: 50,
      stagger: {
        each: 0.02
      },
      duration: 0.2
    });
  }, { scope: notFoundRef });

  return (
    <>
      <main>
        <section id="hero" className="relative h-svh w-full flex flex-col items-center justify-center gap-4" ref={notFoundRef}>
          <div>
            <h1 className='sr-only'>Seems like you got lost :&#40;</h1>
            <h1 aria-hidden className='flex flex-col whitespace-nowrap text-dark font-semibold text-heading-2 leading-tight items-center uppercase'>
              <span className='flex' aria-hidden>
                <span className='flex' aria-hidden>
                  {"Seems like".split('').map((word, index) => (
                    word === ' ' ? <span className='text-stagger px-3' key={index}></span> : <span className='text-stagger' key={index}>{word}</span>
                  ))}
                </span>
              </span>
              <span className='flex' aria-hidden>
                <span className='flex' aria-hidden>
                  {"You got lost :(".split('').map((word, index) => (
                    word === ' ' ? <span className='text-stagger px-3' key={index}></span> : <span className='text-stagger' key={index}>{word}</span>
                  ))}
                </span>
              </span>
            </h1>
          </div>
          <div className="font-medium text-works-title">
            <p className="">
              404 Error. The page you&apos;re looking for does not exist.</p>
          </div>
          {/* TODO: */}
        </section>
      </main>
    </>
  );
};

export default NotFoundPage;