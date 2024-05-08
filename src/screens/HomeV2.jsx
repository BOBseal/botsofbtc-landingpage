import React from 'react'
import Navbar from '@/components/Navbar'
import HM from "@/components/HM"
import TxtSlider from "@/components/TxtSlider"
import Partners from "@/components/Partners"
import Team from "@/components/Team"
//import Footer from "../../components_old/Footer"
const CSS = {

}

const HomeV2 = () => {
  return (
    <div className='flex flex-col w-full justify-center h-full'>
      <Navbar/>
      <HM/>
      <TxtSlider/>
      <Partners/>
      <Team/>
    </div>
  )
}

export default HomeV2