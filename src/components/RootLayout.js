import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'
// import Header from './Header/Header'
import Footer from './Footer'
import './RootLayout.css'
// import Sidebar from './Header/Sidebar'
function RootLayout() {

  return (
    <div>
      <Navbar/>
      {/* <Sidebar/> */}
      <Outlet />
      <Footer/>
      
    </div>
  )
}
export default RootLayout

