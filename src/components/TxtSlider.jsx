'use client'
import React,{useState} from 'react'
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

const TxtSlider = () => {
    const [act , setAct] = useState(1)

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

  return (
    <div className='bg-[#231F20] flex justify-between items-center min-h-[900px] md:min-h-[800px] pt-[2rem] pb-[2rem] border-b border-white'>
        <button className='text-white md:ml-[30px]' onClick={()=> goLeft()}><Image src={l} height={20} width={20} className="hover:scale-125"/></button>
        
        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 1 ? "" : "hidden"}`}>
            <Card1/>
        </div>

        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 2 ? "" : "hidden"}`}>
            <Card2/>
        </div>


        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 3 ? "" : "hidden"}`}>
            <Card3/>
        </div>


        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 4 ? "" : "hidden"}`}>
            <Card4/>
        </div>



        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 5 ? "" : "hidden"}`}>
            <Card5/>
        </div>



        <div className={`h-[86%] flex flex-col md:w-[70%] lg:w-[55%] w-[85%] ${act == 6 ? "" : "hidden"}`}>
            <Card6/>
        </div>


        <button className='text-white md:mr-[30px]' onClick={()=> goRight()}><Image src={r} height={20} width={20} className="hover:scale-125"/></button>
    </div>
  )
}

export default TxtSlider