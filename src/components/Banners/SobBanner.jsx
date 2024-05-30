'use client'
import React, {useState , useContext} from 'react'
import Image from '../../../node_modules/next/image'
import sob from "../../assets/sobdemo.png"
import { skibbidi } from '@/configs/config'
import {motion , AnimatePresence} from "framer-motion"
import Link from '../../../node_modules/next/link'
import MintCard from "../CARDS/MintCard"
import arrow from "../../assets/leftArrow.png"


const SobBanner = () => {
  const [active , setActive] = useState(false)
  const activeVariants = {
    hidden: { opacity: 25, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
}
  const toggleActive=()=>{
    if(active){
      setActive(false);
    }
    if(!active){
      setActive(true)
    }
  }
  return (
    <>
    <AnimatePresence>
        <motion.div
          initial ={{opacity:60 , y:-30 }}
         animate={{
          opacity:1,
          y:0
         }}
         transition={{ ease: "easeInOut", duration: 0.8 }}
        >
      <div className={`h-full w-full flex justify-center items-center py-[2rem] bg-[#231F20] border-b border-[#E5BD19] ${active ? "pb-[1rem]":""} `}>
      <div className='w-[90%] gap-[1rem] flex flex-col items-center'>
            <div className={`flex flex-col justify-between items-center  gap-[0.7rem]`}>
                <h1 className=' font-fredoka font-[700] text-[28px] lg:text-[78px] md:text-[55px] text-[#E5BD19] cursor-pointer'>SKIBBIDIES OF BITCOIN</h1>
                <h1 className=' -mt-[10px] font-fredoka font-[700] text-[28px] lg:text-[78px] md:text-[55px] text-[#E5BD19] cursor-pointer'>(SOB)</h1>
                {/*<p className=' font-fredoka font-[600] text-[24px] text-white'> MINT IN</p>
                <p  className=' font-fredoka font-[700] text-[24px] text-white'>00:00:00</p>*/}
            </div>
            
            {!active ?
            <motion.div
            key={active}
            className='flex w-full h-full justify-center items-center'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={activeVariants}
            >
            <div className='md:w-[95%] lg:w-[65%] md:h-full flex flex-col md:flex-row-reverse gap-[1.5rem] items-center'>
              <div className='flex justify-center md:px-[2rem]'>
                <div className='flex w-[90%] md:w-[22rem] lg:w-[27rem]'>
                    <Image src={sob} className=" object-cover rounded-2xl transition duration-500 ease-linear transform hover:scale-105" alt="Skibbidies Of Bitcoin" height={1000} width={1000}/>
                </div>
              </div>
              <div className='text-white font-nunito md:h-full gap-[2rem] lg:gap-[4rem] flex justify-between flex-col items-center uppercase w-[90%]'>
                <div className='flex justify-center flex-col'>
                  <h2 className='text-[15px] pt-[2rem] lg:text-[20px]'>{skibbidi.h1}</h2>
                  <Link href={'https://botsofbtc.notion.site/Skibbidies-Of-Bitcoin-SOB-815d721087614f2e82cdb09dc35a032b?pvs=4'} target={'_blank'}>
                  <p className='text-[15px] pt-[15px] md:pt-[25px] lg:text-[20px] cursor-pointer hover:text-[#E5BD19] transition duration-500 ease-linear transform hover:scale-105 hover:ml-[5px]'>Learn More ...</p>
                  </Link>
                </div>
                <div className='flex flex-col items-center justify-between'>
                  <p onClick={()=> toggleActive()} className=' font-fredoka font-[700] text-[30px] bg-[#E5BD19] hover:text-[#E5BD19] hover:bg-black hover:border cursor-pointer border-[#E5BD19] text-black p-[10px] rounded-2xl transition duration-400 ease-linear transform hover:scale-105'>MINT NOW</p>
                </div>
              </div>
            </div>
            </motion.div>
             : 
            <motion.div
            className='flex flex-col justify-between w-full items-center'
            key={active}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={activeVariants}
            >
            <div className='flex flex-col justify-between w-full items-center'>
                <div className='w-full gap-2 flex flex-col-reverse h-full justify-center items-center'>
                  <div className='w-[90%] lg:w-[50%]'>
                  <Image onClick={()=>toggleActive()} className='mt-[20px] md:mt-[30px]' src={arrow} width={24} height={24} alt="arrow"/>
                  </div>
                  <MintCard/>
                </div>
            </div>
            </motion.div>
            }

        </div>
        </div> 
    
    </motion.div>
    </AnimatePresence>
    </>
  )
}

export default SobBanner