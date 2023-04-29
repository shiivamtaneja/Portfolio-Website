import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../../components/BackgroundCircles'

import SingleProjects from '../../components/Projects/index'

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
        className='flex flex-col relative text-center lg:h-screen md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Projects</h3>
        <div className='flex flex-col z-10 mt-52 space-y-6 lg:space-y-0 lg:mt-0 lg:space-x-6 lg:flex-row mb-10'>
          <SingleProjects
            imgURl="https://raw.githubusercontent.com/shiivamtaneja/circle-game/main/img/screenshot.png"
            title="Circle Catcher - The Circle Game"
            desc="Control a white circle to get bigger and win"
            projectLink="https://github.com/shiivamtaneja/circle-game"
            showProject={true}
          />
          <SingleProjects
            imgURl="https://raw.githubusercontent.com/shiivamtaneja/YTVD/master/ss%20menu.png"
            title="Youtube Video / Audio Downloader"
            desc="Application to download youtube videos and audios"
            projectLink="https://github.com/shiivamtaneja/YTVD"
            showProject={true}
          />
          <SingleProjects
            imgURl="https://raw.githubusercontent.com/shiivamtaneja/Private-Stuff/main/coming%20soon.png?token=GHSAT0AAAAAACA7ZK2SLJSTWVUTXP6GJMAMZCNFZMQ"
            title="Coming Soon"
            desc="More projects are being added"
            projectLink="https://github.com/shiivamtaneja/YTVD"
            showProject={false}
          />
        </div>


        <div className='absolute top-64'>
          <BackgroundCircles />
        </div>
      </motion.div>
    </section>
  )
}

export default Projects