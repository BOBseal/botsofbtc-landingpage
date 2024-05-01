import React from 'react'
import Image from 'next/image'
import twit from "../../assets/Vector1.svg"
import linkedIn from "../../assets/Vector.svg"
const TeamCard = ({item}) => {
  return (
    <div className='flex flex-col gap-[1rem] justify-center items-center font-nunito text-black'>
        <Image src={item.picture} height={100} width={100} alt ={item.name} className="rounded-full border-black border"/>
        <p>@{item.name}</p>
        <p>{item.designation}</p>
        <div className='flex gap-4'>
            <Image src={twit} height={30} width={30} className="bg-black p-1"/>
        </div>
    </div>
  )
}

export default TeamCard