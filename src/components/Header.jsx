import React from 'react'
import { motion } from 'framer-motion'
import { SocialIcon } from 'react-social-icons'

const Header = () => {
	return (
		<header className='sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-20 xl:items-center'>
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
				className='flex flex-row items-center'>
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
				}}
				className='flex flex-row items-center text-gray-300 cursor-pointer'>
				<SocialIcon
					className='cursor-pointer'
					network='email'
					fgColor='gray'
					bgColor='transparent'
				/>
				<p className='uppercase hidden md:inline-flex text-sm text-gray-400'>Get in Touch</p>
			</motion.div>
		</header>
	)
}

export default Header