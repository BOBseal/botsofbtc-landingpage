'use client'
import React,{useContext, useState} from 'react'
import {sectionText} from "../configs/config.jsx"
import Image from '../../node_modules/next/image.js'
import l from "../assets/leftArrow.png"
import r from "../assets/rightArrow.png"
import SliderCard from "./CARDS/SliderCards"
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from '@/context/AppContext.jsx'
import QuickUtilities from "@/components/CARDS/QuickUtilities.jsx"

const RampageHome = () => {
    const {utils,setUtils, states} = useContext(AppContext);
    const [exitVariants , setActiveVariants] = useState({
        hidden: { opacity: 25, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    })

    const goRight =()=>{
        if(utils == 3){
            return
        }
        const s = utils
        setUtils(s +1);
    }

    const goLeft =()=>{
        if(utils == 0){
            return
        }
        const s = utils
        setUtils(s -1);
    }

  return (
    <>
    <AnimatePresence>
        <motion.div
          initial ={{opacity:60 , y:-50 }}
         animate={{
          opacity:1,
          y:0
         }}
         transition={{ ease: "easeInOut", duration: 0.8 }}
        >
    <div className={`bg-[#231F20] w-screen flex justify-center flex-col md:justify-between items-center h-full pt-[2rem] pb-[2rem] border-b-[3px] border-[#E5BD19] ${states.mobileMenuOpen ? "blur-md" : ""}`} >
        <div>
            <div className='text-[#E5BD19] leading-[30px] md:leading-[60px] font-fredoka text-[42px] md:text-[75px] flex justify-start font-bold uppercase'>QUICK ACTIONS</div>
        </div>
        <div className='flex justify-center w-full md:flex-row md:justify-between items-center'>
        <button className='text-white md:ml-[30px] flex' onClick={()=> goLeft()}><Image src={l} height={20} width={20} alt="pcbutton" className="hover:scale-125"/></button>
        
        <AnimatePresence mode="wait">
                <motion.div
                    key={utils}
                    className={`h-[89%] flex flex-col w-full h-full`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={exitVariants}
                >
                            <QuickUtilities pageNo={utils}/>
                </motion.div>
            </AnimatePresence>

        <button className='text-white md:mr-[30px] flex' onClick={()=> goRight()}><Image src={r} height={20} width={20} alt="pcbutton" className="hover:scale-125"/></button>
    </div>
    </div>
    </motion.div>
    </AnimatePresence>
    </>
  )
}

export default RampageHome