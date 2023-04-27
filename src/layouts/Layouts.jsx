import React from 'react'

import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layouts = () => {
  return (
    <div className="bg-[#242424] text-white z-0">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default Layouts