import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children, theme, onThemeChange }) => {
  return (
    <div className='min-h-screen'>
      <Navbar theme={theme} onThemeChange={onThemeChange} />
      <main>{children}</main>
      <Footer theme={theme} />
    </div>
  )
}

export default Layout
