import { useLayoutEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { SocialIcon } from 'react-social-icons';

import { Link } from 'react-router-dom';

import { BsArrowDown } from 'react-icons/bs';

import { getSocials } from '../../api/api';

const NavbarSmall = () => {
  const [click, setClick] = useState(false);
  const updateClick = () => {
    setClick(prevClick => !prevClick);
  };

  const [socialIcons, setSocialIcons] = useState();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        const data = await getSocials();

        setSocialIcons(data?.result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <header className='sticky top-0 p-5 flex flex-col mx-auto z-20 bg-[#242424]'>
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
          {!loading && socialIcons.map((socials, index) => (
            <SocialIcon
              url={socials?.url}
              fgColor='gray'
              bgColor='transparent'
              target='_blank'
              key={index}
            />
          ))}
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
          <button className='flex flex-row items-center pt-3 ham' onClick={updateClick}>
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
        }} className='flex flex-col items-center bg-black border-t-4'>
        <div
          className='flex flex-col items-start'
        >
          <Link to="/">
            <button className='w-48 mt-3 heroButton' onClick={updateClick}>&lt; Home &gt;</button>
          </Link>
          <Link to="about">
            <button className='w-48 mt-3 heroButton' onClick={updateClick}>&lt; About &gt;</button>
          </Link>
          <Link to="experience">
            <button className='w-48 mt-3 heroButton' onClick={updateClick}>&lt; Experience &gt;</button>
          </Link>
          <Link to="skills">
            <button className='w-48 mt-3 heroButton' onClick={updateClick}>&lt; Skills &gt;</button>
          </Link>
          <Link to="projects">
            <button className='w-48 mt-3 heroButton' onClick={updateClick}>&lt; Projects &gt;</button>
          </Link>
          <Link to="https://drive.google.com/file/d/1gqWBKXT9E-ntOAEjlkCv4546DftQzere/view?usp=sharing" target='_blank'>
            <button className='flex items-center justify-center w-48 mt-3 cursor-pointer heroButton' onClick={updateClick}>Resume <BsArrowDown /></button>
          </Link>
        </div>
        <div className='flex items-center justify-center cursor-pointer'>
          <Link to="/contact" onClick={updateClick}>
            <div>
              <SocialIcon
                className='cursor-pointer'
                network='email'
                fgColor='gray'
                bgColor='transparent'
              />
              <p className='inline-flex text-sm text-gray-400 uppercase'>Get in Touch</p>
            </div>
          </Link>
        </div>
      </motion.div> : <></>}
    </header>
  )
}

export default NavbarSmall