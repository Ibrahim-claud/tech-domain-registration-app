import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayouts = () => {
  return (
    <>
    <Navbar />

    {/** Google Translate Element 
    <div id="google_translate_element"></div>
    */}
    <Outlet />
    </>
  )
}

export default MainLayouts