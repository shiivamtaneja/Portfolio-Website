import React from 'react'

import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from './BackgroundCircles'
import { HashLink } from 'react-router-hash-link'

const Hero = () => {
	const [text, count] = useTypewriter({
		words: [
			"Thy name's Shivam Taneja",
			"Guy-who-loves-Games.jsx",
			"<FrontEndDeveloper />",
			"Opse, Almost forgot to say 'Hello World!'"
		],
		loop: true,
		delaySpeed: 2000,
	})
	return (
		<div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
			<BackgroundCircles />
			<img
				className='relative rounded-full h-32 w-32 mx-auto'
				src='https://avatars.githubusercontent.com/u/79853285?v=4'
				alt=""
			/>
			<div className='z-20'>
				<h2 className='text-sm uppercase text-gray-500 pb-2 tracking-[15px]'>Upcoming Engineer</h2>
				<h1 className='text-3xl lg:text-6xl font-semibold px-10'>
					<span className='mr-3'>{text}</span>
					<Cursor cursorColor='#2525ba' />
				</h1>
				<div className='pt-5'>
					<HashLink to="#about">
						<button className='heroButton'>&lt; About &gt;</button>
					</HashLink>
					<HashLink to="#experience">
						<button className='heroButton'>&lt; Experience &gt;</button>
					</HashLink>
					<HashLink to="#skills">
						<button className='heroButton'>&lt; Skills &gt;</button>
					</HashLink>
					<HashLink to="#projects">
						<button className='heroButton'>&lt; Projects &gt;</button>
					</HashLink>
				</div>
			</div>
		</div>
	)
}

export default Hero