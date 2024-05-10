'use client'
import React,{useContext} from 'react'
import Navbar from '@/components/NAVBAR'
import HM from "@/components/HM"
import TxtSlider from "@/components/TxtSlider"
import Partners from "@/components/Partners"
import Team from "@/components/Team"
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
//import Footer from "../../components_old/Footer"
const CSS = {

}

const HomeV2 = () => {
  const {states, openMobileMeu} = useContext(AppContext);
  return (
    <div className={`flex flex-col w-full justify-center h-full`}>
      <Navbar/>
      <HM/>
      <TxtSlider />
      <Partners />
      <Team />
      <Footer />
    </div>
  )
}

export default HomeV2