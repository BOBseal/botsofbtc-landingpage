import React from 'react'

//import dis from './src/assets/Vector.svg'
import twit from '../src/assets/Vector1.svg'
import Image from 'next/image'
import telegram from "../src/assets/telegram.svg"
import Link from 'next/link'

const Footer =()=> {

  return (
    <>
      <div className="h-[280px] bg-black text-white p-[2rem] md:p-[4rem] font-fredoka flex flex-col justify-evenly items-center gap-[2rem]">
         <div className="flex justify-center w-[80%] gap-[5rem] items-center" >
            <div className=" flex flex-col gap-[2rem] items-center">
              {/*  CAN USE ROUTER TO NAVIGATE THROUGH DIFFERNT PAGES IN FUTURE */}
            <button className='f-list-items'>Contact Us</button>
            <button className='f-list-items'>Docs</button>
            <Link href={'https://twitter.com/BotsOfBtc'}>
            <Image className='f-list-items' width={39} height={30} src= {twit} alt="" />
            </Link>
            </div>
            
            <div className="flex flex-col gap-[2rem] items-center">
            <button className='f-list-items'>D-App (Coming Soon)</button>
            <button className='f-list-items'>Mint (Coming Soon)</button>
            <Link href={'https://t.me/botsofbtc'}>
            <Image className='bg-white rounded-full f-list-items' width={39} height={30} src={telegram} alt="" />
            </Link>
            </div>
         </div>


      </div>
    </>
  )
}
export default Footer