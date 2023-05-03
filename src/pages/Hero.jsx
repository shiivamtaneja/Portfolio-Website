import React from 'react'

import { Cursor, useTypewriter } from 'react-simple-typewriter'
import BackgroundCircles from '../components/BackgroundCircles'

import UserPic from '../assets/images/profile-pic.png'



const Hero = () => {
	const [text, count] = useTypewriter({
		words: [
			"The name is Shivam Taneja",
			"Guy-who-loves-Games.jsx",
			"<FrontEndDeveloper />",
			"Opse, Almost forgot to say 'Hello World!'"
		],
		loop: true,
		delaySpeed: 2000,
	})
	return (
		<section>
			<div className='h-screen flex flex-col space-y-28 items-center justify-center text-center overflow-hidden '>
				<BackgroundCircles />
				<img
					className='relative rounded-full h-32 w-32 mx-auto top-[-68px]'
					src={UserPic}
					alt=""
				/>
				<div className='z-20 top-[-150px] relative'>
					<h2 className='text-sm uppercase text-gray-500 pb-2 tracking-[15px] '>Upcoming Engineer</h2>
					<h1 className='text-3xl lg:text-6xl font-semibold px-10'>
						<span className='mr-3'>{text}</span>
						<Cursor cursorColor='#2525ba' />
					</h1>
				</div>
			</div>
		</section>
	)
}

export default Hero