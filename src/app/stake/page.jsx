import React from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import StakePage from "@/components/StakePage.jsx"

const page = () => {
  return (
    <div>
        <Navbar/>
        <div>
            <StakePage/>
        </div>
        <Footer/>
    </div>
  )
}

export default page