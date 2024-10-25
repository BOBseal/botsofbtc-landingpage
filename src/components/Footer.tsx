'use client'
import React from 'react'
import twit from '../assets/Vector1.svg'
import Image from 'next/image'
import telegram from "../assets/telegram.svg"
import Link from 'next/link'
import dis from "../assets/discord.svg";

const Footer:React.FC = () => {
  

  return (
    <div className='bg-[#231F20] p-[2rem] text-white flex flex-col justify-between items-center gap-[2rem]'>
        <div className=' grid gap-[4rem] items-center w-[80%] md:w-[50%] lg:w-[30%] justify-items-center justify-center grid-cols-2'>
          <div className='flex flex-col gap-[1rem]'>
            <Link href={'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzBlBpMpZDSdtjWSkPzpMHPSjGlmrWHKpMSmVSLLHVQKJGcDPvgsNvcCkPLtnQjVnBjCgKk'} target={'_blank'} >
            <p className='transition duration-500 ease-linear transform hover:scale-105'>Contact Us</p>
            </Link>
            <Link href={'/faq'} target="_blank">
            <p className='transition duration-500 ease-linear transform hover:scale-105'>FAQs</p>
            </Link>
          </div>

          <div className='flex flex-col gap-[1rem]'>
            <Link href={'/mint'} target={'_blank'}>
            <p className='transition duration-500 ease-linear transform cursor-pointer hover:scale-105'>Mint BOB</p>
            </Link>

            <Link href={'/rampage'} target={'_blank'}>
            <p className='transition duration-500 ease-linear transform cursor-pointer hover:scale-105' >Rampage</p>
            </Link>
          </div>
        </div>
        <div className=' flex flex-row justify-evenly w-full md:w-[50%]'>
            <Link href={'https://t.me/botsofbtc'} target="_blank">
              <Image src={telegram} className={`text-white bg-white rounded-full transition duration-500 ease-linear transform hover:scale-110`} height={30} width={30} alt="Telegram"/>
            </Link>
            <Link href={'https://twitter.com/BotsOfBtc'} target="_blank">
            <Image src={twit} height={30} width={30} className={`transition duration-500 ease-linear transform hover:scale-110`} alt="Twitter / X"/>
            </Link>
            <Link href={'https://discord.gg/FT8EGEFaVA'} target="_blank">
            <Image src={dis} height={35} width={35} className={`transition duration-500 ease-linear transform hover:scale-110`} alt="Twitter / X"/>
            </Link>
          </div>
    </div>
  )
}

export default Footer