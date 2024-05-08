import React from 'react'
import NAVBAR from '@/components/NAVBAR'
import HM from "@/components/HM"
import TxtSlider from "@/components/TxtSlider"
import Partners from "@/components/Partners"
import Footer from "../../components_old/Footer"
const CSS = {

}

const HomeV2 = () => {
  return (
    <div className='flex flex-col w-full justify-center h-full'>
      <NAVBAR/>
      <HM/>
      <TxtSlider/>
      <Partners/>
    </div>
  )
}

export default HomeV2