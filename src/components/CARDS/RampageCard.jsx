"use client"
import React from 'react'
import Image from '../../../node_modules/next/image'
import copyImg from "../../assets/copy.svg"
import DailyLogin from "@/components/Activities/DailyLogin.jsx"
import LotterySelectZone from "@/components/Activities/LotterySelectZone.jsx" 
import l from "../../assets/leftArrow.png"
import r from "../../assets/rightArrow.png"
import SwapAc from "../Activities/SwapAc"
import {motion,AnimatePresence} from "framer-motion"
import ClaimSpice from "../../components/CARDS/ClaimSpice"
const RampageCard = ({rampageData,copyToClipboard,dailyMine, loaders,states , setStates,variants}) => {

    const goLeft =()=>{
        if(states.acNo == 0){
            return
        }
        const a = states.acNo;
        setStates({...states,acNo:a-1})
    }

    const goRight=()=>{
        if(states.acNo == 2){
            return
        }
        const a = states.acNo;
        setStates({...states,acNo:a+1})
    }

    const toggleActivites =()=>{
        if(states.activities){
            setStates({...states,activities:false})
        } else {
            setStates({...states,activities:true})
        }
    }
 
    return (
        <div className='flex flex-col items-center w-full h-full'>
            <div className='w-full h-full flex items-center justify-center gap-[1rem] flex-col pb-[1rem]'>
                <h1 className='text-[38px] md:text-[60px] lg:text-[70px] font-fredoka text-[#E5BD19] font-bold'>RAMPAGE</h1>
                <div className='font-fredoka text-white px-[0.9rem] text-[15px]'>
                    Rampage is the Incentivised Phase of Launch for BOTS OF BITCOIN. Collect $RP , Fusion S3 Spice & many more as we launch our incentivised services.Users can complete various taks or simply use our services to get a load of Platform points from Us , Build On Bitcoin & partner projects. S3 Spice follows a value based caluclation for correct distribution of spice.
                </div>
            </div>

            <div className='flex w-full h-full flex-col items-center py-[0.5rem] justify-center'>
                <div className='flex w-[95%] border-white border md:w-[65%] lg:w-[45%] rounded-2xl p-[10px] h-full justify-center items-center bg-[#E5BD19]'>
                    <div className='w-full font-fredoka rounded-2xl pl-[0.5rem] md:pl-[2rem] md:text-[22px] text-black h-full py-[0.4rem] gap-[7px] flex flex-col'>
                        <div>Username : <span className='font-nunito'>{rampageData.userName ? <>{rampageData.userName.trim(0,10)}</> : "Loading ..."}</span></div>
                        <div>BOBs Held : <span className='font-nunito'>{rampageData.bobHeld ? <>{rampageData.bobHeld}</>: "0"} BOB</span></div>
                        <div>SOBs Held : <span className='font-nunito'>{rampageData.skibHeld ? <>{rampageData.skibHeld}</>: "0"} SOB</span></div>
                        <div>RP Balances : <span className='font-nunito'>{rampageData.userPoints ? <>{rampageData.userPoints}</> :"Loading ..."} $RP</span></div>
                        <div>RP Per Referal : <span className='font-nunito'>{rampageData.pointPerRef ? <>{rampageData.pointPerRef}</>: "0"} RP </span></div>
                        <div>Your Total Referals : <span className='font-nunito'>{rampageData.totalRef ? <>{rampageData.totalRef}</>:"0"} Users </span></div>
                        <div className='flex justify-center items-center flex-col'>Your Referal Link : <span onClick={()=>copyToClipboard()} className='bg-[#352f31] div-[5px] text-[#E5BD19] cursor-pointer text-[14px] flex items-center px-[10px] justify-between w-[90%] md:w-[60%] rounded-lg'>{`https://botsofbtc.com/rampage?...`} <Image src={copyImg} height={30} width={30} alt=""/> </span></div>
                    </div>
                </div>

                <div className='w-full h-full flex justify-center items-center pt-[1rem] md:hidden'>
                    <button onClick={()=>toggleActivites()} className='bg-black flex justify-center items-center px-[15px] py-[4px] border-[3px] text-[#E5BD19] font-fredoka font-extrabold stroke-black rounded-full border-[#E5BD19] text-[22px] md:text-[28px]'>{states.activities ? "Close":"Show Activites"}</button>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center w-full h-full'>
                
                {/*Mobile*/}
                { states.activities ? 
                <div className='flex flex-col md:hidden justify-center gap-[10px] items-center w-full h-full overflow-y-scroll'>
                    <div className='w-[90%] md:w-[60%] lg:w-[48%] h-full flex justify-between'>
                       <button className='text-white md:ml-[30px] flex' onClick={()=> goLeft()}><Image src={l} height={30} width={30} alt="pcbutton" className="hover:scale-125"/></button>
                       <button className='text-white md:mr-[30px] flex' onClick={()=> goRight()}><Image src={r} height={30} width={30} alt="pcbutton" className="hover:scale-125"/></button>
                    </div>

                    <AnimatePresence initial={false}>
                        <motion.div
                            key={states.acNo}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='w-full h-full'
                        >
                    {states.acNo == 0 ? <ClaimSpice/> :""} 
                    {states.acNo == 1 ? <DailyLogin dailyMine={dailyMine} data={rampageData} loaders={loaders}/> :""}
                    {states.acNo == 2 ? <SwapAc/> :""}
                    {states.acNo == 3 ? <LotterySelectZone/> :""}
                    {states.acNo == 4 ? <DailyLogin/> :""}
                    {states.acNo == 5 ? <DailyLogin/> :""}
                    {states.acNo == 6 ? <DailyLogin/> :""}
                    {states.acNo == 7 ? <DailyLogin/> :""}
                    {states.acNo == 8 ? <DailyLogin/> :""}
                    </motion.div>
                    </AnimatePresence>
                    
                </div> :""}

                {/* Desktop */}
                <div className='md:flex hidden flex-col justify-center gap-[10px] items-center w-full h-full'>
                    <div className='w-[90%] md:w-[60%] lg:w-[48%] h-full flex justify-between'>
                       <button className='text-white md:ml-[30px] flex' onClick={()=> goLeft()}><Image src={l} height={30} width={30} alt="pcbutton" className="hover:scale-125"/></button>
                       <button className='text-white md:mr-[30px] flex' onClick={()=> goRight()}><Image src={r} height={30} width={30} alt="pcbutton" className="hover:scale-125"/></button>
                    </div>

                    <AnimatePresence initial={false}>
                        <motion.div
                            key={states.acNo}
                            initial={{ x: 300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='w-full h-full'
                        >
                    {states.acNo == 0 ? <ClaimSpice/> :""} 
                    {states.acNo == 1 ? <DailyLogin dailyMine={dailyMine} data={rampageData} loaders={loaders}/> :""}
                    {states.acNo == 2 ? <SwapAc/> :""}
                    {states.acNo == 3 ? <LotterySelectZone/> :""}
                    {states.acNo == 4 ? <DailyLogin/> :""}
                    {states.acNo == 4 ? <DailyLogin/> :""}
                    {states.acNo == 5 ? <DailyLogin/> :""}
                    {states.acNo == 6 ? <DailyLogin/> :""}
                    {states.acNo == 7 ? <DailyLogin/> :""}
                    </motion.div>
                    </AnimatePresence>
                    
                </div>
            </div>
        </div>
  )
}

export default RampageCard