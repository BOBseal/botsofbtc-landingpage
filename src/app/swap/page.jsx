'use client'
import React,{useState} from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from '@/components/Footer'
import {AnimatePresence , motion} from 'framer-motion'
import { partnerInfo } from '@/configs/config'
import Image from '../../../node_modules/next/image'

const Page = () => {
    return(
    <>
    <Navbar/>
    <div className='flex h-full min-h-[49rem] md:min-h-[53rem] gap-[2rem] justify-between pt-[3rem] pb-[3rem] items-center bg-bg2 bg-cover flex-col p-[1rem] md:p-[4rem]'>      
        <h1 className='text-[40px] font-fredoka text-black font-[700]'>SWAP</h1>
        <div className='w-[90%] lg:w-[60%] h-[38rem] rounded-xl bg-abstractBg bg-cover border-[5px] flex-col flex justify-evenly'>
            {/* MAKE THIS */}
        </div>

        <p className='text-[15px] font-fredoka flex items-center bg-black text-white p-[5px] rounded-2xl '>Powered By : <Image src={partnerInfo[1].logo} height={100} width={200}/> </p>
    </div>
    <Footer/>
    </>
    )
}

export default Page