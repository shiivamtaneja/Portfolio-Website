import React, { useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { navLinks, socialIcons } from '@/lib/constants';
import { SocialIcon } from 'react-social-icons';

const NavContent = ({
  navOpen,
  setNavOpen
}: {
  navOpen: boolean,
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const navBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const t1 = gsap.timeline({ paused: true });

    if (navOpen) {
      t1.play();
    }

    t1.fromTo('.nav-item', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
    });

  }, { scope: navBarRef });

  return (
    <>
      <div
        className="w-full h-full bg-accent-300 rounded-md relative flex flex-col"
      >
        <div className='h-full'>
          <div className="absolute left-0 top-0 opacity-40">
            <Image
              src={'/navmenu.svg'}
              alt=''
              loading='lazy'
              width={245}
              height={245}
              className=''
            >
            </Image>
          </div>
          <div
            className='flex flex-col justify-around h-full overflow-hidden'
            ref={navBarRef}
          >
            <nav
              className='text-dark relative flex flex-col justify-center px-8 font-bold sm:px-14 text-heading-3 2xl:px-20 overflow-hidden'
            >
              {navLinks.map((data, index) => (
                <div className='overflow-hidden' key={index}>
                  <div
                    className="group flex w-fit cursor-pointer items-center gap-x-4 nav-item"
                  >
                    <span className="invisible inline-block h-3 w-3 scale-0 rounded-full bg-darkest opacity-0 transition-all duration-800 group-hover:visible group-hover:scale-100 group-hover:opacity-100"></span>
                    <div className="w-fit overflow-y-clip">
                      <Link
                        href={data.path}
                        className='inline-block transition-transform duration-700 group-hover:translate-x-6'
                        onClick={() => setNavOpen(false)}
                      >
                        {data.name}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </nav>
            <div className='flex justify-start'>
              {socialIcons.map((socials, index) => (
                <SocialIcon
                  style={{
                    width: 80,
                    height: 80
                  }}
                  url={socials.link}
                  fgColor='gray'
                  bgColor='transparent'
                  target='_blank'
                  key={index}
                  className='hover:scale-90 scale-100 duration-100 transition-all'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavContent;