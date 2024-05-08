import React from 'react'
import {sectionText} from "../../configs/config"
const Card1 = () => {
  return (
    <div className='h-full w-full gap-[1rem] justify-between flex flex-col'>
        <h1 className='text-[#E5BD19] font-fredoka text-[22px] md:text-[55px] flex justify-center font-bold uppercase md:w-[90%]'>{sectionText[0].h1}</h1>
        <p className='w-[90%] text-white font-nunito mt-[20px] text-[15px]'>{sectionText[0].p1}</p>
        <h2 className='text-[#E5BD19] font-fredoka text-[22px] md:text-[55px] mt-[20px] font-bold uppercase md:w-[90%] '>{sectionText[0].h2}</h2>
        <div className='w-[90%]'>
            {sectionText[0].p2.map((obj,key)=>(
                <li className='w-full text-white mt-[20px] text-[15px] font-nunito'>{obj}</li>
            ))}
        </div>
    </div>
  )
}

export default Card1