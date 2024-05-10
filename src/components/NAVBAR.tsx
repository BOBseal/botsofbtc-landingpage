'use client'
import React,{useContext, useState} from 'react'
import Image from 'next/image'
import lgo from "../assets/dp.jpg"
import menu from "../assets/threelinemenu.svg"
import { AppContext } from '@/context/AppContext'
import { AnimatePresence , motion } from 'framer-motion'

interface NavbarProps {
  openMobileMenu: () => void;
  userWallet : String;
  connectWallet : () => void;
}

const Navbar: React.FC<NavbarProps> = () => {
  const {connectWallet , user, states, setStates, openMobileMenu} = useContext(AppContext);
  const al =()=>{
    alert("Coming Soon");
  }
  return (
    <div className="flex justify-between items-center border-b-[2px] border-black bg-[#E5BD19] w-full p-[0.7rem] lg:pr-[6rem] lg:pl-[6rem]">
        <div className='flex justify-center gap-[0.5rem] md:gap-[1rem] lg:gap-[1.6rem] items-center'>
          <div className='h-[50px] w-[50px] md:h-[70px] md:w-[70px]'>
              <Image src={lgo} height={1000} width={1000} alt="logo" className='rounded-full border border-black object-cover'/>
          </div>
          <div> 
            <h1 className='font-nunito text-[23px] md:text-[35px] lg:text-[45px] font-[700] hidden md:flex'>BOTS OF BITCOIN</h1>
          </div>
        </div>

        <div className="md:hidden flex">
          {!states.mobileMenuOpen ? <button className='h-[70px] w-[70px] md:h-[80px] md:w-[80px] cursor-pointer' onClick={()=>openMobileMenu()}>
            <Image src={menu} height={1000} width={1000} alt="menu" className='object-cover'/>
          </button> : 
          <AnimatePresence>
            <motion.div
            initial={{ opacity: 1}}
            animate={{ opacity: 1 }}
            transition={{
              ease: "linear",
              duration: 2,
              y: { duration: 1 }
            }}
            exit={{ opacity: 0}}
            >
             <MobileNav openMobileMenu={openMobileMenu} userWallet={user.wallet} connectWallet={connectWallet}/>
            </motion.div>
          </AnimatePresence>
          }
        </div>
        
        <div className ="md:flex gap-[30px] hidden ">
          <button className='text-[22px] font-nunito font-semibold hover:scale-105' onClick={()=> al()}>Mint</button>
          <button className='text-[22px] font-nunito font-semibold hover:scale-105' onClick={()=> al()}>Lottery</button>
          <button className='text-[22px] font-nunito font-semibold hover:scale-105' onClick={()=> al()}>Vaults</button>
          <button className='text-[22px] font-nunito font-semibold hover:scale-105'>Docs</button>
        </div>

        <button onClick={()=> connectWallet()} className='md:flex hidden text-[22px] font-nunito p-[10px] text-white font-semibold bg-black rounded-full'>
          {user.wallet ? <>0x...{user.wallet.slice(38)}</>:"Log In"}
        </button>
    </div>
  )
}


const MobileNav :React.FC <NavbarProps>=({openMobileMenu , userWallet, connectWallet})=>{
  const al =()=>{
    alert("Coming Soon");
  }
  return(
    <div className='absolute md:hidden top-0 left-0 bg-[#E5BD19] h-[35rem] w-full z-50'>
      <div className='flex flex-col h-full border-b-[20px] border-black w-full justify-between items-center'>
        <div className='flex flex-col h-[80%] justify-center items-center gap-[2rem]'>
          <p onClick={()=> al()} className=' font-nunito text-[22px]'>Mint</p>
          <p onClick={()=> al()} className=' font-nunito text-[22px]'>Lottery</p>
          <p onClick={()=> al()} className=' font-nunito text-[22px]'>Vaults</p>
          <p onClick={()=> al()} className=' font-nunito text-[22px]'>Docs</p>
          <button onClick={()=>connectWallet()} className=' font-nunito text-[22px]'>{userWallet ? <>0x...{userWallet.slice(37)}</>:"Log In"}</button>
        </div>
        <button className='h-[4rem] font-nunito text-[22px] p-[1rem] w-[12rem] justify-center flex ' onClick={()=>openMobileMenu()}>CLOSE</button>
      </div>
    </div>
  )
}

export default Navbar