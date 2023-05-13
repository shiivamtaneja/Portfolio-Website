import React from 'react'

import { motion } from 'framer-motion'
import BackgroundCircles from '../../components/BackgroundCircles'

import SingleProjects from '../../components/Projects/index'

import CircleGame from '../../assets/images/circle-game.png'
import YYTDMenu from '../../assets/images/yytd-menu.png'
import CommingSoon from '../../assets/images/coming-soon.png'
import ChatMingle from '../../assets/images/chat-mingle.png'

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
        className='flex flex-col relative text-center xl:h-screen md:text-left lg:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center overflow-hidden'
      >
        <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl '>Projects</h3>
        <div className='flex flex-col z-10 mt-52 space-y-6 lg:space-y-0 lg:mt-[160px] lg:space-x-6 xl:flex-row mb-10 xl:mt-0 lg:gap-5'>
          <SingleProjects
            imgURl={CircleGame}
            title="Circle Catcher - The Circle Game"
            desc="Control a white circle to get bigger and win"
            projectLink="https://github.com/shiivamtaneja/circle-game"
            showProject={true}
          />
          <SingleProjects
            imgURl={ChatMingle}
            title="Chat Mingle"
            desc="Real Time Chatting App"
            projectLink="https://github.com/shiivamtaneja/chat-mingle"
            showProject={true}
          />
          <SingleProjects
            imgURl={YYTDMenu}
            title="Youtube Video / Audio Downloader"
            desc="Application to download youtube videos and audios"
            projectLink="https://github.com/shiivamtaneja/YTVD"
            showProject={true}
          />
          <SingleProjects
            imgURl={CommingSoon}
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