import React from 'react'
import { Link } from 'react-router-dom'

import { motion } from 'framer-motion'


const SingleProjects = ({ imgURl, desc, title, projectLink, showProject }) => {
  return (
    <div className='flex flex-col items-start bg-[#0d0d0d] cursor-pointer p-4 rounded-[15px] border-2 border-[#0d0d0d] hover:border-[#2525ba] transition-all duration-700 hover:scale-105'>
      <motion.img
        initial={{
          y: 100,
          opacity: 0
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1.2,
        }}
        src={imgURl}
        alt={title}
        className='rounded-[15px] h-56 w-full object-cover'
      />
      <div className='flex flex-col lg:flex-row'>
        <motion.div
          initial={{
            x: -100,
            opacity: 0
          }}
          whileInView={{
            x: 0,
            opacity: 1
          }}
          transition={{
            duration: 1.5
          }}>
          <h3 className='text-left text-xl font-medium mt-3'>{title}</h3>
          <p className='text-left text-gray-500'>{desc}</p>
        </motion.div>
        {
          showProject ? <Link to={projectLink} target='_blank' className='flex items-center justify-center mt-3 relative md:ml-4'>
            <button className='heroButton'>See Project</button>
          </Link> : <></>
        }
      </div>
    </div>
  )
}

export default SingleProjects