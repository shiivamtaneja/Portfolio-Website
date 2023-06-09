import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../../components/BackgroundCircles'

const Skills = () => {
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
        className='flex flex-col h-screen relative text-center md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Skills</h3>
        <h2 className='text-sm uppercase text-gray-500 pb-2 tracking-[15px] '>This Section is under Development1</h2>
        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default Skills