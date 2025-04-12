import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Container } from '../components/Container'

const Layout = () => {
  return (  
    <Container>
    <Navbar />
     <Outlet />
    <Footer />
    </Container>
  )
}

export default Layout