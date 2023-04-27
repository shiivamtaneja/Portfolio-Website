import React from 'react'
import { motion } from 'framer-motion'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'

const NavabarBig = () => {
  return (
    <header className='sticky top-0 p-5 flex flex-col items-start justify-center lg:flex-row lg:max-w-7xl lg:justify-between lg:mx-auto z-20 lg:items-center '>
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.25
        }}
        className='flex flex-row items-center'
      >
        <SocialIcon
          url="https://www.linkedin.com/in/shivam-taneja/"
          fgColor='gray'
          bgColor='transparent'
          target='_blank'
        />
        <SocialIcon
          url="https://github.com/shiivamtaneja"
          fgColor='gray'
          bgColor='transparent'
          target='_blank'
        />
      </motion.div>
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          y: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.25
        }}
        className='flex flex-col lg:flex-row items-baseline lg:items-center'
      >
        <Link to="about">
          <button className='heroButton'>&lt; About &gt;</button>
        </Link>
        <Link to="experience">
          <button className='heroButton mt-3 lg:mt-0'>&lt; Experience &gt;</button>
        </Link>
        <Link to="skills">
          <button className='heroButton mt-3 lg:mt-0'>&lt; Skills &gt;</button>
        </Link>
        <Link to="projects">
          <button className='heroButton mt-3 lg:mt-0'>&lt; Projects &gt;</button>
        </Link>
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 1.25
        }}
        className='flex flex-row items-center text-gray-300 cursor-pointer'>
        <SocialIcon
          className='cursor-pointer'
          network='email'
          fgColor='gray'
          bgColor='transparent'
        />
        <p className='uppercase md:inline-flex text-sm text-gray-400'>Get in Touch</p>
      </motion.div>
    </header>
  )
}

export default NavabarBig