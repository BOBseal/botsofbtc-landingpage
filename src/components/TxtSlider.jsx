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

  return (
    <div className='bg-[#231F20] flex justify-between flex-col md:flex-row md:justify-between items-center h-[900px] pt-[1rem] overflow-x-auto md:pt-[2rem] pb-[2rem] border-b border-white'>
        <button className='text-white md:ml-[30px] hidden md:flex' onClick={()=> goLeft()}><Image src={l} height={20} width={20} className="hover:scale-125"/></button>
        
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
        <div className='flex w-full justify-between mt-[700px] h-full absolute'>
            <button className='text-white md:hidden flex' onClick={()=> goLeft()}><Image src={l} height={20} width={20} className="hover:scale-125"/></button>
            <button className='text-white md:hidden flex' onClick={()=> goRight()}><Image src={r} height={20} width={20} className="hover:scale-125"/></button>    
        </div>

        <button className='text-white md:mr-[30px] hidden md:flex' onClick={()=> goRight()}><Image src={r} height={20} width={20} className="hover:scale-125"/></button>
    </div>
  )
}

export default TxtSlider