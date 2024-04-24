"use client";

import { useEffect } from 'react';

import { ReactLenis } from '@studio-freight/react-lenis';

const SmoothScroll = ({
  children
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;