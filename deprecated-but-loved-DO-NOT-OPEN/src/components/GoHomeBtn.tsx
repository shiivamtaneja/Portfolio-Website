import Link from 'next/link';
import React from 'react';

const GoHomeBtn = () => {
  return (
    <Link
      href={'/'}
      className='rounded-xl bg-black text-white p-3 border'
    >
      Head back home
    </Link>
  );
};

export default GoHomeBtn;