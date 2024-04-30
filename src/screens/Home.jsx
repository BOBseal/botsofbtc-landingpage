import React from 'react'
import Navbar from '../components/Navbar'
import Intro from '../components/Intro'
import Tokenomic from '../components/Tokenomic'
import Milk from '../components/Milk'
import Casarol from '../components/Casarol'
import Footer from '../components/Footer'
import About from '../components/About'
import { Utilities } from '../components/Utilities'
import Roadmap from "../components/Roadmap"
export default function HomePage() {
  return (
    <main className='font-fredoka'>
    <Intro/>
    <Casarol/>
    <About/>
    <Utilities/>
    <Tokenomic/>
    <Milk/>
    <Roadmap/>
    </main>
  )
}
