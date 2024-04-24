'use client';

import React, { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { delays } from '@/lib/constants';

const HeroBg = () => {
  const svgRef = useRef(null);

  useGSAP(() => {
    const t1 = gsap.timeline();

    t1.fromTo(svgRef.current, {
      opacity: 0,
      scale: 0,
    }, {
      opacity: 1,
      scale: 1,
      delay: delays['pre-loader'],
      duration: 0.75
    });
  });

  return (
    <svg ref={svgRef} width="1186" height="1186" viewBox="0 0 1186 1186" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute top-[30%] z-0 w-5/6 sm:w-3/5 lg:w-2/5 h-1/2"><circle cx="593" cy="593" r="593" fill="url(#paint0_linear_4949_267)"></circle><defs><linearGradient id="paint0_linear_4949_267" x1="593" y1="0" x2="593" y2="1186" gradientUnits="userSpaceOnUse"><stop stopColor="#DDDDD5"></stop><stop offset="1" stopColor="#DDDDD5" stopOpacity="0"></stop></linearGradient></defs></svg>
  );
};

export default HeroBg;