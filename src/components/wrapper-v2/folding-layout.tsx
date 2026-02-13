'use client';

import React, { useEffect, useRef } from 'react';
import styles from './folding-effect.module.css';

export default function FoldingLayout({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // We add about 60% of the window height as a buffer.
      // This ensures the user can scroll the footer up to the middle of the screen.
      const buffer = windowHeight * 0.6;

      document.body.style.height = `${contentHeight + buffer}px`;
    };

    // Small delay to ensure children are rendered before measuring
    const timer = setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const tick = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const transformValue = `translateY(${-scrollY}px)`;

      if (topRef.current) topRef.current.style.transform = transformValue;
      if (centerRef.current) centerRef.current.style.transform = transformValue;
      if (bottomRef.current) bottomRef.current.style.transform = transformValue;

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
      document.body.style.height = '';
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper3d}>
        {/* TOP FOLD */}
        <div className={`${styles.fold} ${styles.foldTop}`}>
          <div className={styles.foldAlign}>
            <div className={styles.foldContent} ref={topRef}>
              {children}
            </div>
          </div>
        </div>

        {/* CENTER FOLD */}
        <div className={`${styles.fold}`} id="center-fold">
          <div className={styles.foldAlign}>
            <div className={styles.foldContent} ref={centerRef}>
              {/* Measure this div */}
              <div ref={contentRef}>
                {children}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FOLD */}
        <div className={`${styles.fold} ${styles.foldBottom}`}>
          <div className={styles.foldAlign}>
            <div className={styles.foldContent} ref={bottomRef}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
