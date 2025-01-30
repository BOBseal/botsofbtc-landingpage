'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const NFTHover = ({toggleFunction}) => {
  return (
    <div className='h-full flex items-center justify-center w-full '>
        <div className='flex w-full font-fredoka text-[20px] h-full text-[#E5BD19] items-center flex-col gap-[5px] py-[20px]'>
            <Link href={"https://botsofbtc.notion.site/BOTS-OF-BITCOIN-PFPs-f493d10470984ad2beab0c2b7396893f"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>BOTS OF BITCOIN (BOBs)</button>
            </Link>
            <Link href={"/mint"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>Get BOB NFTs</button>
            </Link>
            <Link href={"https://botsofbtc.notion.site/Skibbidies-Of-Bitcoin-SOB-f17af1226a034468b23fd82ba08e982c"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>Skibbidies Of Bitcoin (SOBs)</button>
            </Link>
            <Link href={"https://element.market/collections/skibbidies-of-bitcoin-1"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>Get SOB NFTs</button>
            </Link>
            <Link href={"/stake"} target={'_blank'}>
            <button onClick={()=>toggleFunction()} className='hover:scale-105 hover:underline'>SOB Staking V1.0</button>
            </Link>
        </div>
    </div>
  )
}

export default NFTHover