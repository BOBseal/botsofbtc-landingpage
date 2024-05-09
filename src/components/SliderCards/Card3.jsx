import React from 'react'
import {sectionText} from "../../configs/config"


const Card3 = () => {
  return (
    <div className='w-full h-full text-white gap-[1rem] flex flex-col'>
        <h1 className='text-[#E5BD19] font-fredoka text-[22px] leading-[30px] md:leading-[60px] md:text-[55px] font-bold uppercase md:w-[90%] flex justify-start'>{sectionText[2].h1}</h1>
        <p className='w-[90%] text-white text-[15px] font-nunito'>{sectionText[2].p1}</p>
        <h2 className='text-[#E5BD19] leading-[30px] md:leading-[50px] font-fredoka text-[18px] md:text-[35px] font-bold uppercase md:w-[90%]'>{sectionText[2].h2}</h2>
        <p className='w-[90%] text-white text-[15px] font-nunito'>{sectionText[2].p2}</p>
        <h2 className='text-[#E5BD19] font-fredoka leading-[30px] md:leading-[50px] text-[18px] md:text-[35px] font-bold uppercase md:w-[90%]'> OVERVIEW :</h2>
        {sectionText[2].t.map((o , k) => (
            <li key={k} className='w-[90%] text-white text-[15px] font-nunito'>{o}</li>
        ))}
    </div>
  )
}

export default Card3