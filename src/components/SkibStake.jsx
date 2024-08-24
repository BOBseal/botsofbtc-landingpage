"use client"

import React , {useState , useContext, useEffect} from 'react'
import {
    getStakingContract,
    getWrappedRPContract,
    getNFTCa
} from "../utils/hooks"
import { Skib ,SkibStake} from '@/utils/constants'
import WalletError from './CARDS/WalletError'
import NetworkError from './CARDS/NetworkError'
import { AppContext} from "../context/AppContext"
import { ethers } from '../../node_modules/ethers/lib/index'

const SkibbidiStake = () => {
    const {connectWallet, user} = useContext(AppContext);
    const [states , setStates] = useState({
      inputId:0,
      isOwner:false,
      totalStaked:0,
      timeframe:604800,
      approved:false,
      rpPerDay:0
    })
    const [loaders , setLoaders] = useState({
      a1:false
    })
    const checkOwnership=async(event)=>{
      try {
        //const stakingContract = await getStakingContract(user.wallet);
        const skib = await getNFTCa(user.wallet);
        const _isOwner = await skib.ownerOf(event.target.value);
        const stakeCa = await getStakingContract(user.wallet);
        const weiPs = await stakeCa.weiPerSecond();
        const weiPsF = ethers.utils.formatEther(weiPs);
        const weiPsfN = Number(weiPsF);
        const weiDay = weiPsfN * 86400;
        console.log(weiDay); 
        const approved = await skib.isApprovedForAll(user.wallet,SkibStake[0].address);
        const correctedOwner = ethers.utils.getAddress(_isOwner);
        const corrUser = ethers.utils.getAddress(user.wallet);
        console.log(correctedOwner,corrUser);
        if(correctedOwner ===corrUser){
          setStates({...states,isOwner:true , inputId:event.target.value , approved:approved, rpPerDay:weiDay});
          console.log("Is owner")
        } else{
          setStates({...states,isOwner:false , inputId:event.target.value,approved:approved,rpPerDay:weiDay});
          console.log("Is not owner")
        }
      } catch (error) {
        console.log(error)
      }
    }

    const approveNft=async()=>{
      try {
        setLoaders({...loaders,a1: true})
        const skib = await getNFTCa(user.wallet);
        const approve = await skib.setApprovalForAll(SkibStake[0].address,true);
        approve.wait(1).then(async(e)=>{
          const approved = await skib.isApprovedForAll(user.wallet,SkibStake[0].address);
          setStates({...states,isOwner:true , inputId:event.target.value , approved:approved});
          console.log(e)
        })
        setLoaders({...loaders,a1: false})
        return approve;
      } catch (error) {
        console.log(error)
      }
    }

    const stakeNft = async()=>{
      try {
        setLoaders({...loaders,a1: true})
        const stakingCa = await getStakingContract(user.wallet);
        const stake =  await stakingCa.stake(states.inputId,states.timeframe);
        setLoaders({...loaders,a1: false})
       //const unstake = await stakingCa.claimRPYield(0)
        //return unstake;
      } catch (error) {
        console.log(error)
      }
    }

    const handleSelect =(e)=>{
      try {
        const value = e.target.value;
        console.log(value);
        setStates({...states,timeframe:value});
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(() => {
      if(!user.wallet){
        connectWallet();
      }
    }, [user.wallet])

    return (
    <div className='flex flex-col md:pt-[2em] items-center gap-[1rem] justify-between p-[1rem] w-full h-full'>
        
        <div className='w-full h-full flex justify-center'>
          
            {!user.wallet ? <WalletError/>: 
            <div className='h-full pb-[1rem] gap-[1rem] text-white flex flex-col items-center md:w-[33rem] lg:w-[40rem] justify-between bg-[#352f31] rounded-2xl w-full'>
              <div className='flex w-full py-[1rem] rounded-t-2xl text-black bg-[#E5BD19]  h-full justify-center'>
              <h1 className='font-fredoka text-[25px] leading-[35px] md:text-[45px] font-[700]'>Stake Your Skibbidies</h1>
              </div>
              <div className='flex w-full pl-[1rem] gap-2 items-center'>
                <h3 className=' font-nunito'>Enter ID</h3>
                  <input className='bg-transparent text-white' placeholder='Type SKIBBIDI NFT Id to stake' type={'number'} onChange={(ev)=>checkOwnership(ev)}/>
              </div>
              <h3 className='flex w-full justify-start pl-[1rem] font-nunito'>Ownership Status :{states.isOwner ? " Owner":" Not Owner"} </h3>
              {states.isOwner ?<h3 className='flex w-full font-nunito justify-start pl-[1rem]'>RP/Day :  {states.rpPerDay}</h3>:""}
              {states.isOwner ? <div className='flex font-nunito w-full gap-2 justify-between px-[1rem]'>
                Select Timeframe
                <select className='bg-transparent' onSelect={(e)=>handleSelect(e)} name="Select Time" id="time">
                  <option value={604800} className='text-black'>7 Days</option>
                  <option value={1296000} className='text-black'>15 Days</option>
                  <option value={2592000} className='text-black'>30 Days</option>
                </select>
              </div>:""}
              <div className='bg-[#E5BD19] cursor-pointer flex items-center text-[20px] font-fredoka justify-center w-[12rem] md:text-[30px] font-[800] text-black px-[10px] py-[4px] rounded-full'>
                  {states.isOwner ? <div>
                    {states.approved ? <div className='' onClick={()=>stakeNft()}>Quick Stake</div>:
                    <div onClick={()=> approveNft()}>
                      Approve
                    </div>}
                  </div>: "Not Owner"}
              </div>
              
            </div>}
        </div>
    </div>
  )
}

export default SkibbidiStake