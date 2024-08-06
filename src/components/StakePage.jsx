'use client'
import React,{useState , useContext, useEffect} from 'react'
import { AppContext } from '@/context/AppContext'
import { getHolderData, getNFTCa, getStakingContract } from '@/utils/hooks'
import { ethers } from '../../node_modules/ethers/lib/index'
import Image from '../../node_modules/next/image'
import l from "../assets/leftArrow.png"
import r from "../assets/rightArrow.png"
import { SkibStake } from '@/utils/constants'
import StakeCard from "./CARDS/StakeCard"

const StakePage = () => {
  const {user, connectWallet} = useContext(AppContext);
  const [states , setStates] = useState({
    totalStaked:0,
    timeframe:604800,
    approved:false,
  })
  const [ data , setData] = useState({})


  const getAndSave = async()=>{
    try {
      if(!user.wallet){
        connectWallet();
      }
      let nftArray = [] 
      const _data = await getHolderData();
      if(user.wallet){
        const user_ = ethers.utils.getAddress(user.wallet)
        const stakeCa = await getStakingContract(user.wallet);
        const nftCa = await getNFTCa(user.wallet);
        const isApproved = await nftCa.isApprovedForAll(user.wallet,SkibStake[0].address);
        const weiPs = await stakeCa.weiPerSecond();
        const weiPsF = ethers.utils.formatEther(weiPs);
        const weiPsfN = Number(weiPsF);
        const weiDay = weiPsfN * 86400;
        console.log(weiDay,stakeCa); 
        const objes = findObjectByAddress(user_,_data);
        //console.log(objes , nftArray)
        setData({...data , allHolders:_data  , userNfts:objes,holdings:nftArray,perDay:weiDay,isApproved:isApproved})
          //console.log(data);
      }
    } catch (error) {
        console.log(error);
    }
  }

  function findObjectByAddress(address,data_) {
    const key = Object.keys(data_).find(key => key === address);
    return key ? data_[key] : null;
  }

  const approveNft=async()=>{
    try {
      //setLoaders({...loaders,a1: true})
      const skib = await getNFTCa(user.wallet);
      const approve = await skib.setApprovalForAll(SkibStake[0].address,true);
      //setLoaders({...loaders,a1: false})
      approve.wait(1).then(()=>{
        setData({...data,isApproved:true});
      })
      return approve;
    } catch (error) {
      console.log(error)
    }
  }

  const stakeNft = async(id,timeframe)=>{
    try {
      //setLoaders({...loaders,a1: true})
      const stakingCa = await getStakingContract(user.wallet);
      const staketx =  await stakingCa.stake(id,timeframe);
      staketx.wait(1).then(()=>{
        alert(`Transaction Successful https://explorer.gobob.xyz/tx/${staketx.hash}`)
        window.location.reload();
      })
      //setLoaders({...loaders,a1: false})
     //const unstake = await stakingCa.claimRPYield(0)
      //return unstake;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
      getAndSave()
    }, [user.wallet])
  
  
    return (
    <div className='bg-[#231F20] flex flex-col h-full w-full items-center border-b-[1.5px] border-[#E5BD19]'>


       <div className='text-black font-fredoka py-[1rem] px-[3rem] pb-[0] md:pt-[3rem] grid grid-cols-1 gap-[1rem] md:flex w-full md:w-[80%] md:items-center md:justify-center'>
          <button className='bg-[#E5BD19] text-[22px] border-black h-[3rem] border-b-[3px] p-[10px] py-[4px] hover:scale-105 rounded-2xl font-semibold'>Open Dashboard</button>
       </div>
      <div className='flex flex-col items-center justify-between py-[1rem] px-[1.5rem] text-white font-nunito'>
        {data.userNfts == null ? "0 Skibbidies Held" :
        <div className='flex flex-col justify-center items-center w-full h-full'>
          <div className='flex h-[25rem] md:h-[20rem] flex-col overflow-auto  gap-1 p-[1rem] md:flex-row justify-between items-center w-screen md:px-[2rem]'>
                <StakeCard stake={stakeNft} data={data} approve={approveNft}/>
          </div>
          {<div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex pt-[2rem] flex-col items-center justify-between py-[1rem] w-full'>
              <h1 className='text-[#E5BD19] font-fredoka text-[28px] font-bold'>SKIBBIDI STAKING 1.0</h1>
            </div>
            <div className='flex flex-col items-center justify-between py-[1rem] px-[1.5rem] text-white font-nunito pb-[1.5rem]'>
              <p className='w-full '>Stake your IDLE Skibbidies Of Bitcoin to get RPs . RPs generated from Staking are in a Wrapped Format & Needs to be Unwrapped for being included into Spice Distributions based on RP holdings. Tokenizing RPs is an Experimental Feature & will pave way for us to have an Active User Participation in Testings without the risk to lose real tokens. RPs are currently not Tradeable or Transferrable  We do not make any guarantees of RPs being a "Real Value Token".</p>
            </div>
          </div>}
        
        </div>} 
      </div>
    </div>
  )
}

export default StakePage

{/*

<div className='flex flex-col border w-full md:w-[80%] md:h-[15rem] h-full items-center'>
              <h3 className='text-[#E5BD19] font-fredoka text-[22px] font-semibold justify-center w-full flex'>Your Owned Skibbidies</h3>       
              <div>
                    Owned Skibbidi Map
                </div>       
                </div>
            
            
                <div className='hidden md:flex md:w-[80%] border md:h-[15rem]'>
                  <h3 className='text-[#E5BD19] font-fredoka text-[22px] font-semibold justify-center w-full flex'>Your Staked Skibbidies</h3>
                     {data.userNfts.ownedIds.map((data)=>(
                    <div>
                      {data}
                    </div>
                  ))}
                </div>

*/}