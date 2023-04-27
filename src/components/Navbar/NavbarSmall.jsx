import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'

const NavbarSmall = () => {
  const [click, setClick] = useState(false)
  const updateClick = () => {
    setClick(prevClick => !prevClick)
  }

  return (
    <header className='sticky top-0 p-5 flex flex-col justify-between mx-auto z-20 '>
      <div className='flex flex-row justify-between'>
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
          }}>
          <button className='flex items-center flex-row pt-3 ham' onClick={updateClick}>
            <svg viewBox="0 0 100 80" width="40" height="40">
              <rect width="80" height="10" rx="10" ry="25" fill='#fff'></rect>
              <rect y="20" width="80" height="10" rx="10" ry="25" fill='#fff'></rect>
              <rect y="40" width="80" height="10" rx="10" ry="25" fill='#fff'></rect>
            </svg>
          </button>
        </motion.div>
      </div>
      {click ? <motion.div
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
          duration: .5
        }} className='flex flex-col items-center border-t-4 bg-black'>
        <div
          className='flex flex-col items-start'
        >
          <Link to="about">
            <button className='heroButton mt-3 w-48'>&lt; About &gt;</button>
          </Link>
          <Link to="experience">
            <button className='heroButton mt-3 w-48'>&lt; Experience &gt;</button>
          </Link>
          <Link to="skills">
            <button className='heroButton mt-3 w-48'>&lt; Skills &gt;</button>
          </Link>
          <Link to="projects">
            <button className='heroButton mt-3 w-48'>&lt; Projects &gt;</button>
          </Link>
        </div>
        <div className='flex items-center cursor-pointer justify-center'>
          <SocialIcon
            className='cursor-pointer'
            network='email'
            fgColor='gray'
            bgColor='transparent'
          />
          <p className='uppercase text-sm text-gray-400'>Get in Touch</p>
        </div>
      </motion.div> : <></>}
    </header>
  )
}

export default NavbarSmall