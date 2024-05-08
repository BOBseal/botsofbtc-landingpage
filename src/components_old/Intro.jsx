'use client'
import React from 'react'
import '../styles/intro.css'
import imgA from '../assets/haha.gif'
import imgB from '../assets/16.png'
import imgC from '../assets/22.png'
import imgD from '../assets/26.png'
import imgE from '../assets/19.png'
import Image from '../../node_modules/next/image'


export default function Intro() {
  return (
    <><div className="flex pt-[3rem] pb-[3rem] bg-[#E8C430] min-h-[800px] flex-col md:flex-row-reverse justify-center items-center gap-[3rem] lg:gap-[2rem] border-[3px] border-black">
      
        <div className="flex h-[50%] lg:pr-[5rem] justify-center items-center w-full">
          <div className='flex lg:h-[35rem] lg:w-[35rem] items-center justify-center h-[90%] w-[90%]'>
          <Image src={imgA} className="object-cover rounded-lg" height={1000} width={1000} alt ="BOTS OF BITCOIN"/>
          </div>
        </div>

        <div className="flex w-[90%] h-[50%] flex-col lg:pl-[7rem]">
            <h1 className=' nnn text-[65px] md:pb-[20px] md:text-[85px] font-[700] pt-[20px] pr-[20px] pl-[20px] font-nunito text-black'>BOTS OF BITCOIN</h1>
            <p className='text-black p-[20px] text-[24px] ddd'>BOTS OF BITCOIN is a Collection of 10k Unique Revenue Sharing ROBOT PFPs with Utility on BOB. Mint one and Earn 6.9% Royalties on your Minted PFPs Forever and a Bonus Airdrop of Platform Tokens! </p>
        </div>
        </div></>
  )
}
