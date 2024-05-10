'use client'
import React,{useContext} from 'react'
import Navbar from '@/components/Navbar'
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
  const {states} = useContext(AppContext);
  return (
    <div className={`flex flex-col w-full justify-center h-full`}>
      <Navbar/>
      <HM className={`${!states.mobileMenuOpen? 'blur-2xl':""}`}/>
      <TxtSlider className={`${states.mobileMenuOpen? 'blur-2xl':""}`}/>
      <Partners className={`${states.mobileMenuOpen? 'blur-2xl':""}`}/>
      <Team className={`${states.mobileMenuOpen? 'blur-2xl':""}`}/>
      <Footer className={`${states.mobileMenuOpen? 'blur-2xl':""}`}/>
    </div>
  )
}

export default HomeV2