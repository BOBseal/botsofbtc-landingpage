'use client'
import React, {useContext} from 'react'
import Image from '../../node_modules/next/image'
import { partnerInfo } from '@/configs/config'
import { AppContext } from '@/context/AppContext'
import { AnimatePresence ,  motion} from 'framer-motion'

const Partners = () => {
  const {states} = useContext(AppContext)

  return (
    <>
    <AnimatePresence>
        <motion.div
          initial ={{opacity:60 , y:-50 }}
         animate={{
          opacity:1,
          y:0
         }}
         transition={{ ease: "easeInOut", duration: 0.8 }}
        >
    <div className={`bg-[#231F20] flex p-[2rem] md:pb-[4rem] md:pt-[3rem] gap-[2rem] flex-col items-center ${states.mobileMenuOpen ? "blur-lg" : ""}`}>
      <p className='text-white font-nunito underline underline-offset-3'>Powered by</p>
      <div className='w-full flex gap-[1rem] justify-center'>
        {partnerInfo.map((o,k)=>(
          <Image src={o.logo} key={k} width={180} height={180} alt="BOB Logo" className='w-[100px] md:w-[180px]'/>
        ))}
      </div>
    </div>
    </motion.div>
    </AnimatePresence>
    </>
  )
}

export default Partners
