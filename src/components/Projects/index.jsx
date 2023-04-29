import React from 'react'
import { Link } from 'react-router-dom'

const SingleProjects = ({ imgURl, desc, title, projectLink, showProject }) => {
  return (
    <div className='flex flex-col items-start bg-[#0d0d0d] cursor-pointer p-4 rounded-[15px] border-2 border-[#0d0d0d] hover:border-[#2525ba] transition-all duration-700 hover:scale-105'>
      <img src={imgURl} alt={title} className='rounded-[15px] h-56 w-full object-cover' />
      <div className='flex flex-col lg:flex-row'>
        <div>
          <h3 className='text-left text-xl font-medium mt-3'>{title}</h3>
          <p className='text-left text-gray-500'>{desc}</p>
        </div>
        {
          showProject ? <Link to={projectLink} target='_blank' className='flex items-center justify-center mt-3 relative md:ml-4'>
            <button className='heroButton'>See Project</button>
          </Link> : <></>
        }

      </div>
    </div>
  )
}

export default SingleProjects