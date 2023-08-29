import { useLayoutEffect, useState } from 'react';

import { getExperience } from '../../api/api';

import { motion } from 'framer-motion';

import BackgroundCircles from '../../components/BackgroundCircles';

const WorkExperience = () => {

  const [experience, setExperience] = useState();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const data = await getExperience();

        setExperience(data?.result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <section>
      <motion.div
        initial={{
          opacity: 0
        }}
        whileInView={{
          opacity: 1
        }}
        transition={{
          duration: 1.5
        }}
        className='relative flex flex-col items-center h-screen px-10 mx-auto overflow-hidden text-center md:text-left lg:flex-row max-w-7xl justify-evenly'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Experience</h3>
        <div className='flex flex-col gap-y-10'>
          {!loading && experience.map((exp, index) => (
            <>
              <div className="z-10 w-full px-2 mx-automax-w-7xl" key={index}>
                <div className="relative w-full h-full col-span-4">
                  <div className="w-full h-full p-2 bg-indigo-400 rounded-md md:pl-4">
                    <h1 className="py-2 text-sm font-medium text-white lg:text-xl">{exp.jobTitle}</h1>
                    <p className="text-xs text-gray-100 sm:text-sm">
                      {exp.company} | {formatDate(exp.startDate)} - {exp.isCurrentlyWorkingHere ? <span>Present</span> : formatDate(exp.endDate)}
                    </p>
                  </div>
                  <div className="absolute -bottom-3 z-10 w-6 h-6 text-center text-white bg-indigo-400 rounded-full left-[45%]">{index + 1}</div>
                </div>
                <div className="relative flex items-center justify-center w-full h-full col-span-1">
                </div>
              </div>
            </>
          ))}
        </div>
        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default WorkExperience