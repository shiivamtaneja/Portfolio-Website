import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../components/BackgroundCircles'

const Contact = () => {
  return (
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
      className='h-screen flex flex-col items-center justify-center overflow-hidden text-center md:flex-row max-w-full px-10 relative mx-auto '
    >
      <BackgroundCircles />
      <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>Contact</h3>

      <div>

      </div>
    </motion.div>
  )
}

export default Contact