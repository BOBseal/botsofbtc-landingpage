'use client'
import React, { useState } from 'react'
import {unixToGeneralTime} from "../utils/hooks"

const StakeDashboard = ({userData,states , claimY, claiming, unstake, unstaking, unwrap, unwrapping}) => {
    const [input , setInput] = useState(0);

    const unwrapHandler = async()=>{
        try {
            if(input != 0){
                unwrap(input);
            } else {
                alert("Amount Cannot be 0")
            }        
        } catch (error) {
            console.log(error);
        }
    }

    const inputHandler = (e)=>{
        const num = Math.floor(e.target.value)
        setInput(num);
    }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
        <div className='text-black  gap-3 w-full h-full pt-[1.5rem] bg-[#E5BD19] flex flex-col items-center'>
            <div className='w-[90%] bg-[#c09b09] p-2 font-nunito rounded-2xl md:w-[48%] lg:w-[35%] h-full flex flex-col items-start'>
            <h3>RP Balances : {userData.userRp ? userData.userRp : 0} RP</h3>
            <h3>wRP Balances : { userData.wrpBalance ? userData.wrpBalance.slice(0,10):0.00} wRP</h3>
            <h4>Total Staked : {userData.activeStaked ? userData.activeStaked : 0} SOBs</h4>
            <h4>Total Claimable : {userData.totalClaimable ? userData.totalClaimable.slice(0,10) : 0.00} wRP</h4>
            </div>
            <h2 className='font-nunito'>Convert wRP to RP for Spice Calculation</h2>
            <div className='w-[90%] md:w-[48%] flex justify-between items-center flex-col gap-[0.2rem] lg:w-[35%] md:flex-row '>
                    <input type={'number'} onChange={(e)=>inputHandler(e)} className={`bg-[#231F20] h-[2.7rem] md:w-[65%] rounded-md text-white`} placeholder="Type Amount"/>
                    <div className='flex w-full justify-center p-[1rem] md:w-[35%]'>
                        <button onClick={()=>unwrapHandler()} className='bg-[#231F20] text-white font-fredoka px-[14px] rounded-2xl cursor-pointer hover:scale-105 py-[4px]'>{unwrapping ? "UnWrapping" :"UnWrap"}</button>
                    </div>
            </div>
        </div>
        <h1 className='pt-[1rem] text-[28px] font-fredoka font-bold text-[#E5BD19]'>Your Stakes</h1>
        <div className='h-[25rem] md:h-[20rem] overflow-auto flex-col md:flex-row flex w-full px-[1rem] py-[2rem]'>
            {!states ? <div className='w-full h-full flex-col md:flex-row flex'>
            {userData.stakeData.length == 0 ? <div className='flex w-full h-full font-fredoka items-center justify-center text-white'>No Stakes Found</div>:""}
            {userData.stakeData.map((data,index)=>(
                <div key={index} className='flex font-fredoka text-white min-h-[11.5rem] md:min-h-[15rem] md:min-w-[28rem] md:w-[28rem] w-full flex-col border-b border-[#E5BD19] border-r justify-evenly items-center rounded-2xl'>
                    <h2 className='font-bold text-[22px]'>Skibbidi Bot #{Number(data.data[0])}</h2>
                    <h2>Claimable : {data.claimable} wRP</h2>
                    <h2>Unlock at : {unixToGeneralTime(Number(data.data[2]))}</h2>
                    <div className='flex w-[60%] justify-between'>
                        <button className={`${claiming ? " text-white border-b border-r border-[#E5BD19]" : "border-b border-r border-[#E5BD19] text-[#E5BD19] "} px-[10px] py-[4px] rounded-2xl`} onClick={()=>claimY(data.index)}>{claiming ? "Claiming" : "Claim wRP"}</button>
                        <button className={`${claiming ? " text-white border-b border-r border-[#E5BD19]" : "border-b border-r border-[#E5BD19] text-[#E5BD19] "} px-[10px] py-[4px] rounded-2xl`} onClick={()=>unstake(data.index)}>{unstaking ? "Unstaking" :"Unstake"}</button>
                    </div>
                </div>
            ))}
            </div> : 
            <div className='flex w-full h-full items-center justify-center text-white text-[30px] animate-pulse'>
                Loading ...
            </div>
            }
        </div>
    </div>
  )
}

export default StakeDashboard