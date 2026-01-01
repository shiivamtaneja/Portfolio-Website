import { useLayoutEffect, useState } from 'react';

import { motion } from 'framer-motion';

import BackgroundCircles from '../../components/BackgroundCircles';
import SingleProjects from '../../components/Projects/index';

import { getProjects } from '../../api/api';

const Projects = () => {

  const [projects, setProjects] = useState();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects();

        setProjects(data?.result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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
        className='relative flex flex-col items-center px-10 mx-auto overflow-hidden text-center xl:h-screen md:text-left lg:flex-row max-w-7xl justify-evenly'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Projects</h3>
        {/* <div className='flex flex-col z-10 mt-52 space-y-6 lg:space-y-0 lg:mt-[160px] lg:space-x-6 xl:flex-row mb-10 xl:mt-0 lg:gap-5'> */}
        <div className='z-10 flex flex-col flex-wrap space-y-6 mt-52 md:space-y-0 md:flex-row md:mt-32 lg:w-full '>
          {!loading && projects.map((project, index) => (
            <SingleProjects
              key={index}
              imgURl={`https://cdn.sanity.io/images/${import.meta.env.VITE_APP_SANITY_PRODUCTION_ID}/production/${project?.image.asset._ref.split('-')[1]}-${project?.image?.asset._ref.split('-')[2]}.${project?.image.asset._ref.split('-')[3]}`}
              title={project.title}
              desc={project.summary}
              projectLink={project.linkToBuild}
            />
          ))}
        </div>

        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default Projects