"use client";

import { useEffect, useRef, useState } from 'react';

import { usePathname } from 'next/navigation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useIsFirstLoad, useSetFirstLoad } from '@/store/loading-store';
import { ThemeToggle } from './theme-toggle';

const SmoothScroll = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient());

  const { resolvedTheme } = useTheme()

  const countRef = useRef(0);
  const pathname = usePathname();

  const isFirstLoad = useIsFirstLoad();
  const setIsFirstLoad = useSetFirstLoad();

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
    <>
      <ToastContainer theme={resolvedTheme === "dark" ? "dark" : "light"} />

      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>

      <div className='right-4 hidden xl:block fixed xl:top-6 z-[999]'>
        <ThemeToggle />
      </div>
    </>
  );
};

export default SmoothScroll;