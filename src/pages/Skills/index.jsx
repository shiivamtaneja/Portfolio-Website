import { motion } from 'framer-motion';
import BackgroundCircles from '../../components/BackgroundCircles';

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
        className='relative flex flex-col items-center h-screen px-10 mx-auto overflow-hidden text-center md:text-left lg:flex-row max-w-7xl justify-evenly'
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