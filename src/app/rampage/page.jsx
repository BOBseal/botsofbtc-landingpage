'use client'
import React,{useContext , useEffect, useState} from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
import Image from '../../../node_modules/next/image'
import img from "../../assets/lotterypage.png"
import rimg from "../../assets/rampagelogin.png"

const Page = () => {
  const {user, connectWallet} = useContext(AppContext);

  return (
    <>
    <Navbar/>
    <div className=' bg-bg3 bg-no-repeat bg-cover w-full py-[1rem]'>
        <div className='h-[45rem] w-full flex flex-col items-center'>
            {user.wallet ? 
            <div className='flex flex-col items-center'>
              {user.correctChain ? 
              <div className='flex flex-col items-center h-full w-full'>
                  <div>
                     <Image src={rimg} height={400} width={400} alt="RAMPAGE" className={`object-cover w-[300px] h-[300px] md:w-[400px]`}/>   
                  </div>

                  {}
              </div>:
              <div className={`h-full w-[90%] flex flex-col items-center justify-evenly pb-[2rem]`}>
              <div className='flex p-[10px]'>
                 <Image src={img} height={400} width={400} alt="Connect Wallet" className={`object-cover w-[380px] h-[380px] md:w-[400px]`}/>
              </div>
              <div className='text-white text-center rounded-lg text-[20px] font-bold flex flex-col items-center gap-[1rem] font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] p-[1rem]'>
                <p className='animate-pulse'>WRONG NETWORK DETECTED !</p>
                <p className='animate-pulse'>SWITCH TO BOB MAINNET & REFRESH THIS PAGE.</p>
              </div>
          </div>  
            }
            </div>:
            <div className={`h-full w-full flex flex-col items-center justify-evenly pb-[2rem]`}>
                <div className='flex p-[10px]'>
                   <Image src={img} height={400} width={400} alt="Connect Wallet" className={`object-cover w-[380px] h-[380px] md:w-[400px]`}/>
                </div>
                <div className='text-white -mt-[2rem] rounded-lg text-[20px] font-bold font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] p-[1rem]'>
                  <p className='animate-pulse'>OOPS WALLET NOT DETECTED !</p>
                </div>
                <div onClick={()=>connectWallet()} className='text-white rounded-lg cursor-pointer text-[20px] font-bold font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] p-[1rem]'>
                  <div>CONNECT WALLET</div>
                </div>
            </div>
            }
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Page