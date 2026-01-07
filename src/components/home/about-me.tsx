import React from 'react';

import { aboutMeContent, RESUME_LINK } from '@/lib/constants/about-me';

const AboutMeSection = () => {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center'>
          <h1 className='text-2xl font-bold'>Hi, I&apos;m Shivam Taneja - </h1>

          <a
            href={RESUME_LINK}
            target='_blank'
            className="text-white relative overflow-hidden"
          >
            <span className="highlight">
              Resume
            </span>
          </a>
        </div>

        <ul className='flex list-disc ml-4 flex-col gap-2'>
          {aboutMeContent.map((item) => (
            <li
              className='text-neutral-500 font-semibold'
              key={item}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AboutMeSection