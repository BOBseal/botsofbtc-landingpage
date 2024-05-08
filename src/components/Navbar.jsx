'use client'
import React from 'react'
import Image from 'next/image'
import lgo from "../assets/dp.jpg"
import menu from "../assets/threelinemenu.svg"


const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b-[2px] border-black bg-[#E5BD19] w-full p-[0.7rem] lg:pr-[6rem] lg:pl-[6rem]">
        <div className='flex justify-center gap-[0.5rem] md:gap-[1rem] lg:gap-[1.6rem] items-center'>
          <div className='h-[50px] w-[50px] md:h-[70px] md:w-[70px]'>
              <Image src={lgo} height={1000} width={1000} alt="logo" className='rounded-full border border-black object-cover'/>
          </div>
          <div> 
            <h1 className='font-nunito text-[23px] md:text-[35px] lg:text-[45px] font-[700]'>BOTS OF BITCOIN</h1>
          </div>
        </div>

        <div className="md:hidden flex">
          <div className='h-[70px] w-[70px] md:h-[80px] md:w-[80px]'>
            <Image src={menu} height={1000} width={1000} alt="menu" className='object-cover'/>
          </div>
        </div>
        
        <div className ="md:flex gap-[30px] hidden ">
          <p>Mint</p>
          <p>Lottery</p>
          <p>Vaults</p>
          <p>Learn More</p>
        </div>

        <div className='md:flex hidden'>
          Connect Wallet
        </div>
    </div>
  )
}

export default Navbar