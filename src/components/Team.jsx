import React from 'react'
import {teamConfig} from "../configs/config"
import TeamCard from "./CARDS/TeamCard"

const Team = () => {
  return (
    <div className='h-full bg-[#E5BD19] p-[2rem] min-h-[20rem] flex justify-center items-center border-[3px] border-black'>
      <div className=' w-full h-full justify-between flex flex-col items-center gap-[1rem] md:gap-[2rem]'>
        <h1 className='text-black font-bold text-[2rem] md:text-[3rem] flex font-nunito w-[80%] md:w-auto justify-center'>TEAM</h1>
        <div className='w-full h-full min-h-[19rem] grid-cols-2 md:grid-cols-4 grid gap-[0.8rem]'>
        {teamConfig.map((item, key)=>(
          <TeamCard item ={item} key={key} className="border"/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Team