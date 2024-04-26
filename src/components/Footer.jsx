import React from 'react'
import '../styles/footer.css'
import dis from '../assets/Vector.svg'
import twit from '../assets/Vector1.svg'
import Image from '../../node_modules/next/image'
import telegram from "../assets/tg.svg"
export default function Footer() {
  return (
    <>
      <div className="h-[280px] bg-black text-white p-[2rem] md:p-[4rem] flex flex-col justify-evenly items-center gap-[2rem]">
         <div className="flex justify-center w-[80%] gap-[5rem] items-center" >
            <div className=" flex flex-col gap-[2rem]">
              {/*  CAN USE ROUTER TO NAVIGATE THROUGH DIFFERNT PAGES IN FUTURE */}
            <button className='f-list-items'>Dapp</button>
            <button className='f-list-items'>Docs</button>
            </div>
            
            <div className="flex flex-col gap-[2rem]">
            <button className='f-list-items'>Contact Us</button>
            <button className='f-list-items'>Mint</button>
            </div>
         </div>
         <div className="f-lower flex gap-[2rem]"> 
            <Image width={30} height={30} src={telegram} alt="" />
            <Image width={30} height={30} src= {twit} alt="" />
         </div>


      </div>
    </>
  )
}
