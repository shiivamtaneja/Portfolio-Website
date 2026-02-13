'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RESUME_LINK } from '@/lib/constants/about-me';
import { navItems } from '@/lib/constants/nav-items';
import { socialItems } from '@/lib/constants/social-items';
import { cn } from '@/lib/utils';

import { useIsMobile } from '@/hooks/use-mobile';

import { AnimatePresence, motion } from 'motion/react';

import { FileText, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const Nav = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile(850);
  const isXL = useIsMobile(1280);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header>
      <nav className="flex justify-between items-center">
        <div className='flex gap-4'>
          <Link href={RESUME_LINK} target='_blank'>
            <Button
              className={'dark:bg-zinc-800 bg-zinc-200 border-none outline-none md:px-4 px-2 dark:text-white text-zinc-900 dark:hover:bg-zinc-700 hover:bg-zinc-300'}
              variant="outline"
            >
              <FileText />
              <span>Download Resume</span>
            </Button>
          </Link>

          {!isMobile && (
            <>
              {navItems.map((item, idx) => (
                <Link href={item.link} key={idx}>
                  <Button className={cn(
                    'dark:bg-zinc-800 bg-zinc-200 border-none outline-none md:px-4 px-2 dark:text-white text-zinc-900 dark:hover:bg-zinc-700 hover:bg-zinc-300',
                    pathname === item.link && "dark:bg-zinc-700 dark:text-accent-foreground bg-zinc-900 text-white"
                  )}
                    variant="outline"
                  >
                    <item.icon size={20} />
                    <span>{item.heading}</span>
                  </Button>
                </Link>
              ))}
            </>
          )}
        </div>

        <div className='flex gap-4 items-center'>
          {isMobile ? (
            <>
              <ThemeToggle />

              <div className='relative'>
                <Button
                  ref={buttonRef}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className='dark:bg-zinc-800 bg-zinc-200 border-none outline-none px-2 dark:text-white text-zinc-900 dark:hover:bg-zinc-700 hover:bg-zinc-300'
                  variant="outline"
                >
                  <motion.div
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
                  </motion.div>
                </Button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      ref={menuRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className='absolute top-12 right-0 dark:bg-black bg-white border dark:border-zinc-800 border-zinc-200 rounded-lg shadow-lg p-4 z-50 min-w-[200px]'
                    >
                      <div className='flex flex-col gap-3'>
                        {navItems.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.2 }}
                          >
                            <Link href={item.link} onClick={() => setIsMenuOpen(false)}>
                              <Button className={cn(
                                'w-full justify-start dark:bg-zinc-800 bg-zinc-200 border-none outline-none dark:text-white text-zinc-900 dark:hover:bg-zinc-700 hover:bg-zinc-300',
                                pathname === item.link && "dark:bg-accent dark:text-accent-foreground bg-zinc-900 text-white"
                              )}
                                variant="outline"
                              >
                                <item.icon size={20} />
                                <span>{item.heading}</span>
                              </Button>
                            </Link>
                          </motion.div>
                        ))}

                        <div className='border-t dark:border-zinc-800 border-zinc-200 my-2'></div>

                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: navItems.length * 0.05 + 0.1 }}
                          className='flex gap-4 justify-center'
                        >
                          {socialItems.map((item, idx) => (
                            <Link href={item.link} target='_blank' key={idx}>
                              <Tooltip delayDuration={50}>
                                <TooltipTrigger asChild>
                                  <motion.div
                                    whileHover={{ rotate: 18 }}
                                    initial={{ rotate: 0 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 10
                                    }}
                                  >
                                    <item.icon size={25} className='rounded-md dark:text-white text-zinc-900' />
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{item.heading}</p>
                                </TooltipContent>
                              </Tooltip>
                            </Link>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              {socialItems.map((item, idx) => (
                <Link href={item.link} target='_blank' key={idx}>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ rotate: 18 }}
                        initial={{ rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10
                        }}
                      >
                        <item.icon size={25} className='rounded-md dark:text-white text-zinc-900' />
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.heading}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              ))}

              {isXL && (
                <ThemeToggle />
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Nav