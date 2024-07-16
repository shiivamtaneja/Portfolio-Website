"use client";

import { useEffect, useRef } from 'react';

import { ReactLenis } from '@studio-freight/react-lenis';

import useLoadingStore from '@/store/loadingStore';
import { usePathname } from 'next/navigation';

const SmoothScroll = ({
  children
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}) => {
  const countRef = useRef(0);
  const pathname = usePathname();
  const { setIsFirstLoad, isFirstLoad } = useLoadingStore();

  useEffect(() => {
    if (countRef.current > 1 && isFirstLoad) {
      setIsFirstLoad(false);
    } else {
      countRef.current += 1;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;