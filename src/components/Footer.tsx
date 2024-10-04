'use client'
import React from 'react'
import twit from '../assets/Vector1.svg'
import Image from 'next/image'
import telegram from "../assets/telegram.svg"
import Link from 'next/link'

const Footer:React.FC = () => {
  const al =()=>{
    alert ("coming soon")
  }
  const tnc =()=>{
    alert ("Announcements soon")
  }
  return (
    <div className='bg-[#231F20] p-[2rem] md:p-[4rem] text-white flex flex-col justify-center items-center gap-[2rem]'>
        <div className=' grid gap-[4rem] items-center w-[80%] md:w-[50%] lg:w-[30%] justify-items-center justify-center grid-cols-2'>
          <div className='flex flex-col gap-[1rem]'>
            <Link href={'https://botsofbtc.notion.site/BOTS-OF-BITCOIN-27ab822513f5459d861d07a6f11271ba?pvs=4'} target="_blank">
            <p className='transition duration-500 ease-linear transform hover:scale-105'>Docs</p>
            </Link>
            <Link href={'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzBlBpMpZDSdtjWSkPzpMHPSjGlmrWHKpMSmVSLLHVQKJGcDPvgsNvcCkPLtnQjVnBjCgKk'} target={'_blank'} >
            <p className='transition duration-500 ease-linear transform hover:scale-105'>Contact Us</p>
            </Link>
            <Link href={'/faq'} target="_blank">
            <p className='transition duration-500 ease-linear transform hover:scale-105'>FAQs</p>
            </Link>
            <Link href={'https://t.me/botsofbtc'} target="_blank">
            <Image src={telegram} className={`text-white bg-white rounded-full transition duration-500 ease-linear transform hover:scale-110`} height={30} width={30} alt="Telegram"/>
            </Link>
          </div>

          <div className='flex flex-col gap-[1rem]'>
            <Link href={'/mint'} target={'_blank'}>
            <p className='transition duration-500 ease-linear transform cursor-pointer hover:scale-105'>Mint BOB</p>
            </Link>

            <Link href={'/rampage'} target={'_blank'}>
            <p className='transition duration-500 ease-linear transform cursor-pointer hover:scale-105' onClick={()=>al()}>Rampage</p>
            </Link>
            <Link href={'https://twitter.com/BotsOfBtc'} target="_blank">
            <Image src={twit} height={30} width={30} className={`transition duration-500 ease-linear transform hover:scale-110`} alt="Twitter / X"/>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Footer