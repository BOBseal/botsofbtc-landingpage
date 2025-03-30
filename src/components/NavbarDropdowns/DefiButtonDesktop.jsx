'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const DefiHover = ({toggleFunction}) => {
    const toggleAndAlert=()=>{
        try {
            alert("Coming Soon");
            toggleFunction()
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='h-full flex items-center justify-center w-full '>
        <div className='flex w-full font-fredoka text-[20px] h-full text-[#E5BD19] items-center flex-col gap-[5px] py-[20px]'>
            <Link href={"/swap"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>DEX - IceCreamSwap</button>
            </Link>
            <Link href={"/aave-vaults"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>AAVE Lending Vaults</button>
            </Link>
            <Link href={"/beth"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>BETH - BITCOIN-ETH Vault</button>
            </Link>
        </div>
    </div>
  )
}

export default DefiHover