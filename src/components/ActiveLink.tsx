import React from 'react';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode,
  name: string,
  isNavElement: boolean,
}

const ActiveLink = ({
  children,
  name,
  isNavElement,
  ...props
}: CustomLinkProps) => {

  const pathName = usePathname();

  if (isNavElement) {

    return (
      <div className='overflow-hidden'>
        <div
          className="group flex w-fit cursor-pointer items-center gap-x-4 nav-item"
        >
          <span className={`${name === pathName ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-0 group-hover:visible group-hover:scale-100 group-hover:opacity-100"} inline-block h-3 w-3 rounded-full bg-dark-400 transition-all duration-800`}></span>
          <div className="w-fit overflow-y-clip">
            <Link
              {...props}
              className={`${name === pathName ? "" : "group-hover:translate-x-6"} inline-block transition-transform duration-700 capitalize`}
            >
              {children}
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Link
        {...props}
        className={`${name === pathName ? "active" : ""} font-semibold text-lg links relative overflow-hidden capitalize`}
      >
        {children}
      </Link>
    );
  }
};

export default ActiveLink;