import { useLayoutEffect, useState } from 'react';

import { motion } from 'framer-motion';
import BackgroundCircles from '../../components/BackgroundCircles';

import { getAboutData } from '../../api/api';

const About = () => {

  const [aboutData, setAboutData] = useState();

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const data = await getAboutData();

        setAboutData(data?.result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const imageUrl = `https://cdn.sanity.io/images/${import.meta.env.VITE_APP_SANITY_PRODUCTION_ID}/production/${aboutData?.profilePic.asset._ref.split('-')[1]}-${aboutData?.profilePic.asset._ref.split('-')[2]}.${aboutData?.profilePic.asset._ref.split('-')[3]}`;

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
        className='relative flex flex-col items-center px-10 mx-auto overflow-hidden text-center lg:h-screen md:text-left lg:flex-row max-w-7xl justify-evenly'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>About Me</h3>
        <motion.img
          initial={{
            x: -200,
            opacity: 0
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 1.2,
          }}
          src={imageUrl}
          className='-mb-20 md:mb-0 mt-[250px] md:mt-40 lg:mt-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-96 md:h-80 xl:w=[500px] xl:h-[600px] z-10'
        />
        <div className='z-10 px-0 mt-20 space-y-10 md:px-10 md:mt-0'>
          <h4 className='text-3xl font-semibold underline decoration-[#FFAA00]'>I love Design, Technology and Experimentation</h4>
          <p className='pb-20 text-left md:pb-32'>
            {aboutData?.aboutMe}
          </p>
        </div>
        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default About