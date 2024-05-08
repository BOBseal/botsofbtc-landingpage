'use client'
import React from 'react'
import Image from '../../node_modules/next/image'
import { partnerInfo } from '@/configs/config'

const Partners = () => {
  return (
    <div className='bg-[#231F20] flex p-[2rem] md:pb-[4rem] md:pt-[3rem] gap-[2rem] flex-col items-center'>
      <p className='text-white font-nunito underline underline-offset-3'>Launch Partners</p>
      <div className='w-full flex gap-[1rem] justify-center'>
        {partnerInfo.map((o,k)=>(
          <Image src={o.logo} key={k} width={180} height={180} alt="BOB Logo" className='w-[100px] md:w-[180px]'/>
        ))}
      </div>
    </div>
  )
}

export default Partners