import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../../components/BackgroundCircles'

const Projects = () => {
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
        className='flex flex-col lg:h-screen relative text-center md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
      >
        
        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default Projects