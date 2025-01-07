"use client";

import { useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';

import useLoadingStore from '@/store/loading-store';

const SmoothScroll = ({
  children
}: {
  children: React.ReactNode
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    children
  );
};

export default SmoothScroll;