import React from 'react'

const Timeline = () => {
    return (
        <>
            <div className="max-w-7xl mx-auto w-full grid grid-cols-9 px-2 z-10">
                {/* 1st */}
                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-indigo-400 rounded-md p-2 md:pl-4">
                        <h1 className="text-white text-sm lg:text-xl font-medium py-2">Freelance Frontend Developer</h1>
                        <p className="text-gray-100 sm:text-sm text-xs">January 2023 - Present</p>
                    </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">1</div>
                </div>
                <div className="col-span-4 w-full h-full"></div>


                {/* 2nd */}
                <div className="col-span-4 w-full h-full"></div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">2</div>
                </div>
                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-indigo-400 rounded-md p-2 md:pl-4">
                        <h1 className="text-white text-sm lg:text-xl font-medium py-2">Backend & Frontend</h1>
                        <p className="text-gray-100 sm:text-sm text-xs">MRIIRS, Faridabad, Haryana | September 2022 - February 2023</p>
                    </div>
                </div>

                {/* 3rd */}
                <div className="col-span-4 w-full h-full ">
                    <div className="w-full h-full bg-indigo-400 rounded-md p-2 md:pl-4">
                        <h1 className="text-white text-sm lg:text-xl font-medium py-2">Frontend Developer</h1>
                        <p className="text-gray-100 sm:text-sm text-xs">FinLux Technology Pvt Ltd, Faridabad, Haryana | May 2022 - September 2022</p>
                    </div>
                </div>
                <div className="relative col-span-1 w-full h-full flex justify-center items-center">
                    <div className="h-full w-1 bg-indigo-300"></div>
                    <div className="absolute w-6 h-6 rounded-full bg-indigo-400 z-10 text-white text-center">3</div>
                </div>
                <div className="col-span-4 w-full h-full"></div>
            </div>
        </>
    )
}

export default Timeline