'use client'
import React,{useState , useContext, useEffect} from 'react'
import { AppContext } from '@/context/AppContext'
import { getHolderData, getNFTCa, getStakingContract, getErc20CA, getRampageCa, getWrappedRPContract } from '@/utils/hooks'
import { ethers } from '../../node_modules/ethers/lib/index'
import {motion} from 'framer-motion'
import Image from '../../node_modules/next/image'
import StakeDashboard from "./StakeDashboard"
import { SkibStake } from '@/utils/constants'
import StakeCard from "./CARDS/StakeCard"

const StakePage = () => {
  const {user, connectWallet} = useContext(AppContext);
  const [states , setStates] = useState({
    dashboard:false,
    stakeData:[],
    dashboardLoading:false,
    holdingLoading:false
  })
  const[loading,setLoading] = useState(false);
  const [ data , setData] = useState({
    stakeData:[]
  })
  const [claiming , setClaiming] = useState(false);
  const [unstaking , setUnstaking] = useState(false)
  const [unwrapping , setUnwrapping] = useState(false)
  const [loaded , setLoaded] = useState(false);
  const getAndSave = async()=>{
    try {
      if(!user.wallet){
        connectWallet();
      }
      let nftArray = [] 
      const _data = await getHolderData();
      //console.log(_data)
      if(user.wallet){
        const user_ = ethers.utils.getAddress(user.wallet)
        const stakeCa = await getStakingContract(user.wallet);
        const nftCa = await getNFTCa(user.wallet);
        const isApproved = await nftCa.isApprovedForAll(user.wallet,SkibStake[0].address);
        const weiPs = await stakeCa.weiPerSecond();
        const weiPsF = ethers.utils.formatEther(weiPs);
        const weiPsfN = Number(weiPsF);
        const weiDay = weiPsfN * 86400;
        //console.log(weiDay,stakeCa); 
        const objes = findObjectByAddress(user_,_data);
        //console.log(objes)
        setData({...data,allHolders:_data,userNfts:objes,holdings:nftArray,perDay:weiDay,isApproved:isApproved})
          //console.log(data);
      }
    } catch (error) {
        console.log(error);
    }
  }

  const getStakedData = async()=>{
    try {
      setLoading(true)
      const ca = await getStakingContract(user.wallet);
      const wRp = await ca.tokenizedRP();
      const rampCa = await getRampageCa(user.wallet);
      const userPoints = await rampCa.userPoints(user.wallet)
      const WRP = await getErc20CA(wRp,user.wallet);
      const balance = await WRP.balanceOf(user.wallet);
      const bal = ethers.utils.formatEther(balance);
      //console.log(wRp)
      const stakeData = await ca.stakers(user.wallet);
      const totalSt = Number(stakeData[0]);
      let activeStakes = []
      let totalClaimable = 0;
      for(let a = 0 ; a < totalSt; a++){
        const _stakeData = await ca.userStakes(user.wallet,a);
        const unstaked = _stakeData[5];
        if(!unstaked){
          const claimableRp = await ca.checkClaimableRp(user.wallet,a);
          const claimableBalance = ethers.utils.formatEther(claimableRp);
          totalClaimable = totalClaimable + Number(claimableBalance);
          const obj = {data:_stakeData , claimable: claimableBalance , index:a}
          activeStakes.push(obj);
        }

      }
      const tsc = totalClaimable.toString();
      setData({...data,stakeData:activeStakes, totalStaked:totalSt, activeStaked:Number(stakeData[1]) , wrpBalance:bal, totalClaimable:tsc, userRp: Number(userPoints)});
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
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
        getAndSave()
      })
      //setLoaders({...loaders,a1: false})
     //const unstake = await stakingCa.claimRPYield(0)
      //return unstake;
    } catch (error) {
      console.log(error)
    }
  }

  const claimYeild =async(index)=>{
    try {
      setClaiming(true)
      const ca = await getStakingContract(user.wallet);
      const claim = await ca.claimRPYield(index);
      claim.wait(1).then(()=>{
        getStakedData();
        //return claim;
      })
      setClaiming(false)
    } catch (error) {
      console.log(error)
      setClaiming(false)
    }
  }
  
  const unstake = async(index)=>{
    try {
      setUnstaking(true)
      const ca = await getStakingContract(user.wallet)
      const _clm = await ca.checkClaimableRp(user.wallet,index);
      const claimableBalance = ethers.utils.formatEther(_clm);
      //let unstake;
      if(Number(claimableBalance) > 1){
        const claim = await ca.claimRPYield(index);
        claim.wait(1).then(async()=>{
        const unstake = await ca.unstake(index);
        setUnstaking(false)
        unstake.wait(1).then(()=>{
          getStakedData();
        })
        })
      } else {
        const unstake = await ca.unstake(index);
        setUnstaking(false)
        unstake.wait(1).then(()=>{
          getStakedData();
        })
      }
    } catch (error) {
      setUnstaking(false)
      alert(error.message)
      console.log(error)
    }
  }

  const unwrap=async(wholeRp)=>{
    try {
      setUnwrapping(true)
      const ca = await getWrappedRPContract(user.wallet)
      const unwrap = await ca.unwrap(wholeRp)
      unwrap.wait(1).then(()=>{
        getStakedData();
      })
      setUnwrapping(false)
    } catch (error) {
      console.log(error)
      setUnwrapping(false)
    }
  }

  const toggleDashboard =async()=>{
    try {
      if(states.dashboard){
        setStates({...states,dashboard:false})
      } 
      if(!states.dashboard){
        setStates({...states,dashboard:true})
        if(!data.wrpBalance){
          await getStakedData();
        }
      }

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
          <button onClick={()=>toggleDashboard()} className='bg-[#E5BD19] text-[22px] border-black h-[3rem] border-b-[3px] p-[10px] py-[4px] hover:scale-105 rounded-2xl font-semibold'>{states.dashboard ? "Close Dashboard":"Open Dashboard"}</button>
       </div>

       <div className='py-[1rem] w-full h-full'>
       <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: states.dashboard ? 'auto' : 0, opacity: states.dashboard ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className='overflow-hidden w-full'
      >
          {states.dashboard ? <StakeDashboard userData={data} states={loading} claimY={claimYeild} claiming={claiming} unstake={unstake} unstaking={unstaking} unwrap={unwrap} unwrapping={unwrapping}/> :""}
      </motion.div> 
       </div>
      <div className='flex flex-col items-center justify-between pb-[1rem] px-[1.5rem] text-white font-nunito'>
        {data.userNfts == null ? 
        <div className='h-[10rem] md:h-[14rem] w-full flex justify-center items-center'>
            {loading ? "Loading ..." : "You Hold 0 Skibbidies"}
        </div> :
        <div className={` flex-col justify-center items-center w-full h-full ${states.dashboard ? "hidden":"flex"}`}>
          <h1 className='pb-[1rem] text-[28px] font-fredoka font-bold text-[#E5BD19]'>Stake New</h1>
          <div className='flex h-[25rem] md:h-[20rem] flex-col overflow-auto  gap-1 p-[1rem] md:flex-row justify-between items-center w-screen md:px-[2rem]'>
                <StakeCard stake={stakeNft} data={data} approve={approveNft}/>
          </div>
        </div>} 
        {<div className='flex flex-col justify-center items-center w-full h-full'>
            <div className='flex pt-[2rem] flex-col items-center justify-between py-[1rem] w-full'>
              <h1 className='text-[#E5BD19] font-fredoka text-[28px] font-bold'>SKIBBIDI STAKING 1.0</h1>
            </div>
            <div className='flex flex-col items-center justify-between py-[1rem] px-[1.5rem] text-white font-nunito pb-[1.5rem]'>
              <p className='w-full '>Stake your IDLE Skibbidies Of Bitcoin to get RPs . RPs generated from Staking are in a Wrapped Format & Needs to be Unwrapped for being included into Spice Distributions based on RP holdings. Tokenizing RPs is an Experimental Feature & will pave way for us to have an Active User Participation in Testings without the risk to lose real tokens. RPs are currently not Tradeable or Transferrable  We do not make any guarantees of RPs being a Real Token.</p>
            </div>
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
