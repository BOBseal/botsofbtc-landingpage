'use client'
import React from 'react'
import Image from 'next/image'
import twit from "../../assets/Vector1.svg"
import linkedIn from "../../assets/Vector.svg"
const TeamCard = ({item}) => {
  const link = false;
  return (
    <div className='flex p-[1rem] flex-col gap-[1rem] justify-center items-center font-nunito text-black'>
        <Image src={item.picture} height={100} width={100} alt ={item.name} className="rounded-full border-black border"/>
        <p className='text-[15px] md:text-[20px] font-semibold'>@{item.name}</p>
        <p className='text-[15px] md:text-[20px] font-semibold'>{item.designation}</p>
        <div className='flex gap-4'>
            {link ? <Image src={twit} height={30} width={30} className="bg-black p-1"/>:<div className='w-full flex justify-center'>
            <p className='text-[10px] md:text-[14px] w-[80%] h-[3rem] md:min-h-[6rem] lg:w-[65%]'>{item.desc}</p>
            </div>}
        </div>
    </div>
  )
}

export default TeamCard