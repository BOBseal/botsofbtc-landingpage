import React from 'react'
import Navbar from '../components/Navbar'
import Intro from '../components/Intro'
import Tokenomic from '../components/Tokenomic'
import Milk from '../components/Milk'
import Casarol from '../components/Casarol'
import Footer from '../components/Footer'
import About from '../components/About'
import { Utilities } from '../components/Utilities'

export default function HomePage() {
  return (
    <>
    <Intro/>
    <Casarol/>
    <About/>
    <Utilities/>
    <Tokenomic/>
    <Milk/>
    <Footer/>
    </>
  )
}
