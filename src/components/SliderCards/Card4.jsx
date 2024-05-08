import React from 'react'
import {sectionText} from "../../configs/config"


const Card4 = () => {
  return (
    <div className='w-full h-full text-white gap-[1rem] md:gap-1rem flex flex-col'>
        <h1 className='text-[#E5BD19] font-fredoka text-[22px] md:text-[55px] font-bold uppercase md:w-[90%] flex justify-center'>{sectionText[3].h1}</h1>
        <p className='w-[90%] text-white text-[15px] font-nunito'>{sectionText[3].p1}</p>
        <h2 className='text-[#E5BD19] font-fredoka text-[18px] md:text-[35px] font-bold uppercase md:w-[90%] mt-[20px]'>{sectionText[3].h2}</h2>
        {
            sectionText[3].p2.map((o,k)=>(
                <li className='w-[90%] mt-[10px] text-white text-[15px] font-nunito'>{o}</li>
            ))
        }
    </div>
  )
}

export default Card4