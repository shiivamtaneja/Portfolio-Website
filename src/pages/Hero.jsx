import { useLayoutEffect, useState } from 'react';

import { getPageInfo } from '../api/api';

import BackgroundCircles from '../components/BackgroundCircles';
import TypeWriter from '../components/TypeWriter';

const Hero = () => {
	const [pageInfo, setpageInfo] = useState();

	useLayoutEffect(() => {
		async function fetchData() {
			try {
				const data = await getPageInfo();

				setpageInfo(data?.result[0]);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchData();
	}, []);

	const imageUrl = `https://cdn.sanity.io/images/${import.meta.env.VITE_APP_SANITY_PRODUCTION_ID}/production/${pageInfo?.profilePic.asset._ref.split('-')[1]}-${pageInfo?.profilePic.asset._ref.split('-')[2]}.${pageInfo?.profilePic.asset._ref.split('-')[3]}`;

	return (
		<section>
			<div className='flex flex-col items-center justify-center h-screen overflow-hidden text-center space-y-28 '>
				<BackgroundCircles />
				<img
					className='relative rounded-full h-32 w-32 mx-auto top-[-68px]'
					src={imageUrl}
					alt=""
				/>
				<div className='z-20 top-[-150px] relative'>
					<h2 className='text-sm uppercase text-gray-500 pb-2 tracking-[15px] '>{pageInfo?.role}</h2>
					<h1 className='px-10 text-3xl font-semibold lg:text-6xl'>
						<TypeWriter words={pageInfo?.otherInfo} />
					</h1>
				</div>
			</div>
		</section>
	)
}

export default Hero