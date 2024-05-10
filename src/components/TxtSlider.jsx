'use client'
import React,{useContext, useState} from 'react'
import {sectionText} from "../configs/config.jsx"
import Image from '../../node_modules/next/image.js'
import l from "../assets/leftArrow.png"
import r from "../assets/rightArrow.png"
import Card1 from "./SliderCards/Card1"
import Card2 from "./SliderCards/Card2"
import Card3 from "./SliderCards/Card3"
import Card4 from "./SliderCards/Card4"
import Card5 from "./SliderCards/Card5"
import Card6 from "./SliderCards/Card6"
import Card7 from './SliderCards/Card7'
import { motion, AnimatePresence } from "framer-motion"
import { AppContext } from '@/context/AppContext.jsx'

const TxtSlider = () => {
    const {act , setAct} = useContext(AppContext);
    
    const [cards, setCards] = useState([
        Card1,
        Card2,
        Card3,
        Card4,
        Card5
    ])

    const goRight =()=>{
        if(act == 5){
            return
        }
        const s = act
        setAct(s +1);
    }

    const goLeft =()=>{
        if(act == 1){
            return
        }
        const s = act
        setAct(s -1);
    }

    const exitVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    };

  return (
    <div className='bg-[#231F20] flex justify-between flex-col md:flex-row md:justify-between items-center h-[600px] md:h-[790px] overflow-x-auto pt-[2rem] pb-[2rem] border-b border-white'>
        <button className='text-white md:ml-[30px] hidden md:flex' onClick={()=> goLeft()}><Image src={l} height={20} width={20} alt="pcbutton" className="hover:scale-125"/></button>
        
        <AnimatePresence mode="wait">
                <motion.div
                    key={act}
                    className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%]`}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={exitVariants}
                >
                    {act === 1 && <Card1 />}
                    {act === 2 && <Card2 />}
                    {act === 3 && <Card3 />}
                    {act === 4 && <Card4 />}
                    {act === 5 && <Card5 />}
                    {act === 6 && <Card6 />}
                </motion.div>
            </AnimatePresence>

        <div className='flex w-full justify-between mt-[300px] md:hidden h-full absolute'>
            <button className='text-white md:hidden flex' onClick={()=> goLeft()}><Image src={l} height={20} width={20} alt="button" className="hover:scale-125"/></button>
            <button className='text-white md:hidden flex' onClick={()=> goRight()}><Image src={r} height={20} width={20} alt="button" className="hover:scale-125"/></button>    
        </div>

        <button className='text-white md:mr-[30px] hidden md:flex' onClick={()=> goRight()}><Image src={r} height={20} width={20} alt="pcbutton" className="hover:scale-125"/></button>
    </div>
  )
}

export default TxtSlider