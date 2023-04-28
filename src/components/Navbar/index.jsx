import React, { useLayoutEffect, useState } from 'react'
import NavbarSmall from './NavbarSmall'
import NavabarBig from './NavbarBig'


const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const updateWidth = () => {
    setWidth(window.innerWidth)
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <>
      {width >= 1024 ? <NavabarBig /> : <NavbarSmall />}
    </>
  )
}

export default Navbar