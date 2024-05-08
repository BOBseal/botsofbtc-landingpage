import React from 'react'
import {sectionText} from "../../configs/config"

const Card2 = () => {
  return (
    <div className='w-full h-full text-white gap-[0.5rem] md:gap-1rem flex flex-col'>
        <h1 className='text-[#E5BD19] font-fredoka text-[22px] md:text-[55px] font-bold uppercase md:w-[90%]'>{sectionText[1].h1}</h1>
        <p className='w-[90%] text-white font-nunito text-[15px]'>{sectionText[1].p1}</p>
        <h2 className='text-[#E5BD19] font-fredoka text-[18px] md:text-[35px] font-bold uppercase md:w-[90%]'>{sectionText[1].p2[0].h}</h2>
        {sectionText[1].p2[0].t.map((obj , key)=>(
            <li className='w-[90%] text-white font-nunito text-[15px]'>{obj}</li>
        ))}
        <h2 className='text-[#E5BD19] font-fredoka text-[18px] md:text-[35px] font-bold uppercase md:w-[90%]'>{sectionText[1].p2[1].h}</h2>
        {sectionText[1].p2[1].t.map((obj , key)=>(
            <li key={key} className='w-[90%] text-white text-[15px] font-nunito'>{obj}</li>
        ))}
    </div>
  )
}

export default Card2