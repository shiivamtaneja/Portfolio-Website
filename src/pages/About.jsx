import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../components/BackgroundCircles'

const About = () => {
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
      className='flex flex-col lg:h-screen relative text-center md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
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
        src='https://avatars.githubusercontent.com/u/79853285?v=4'
        className='-mb-20 md:mb-0 mt-[250px] md:mt-40 lg:mt-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-96 md:h-80 xl:w=[500px] xl:h-[600px] z-10'
      />
      <div className='space-y-10 px-0 md:px-10 mt-20 md:mt-0 z-10'>
        <h4 className='text-3xl font-semibold underline decoration-[#FFAA00]'>I love Design, Technology and Experimentation</h4>
        <p className='text-left'>
          I'm a 20-year-old B-Tech College student from India who loves experimenting with cutting-edge technologies.
          I'm passionate about innovative technology, creativity, software engineering and UI/UX. Along with this, I am also fascinated by gaming, content creation, and video editing. I thrive on taking on new challenges and enjoy playing with codes to expand my knowledge.
          In just a year, I have developed a solid foundation in web development, particularly in HTML, CSS, and JS. I actively pursue my interests by freelancing in Graphic Design and Video Editing, and I have over three years of experience working with major creators.
          To broaden my skill set, I'm currently learning more about back-end development. I take pride in being able to get things done and am always eager to learn more.
        </p>
      </div>
      <div className='absolute top-64'>
        <BackgroundCircles />
      </div>
    </motion.div>

  )
}

export default About