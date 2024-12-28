'use client'
import React,{useContext} from 'react'
import Image from '../../node_modules/next/image'
import img1 from "../assets/haha.gif"
import arrow from "../assets/rightArrow.png"
import { AppContext } from '@/context/AppContext'
import {motion , AnimatePresence} from "framer-motion"
import Link from 'next/link'
import bot5 from "../assets/5.png"
import goto from "../assets/button_goto.svg"

//import botsbanner from "../assets/banner_1_fill.svg"
const HM = () => {
    const {states} = useContext(AppContext);
 const st = {
    main : `flex flex-col gap-[0.5rem] md:gap-[0.5rem] justify-between items-center h-full pt-[10px] pb-[20px] bg-gradient-to-b from-[#E5BD19] to-[#FFEB99]`,
    h1:`md:text-[96px] lg:text-[130px] text-[38px] font-extrabold drop-shadow-2xl font-fredoka text-black font-outline-1`,
    imgBox:`flex flex-col md:flex-row-reverse justify-center items-center md:justify-between w-[85%] md:w-[80%] lg:w-[55%] gap-[2rem]`,
    img:`w-[250px] md:w-[450px] lg:w-[500px] object-cover drop-shadow-2xl transition duration-500 ease-linear transform hover:scale-105`,
    h2:`md:text-[24px] uppercase text-[18px] leading-[30px] font-nunito text-black drop-shadow-2xl`
 } 
  
 return (<>
    <AnimatePresence>
        <motion.div
          initial ={{opacity:60 , y:-30 }}
         animate={{
          opacity:1,
          y:0
         }}
         transition={{ ease: "easeInOut", duration: 0.8 }}
        >


    <div className={`${st.main} ${states.mobileMenuOpen ? "blur-md" : ""}`} >
        <div>
            <h1 className={`${st.h1} font-`}>BOTS OF BITCOIN</h1>
        </div>
        <div className='flex w-full h-full px-[0.4rem] justify-center items-center pb-[1rem]'>
                    <div className='bg-[#231F20] md:w-[90%] lg:w-[55%] w-[90%] p-[2px] rounded-xl h-full'>
                        <div className='bg-bubbles flex p-[5px] justify-between bg-center rounded-xl border border-[#E5BD19] bg-cover bg-no-repeat md:h-[10rem] h-[8rem] flex w-full'>
                            <div className='w-full md:w-[65%] flex flex-col items-center pt-[1rem]'>
                                <div className='flex'>
                                <Link href={'http://fusion.gobob.xyz/?refCode=lqh3jh'} target={'_blank'}>
                                <div className='bg-black hover:scale-105 px-[10px] py-[3px] flex gap-[10px] rounded-full justify-center items-center cursor-pointer'>
                                    <h1 className='text-[20px] md:text-[25px] font-fredoka text-white'>Join Fusion</h1>
                                    
                                    <div className='flex items-center'>
                                        <Image src={goto} alt='button' height={13} width={13}/>
                                    </div>
                                    
                                </div>
                                </Link>

                                <Link href={'https://thedapplist.com/project/bots-of-bitcoin'} target={'_blank'}>
                                <div className='bg-black hover:scale-105 px-[10px] py-[3px] flex gap-[10px] rounded-full justify-center items-center cursor-pointer'>
                                    <h1 className='text-[20px] md:text-[25px] font-fredoka text-white'>DappList</h1>
                                    
                                    <div className='flex items-center'>
                                        <Image src={goto} alt='button' height={13} width={13}/>
                                    </div>
                                    
                                </div>
                                </Link>
                                </div>
                                <div className='flex w-full h-full items-center justify-center'>
                                    <Link href={'/mint'} target={'_blank'}>
                                
                                    <h2 className='text-[#FFFF33] hover:scale-105 cursor-pointer bg-black px-[5px] rounded-full text-stroke-15 md:text-stroke-1 border-r border-[#FFFF33] border-b text-[27px] md:text-[38px] lg:text-[42px] font-extrabold font-nunito'>
                                        Mint & Claim Spice
                                    </h2>
                                    </Link>
                                </div>
                                
                            </div>
                            <div className='hidden md:w-[35%] md:flex justify-center items-center'>
                                <div className='w-full h-full flex items-center justify-center'>
                                    <Image alt="bot-chan" src={bot5} height={200} width={200} className='object-cover hover:scale-105 cursor-pointer border-[2px] border-[#E5BD19] rounded-full w-[120px] h-[120px] md:w-[150px] md:h-[150px]'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
        <div className={`${st.imgBox}`}>
            <Image src={img1} height={1000} width={1000} className={`${st.img}`} alt="Bots Of Bitcoin"/>
            <div className={st.h2}>
            BOTS OF BITCOIN is a Collection of 10k Unique Revenue Sharing BOT PFPs with Utility on BOB. Mint one and Earn 6.9% Royalties on your Minted PFPs Forever and a Bonus Airdrop of Platform Tokens!. Holders also can claim Daily Spice for Build On Bitcoin (BOB) Fusion Season 3.
            <div className=' text-[#E5BD19] md:pt-[15px]  hover:scale-105 flex flex-col justify-center items-center pt-[20px] md:pt-[20px]'>
                <Link href={'/mint'} target={'_blank'}><button className='font-nunito rounded-2xl text-[22px] text-[28px] border shadow-lg border-[#E5BD19] px-[20px] lg:px-[40px] py-[6px] font-800 bg-[#231F20]'>MINT 0.005 ETH</button></Link>
            </div>
            </div>    
        </div>
    </div>
    
    </motion.div>
    </AnimatePresence>
    </>
  )
}

export default HM