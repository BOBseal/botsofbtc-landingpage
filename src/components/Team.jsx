import React from 'react'
import "../styles/Team.css"
import {teamConfig} from "../configs/config"
import TeamCard from "../components/CARDS/TeamCard"

const Team = () => {
  return (
    <div className='teamContainer h-full p-[2rem] min-h-[20rem] flex justify-center items-center'>
      <div className=' w-full h-full min-h-[19rem] grid-cols-2 md:grid-cols-4 grid gap-[2rem]'>
        {teamConfig.map((item)=>(
          <TeamCard item ={item}/>
        ))}
      </div>
    </div>
  )
}

export default Team