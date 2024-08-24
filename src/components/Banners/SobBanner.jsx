'use client'
import React, {useState , useContext, useEffect} from 'react'
import { getChainId, changeNetwork,addNetwork } from '@/utils/hooks'
import Image from '../../../node_modules/next/image'
import sob from "../../assets/sobdemo.png"
import { skibbidi } from '@/configs/config'
import {motion , AnimatePresence} from "framer-motion"
import Link from '../../../node_modules/next/link'
import MintCard from "../CARDS/MintCard"
import arrow from "../../assets/leftArrow.png"
import { AppContext } from '@/context/AppContext'
import { ethers } from '../../../node_modules/ethers/lib/index'
import { BOB_MAINNET } from '@/utils/constants'

const SobBanner = () => {
  const {mintStarted, getSupplyLeft, getCurrentRound, connectWallet, user, getUserMints, sobMint ,states, setSobMint , mintMulti} = useContext(AppContext);
  const [active , setActive] = useState(false);
  const [mintData , setMintData] = useState({})
  const [started , setStarted] = useState(false);
  const [loader , setLoader] = useState(false);
  const [chain , setChain] = useState(false);
  const activeVariants = {
    hidden: { opacity: 25, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
}
  const toggleActive=async(back)=>{
    if(!user.wallet){
      connectWallet();
      if(getChainId() != BOB_MAINNET[0].chainId){
        addNetwork(BOB_MAINNET)
      }
      return
    }
    if(!back){
      setLoader(true)
      let round = "Not Started";
      const st = await mintStarted();
      const left = await getSupplyLeft();
      const cRound= await getCurrentRound();
      const usrMint = await getUserMints();
      const num =parseInt(Number(usrMint));
      const cc =parseInt(Number(cRound));
      const ss = parseInt(Number(left));
      if(cc == 1){
        round = "WL Round"
      } else if(cc==2){
        round = "Public Round"
      }
      setStarted(st);
      setMintData({...mintData, supplyLeft:ss , currentRound: round, userMints:num});
      setLoader(false)
    }
    if(active){
      setActive(false);
    }
    if(!active){
      setActive(true)
    }
  }

  const inputHandle=async(e)=>{
    try {
      const nm = parseInt(Number(e.target.value));
      if(mintData.currentRound && mintData.currentRound === "WL Round"){
        if(nm > 15){
          alert("Cannot be more thn 15 for WL round")
          return
        }
      }
      if(mintData.currentRound === "Public Round"){
        if(nm > 10){
          alert("Cannot be more thn 10 for Public Round")
          return
        }
      }
      setSobMint({...sobMint, amount:nm})
      console.log(sobMint);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(getChainId() === '0xed88'){
      setChain(true);
    }
  }, [user.wallet])
  

  const mint = async()=>{
    try {
      const mint = await mintMulti();
    } catch (error) {
      console.log(error);
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
      <div className={`h-full w-full flex justify-center items-center py-[2rem] bg-[#231F20] border-b border-[#E5BD19] ${active ? "pb-[1rem]":""} ${states.mobileMenuOpen ? "blur-md" : ""} `}>
      <div className='w-[90%] gap-[1rem] flex flex-col items-center'>
            <div className={`flex flex-col justify-between items-center  gap-[0.7rem]`}>
                <h1 className=' font-fredoka font-[700] text-[25px] lg:text-[48px] md:text-[40px] text-[#E5BD19] cursor-pointer'>SKIBBIDIES OF BITCOIN</h1>
                {/*<p className=' font-fredoka font-[600] text-[24px] text-white'> MINT IN</p>
                <p  className=' font-fredoka font-[700] text-[24px] text-white'>00:00:00</p>*/}
            </div>
            <motion.div
            key={active}
            className='flex w-full h-full justify-center items-center'
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={activeVariants}
            >
            <div className='md:w-[95%] lg:w-[85%] md:h-full flex flex-col md:flex-row-reverse gap-[1.5rem] items-center'>
              <div className='flex justify-center md:px-[2rem]'>
                <div className='flex w-[90%] md:w-[12rem] lg:w-[27rem]'>
                    <Image src={sob} className=" object-cover rounded-2xl transition duration-500 ease-linear transform hover:scale-105" alt="Skibbidies Of Bitcoin" height={1000} width={1000}/>
                </div>
              </div>
              <div className='text-white font-nunito md:h-full gap-[2rem] lg:gap-[4rem] flex justify-between flex-col items-center uppercase w-[90%]'>
                <div className='flex justify-center flex-col'>
                  <h2 className='text-[15px] pt-[2rem] lg:text-[15px]'>{skibbidi.h1}</h2>
                  <Link href={'https://botsofbtc.notion.site/Skibbidies-Of-Bitcoin-SOB-815d721087614f2e82cdb09dc35a032b?pvs=4'} target={'_blank'}>
                  <p className='text-[15px] pt-[15px] md:pt-[25px] lg:text-[20px] cursor-pointer hover:text-[#E5BD19] transition duration-500 ease-linear transform hover:scale-105 hover:ml-[5px]'>Learn More ...</p>
                  </Link>
                </div>
                <div className='flex flex-col items-center justify-between'>
                  <Link href={"https://element.market/collections/skibbidies-of-bitcoin-1"} target={'_blank'}>
                  <p className=' font-fredoka font-[700] text-[30px] bg-[#E5BD19] hover:text-[#E5BD19] hover:bg-black hover:border cursor-pointer border-[#E5BD19] text-black p-[10px] rounded-2xl transition duration-400 ease-linear transform hover:scale-105'>BUY NOW</p>
                  </Link>
                </div>
              </div>
            </div>
            </motion.div>
        </div>
        </div> 
    
    </motion.div>
    </AnimatePresence>
    </>
  )
}

export default SobBanner