import React, { useRef } from 'react';

import Image from 'next/image';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import ActiveLink from '@/components/ActiveLink';
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

    t1.from('.nav-items', {
      x: '-100',
      opacity: 0
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
              className='text-dark-200 relative flex flex-col justify-center px-8 font-bold sm:px-14 text-heading-2 2xl:px-20 overflow-hidden nav-items'
            >
              {navLinks.map((data, index) => (
                <ActiveLink
                  key={index}
                  name={data.path}
                  href={data.path}
                  isNavElement={true}
                  onClick={() => setNavOpen(false)}
                >
                  {data.name}
                </ActiveLink>
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