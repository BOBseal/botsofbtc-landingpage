'use client'
import React,{useContext , useEffect, useState} from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
import Image from 'next/image'
import img from "../assets/lotterypage.png"
import { useSearchParams } from 'next/navigation'
import rimg from "../assets/rampagelogin.png"
import { ethers } from 'ethers'
import copyImg from "../assets/copy.svg"
import NetworkError from './CARDS/NetworkError'
import WalletError from './CARDS/WalletError'

const Page = () => {
  const {user,loaders,connectWallet, setRampageData, rampageData, createRPAccountZero,dailyMine ,rampageInitialized, getUserRampageData} = useContext(AppContext);
  const sp = useSearchParams();
  const ref = sp.get('ref');
  console.log(ref)
  const zeroAddr = "0x0000000000000000000000000000000000000000"
  const [details , setDetails] = useState({});
  const [loading , setLoading] = useState(false);

  const checkStat = async () => {
    if (user.wallet) {
      const ans = await rampageInitialized();
      setDetails({ initialized: ans });
      return ans;
    }
    return false;
  };

  const handler = async(e)=>{
    try {
      setRampageData({...rampageData, name:e.target.value})
    } catch (error) {
      console.log(error)
    }
  }

  const mintHandler = async() =>{
    try {
      if(!rampageData.name){
        alert("Name Cannot be Empty")
        return
      }
      const isA = ref ? ethers.utils.isAddress(ref):false;
      let Addr = isA ? ref : zeroAddr; 
      if(!isA){
        alert("InvalidReferal Detected , Initializing as Fresh Registrant  !")
      }
      setLoading(true);
      const c = await createRPAccountZero(Addr);
      c.wait(1).then(()=>{
        window.location.reload();
      })
      setLoading(false);    
    } catch (error) {
      console.log(error);
      setLoading(false); 
    }
  }

  const copyToClipboard = () => {
    if(user.wallet){
      const text = `https://botsofbtc.com/rampage?ref=${user.wallet}`
      navigator.clipboard.writeText(text)
      .then(() => {
        alert(`Copied to clipboard: ${text}`);
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard.', error);
        alert('Failed to copy to clipboard.');
      });
    } 
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!user.wallet) {
          await connectWallet();
        }
     
        const initialized = await checkStat();
        
        await getUserRampageData();
     
        
      } catch (error) {
        console.log(error);
      }
    };

    initialize();
  }, [rampageData.totalUsers,user.wallet]);
  
  return (
    <>
    <Navbar/>
    <div className=' bg-rp bg-cover bg-no-repeat w-full py-[1rem]'>
        <div className='h-full py-[5rem] w-full flex flex-col items-center text-black'>
            {user.wallet ? 
            <div className='flex flex-col items-center w-full h-full'>
              {user.correctChain ? 
              <div className='flex flex-col items-center h-full w-full justify-center'>
                  {details.initialized?
                  <div className='flex flex-col items-center justify-center gap-[2rem] py-[2rem] border-[3px] border-black drop-shadow-xl hover:drop-shadow-2xl w-[90%] md:w-[75%] lg:mt-[100px] lg:w-[45%] h-[60%] md:h-[50%] bg-[#E5BD19] bg-cover bg-no-repeat rounded-lg'>
                    <div className='flex flex-col items-center w-full gap-[14px] md:gap-[25px]'>
                      <div className='font-fredoka text-[35px] md:text-[50px]] leading-[25px] font-extrabold'>WELCOME TO</div>
                      <div className='font-fredoka text-[45px] md:text-[60px] leading-[30px] font-extrabold'>RAMPAGE</div>
                    </div>
                    <div className='flex flex-col items-center w-full gap-[20px] text-[18px] md:text-[25px]'>
                      <div className='flex w-[90%] md:w-[80%] gap-[20px] lg:w-[70%] md:text-[25px] font-fredoka font-semibold flex-col py-[0.5rem] drop-shadow-lg bg-[black] text-[#E5BD19] px-[3rem] items-center rounded-lg'>
                        <div className='flex w-full justify-center items-center gap-[8px]'>TOTAL USERS :{rampageData.totalUsers ? <div>{rampageData.totalUsers}</div> : "Loading..."}</div>
                        <div className='flex w-full justify-center gap-[8px] items-center'>POINTS: {rampageData.totalRP ? <div>{rampageData.totalRP}</div> : "Loading..."} <span>$RP</span></div>
                      </div>
                    </div>

                    <div className='w-[90%] md:w-[50%] gap-[10px] lg:w-[40%] text-[16px] md:text-[20px] font-nunito rounded-lg h-full flex flex-col'>
                      <div>UserName : {rampageData.userName ? <>{rampageData.userName}</> : "Loading ..."}</div>
                      <div>Your $RP Balances : {rampageData.userPoints} $RP</div>
                      <div>SOBs Held : {rampageData.skibHeld ? <>{rampageData.skibHeld}</>: "0"} SOB</div>
                      <div>Your Eligible RP/Day : {rampageData.pointPerDay ? <>{rampageData.pointPerDay}</>:"0"} RP</div>
                      <div>RP Per Referal : {rampageData.pointPerRef ? <>{rampageData.pointPerRef}</>: "0"} RP</div>
                      <div>Your Total Referals : {rampageData.totalRef ? <>{rampageData.totalRef}</>:"0"} Users</div>
                      <div>Your Referal Link : <span onClick={()=>copyToClipboard()} className='bg-[#352f31] div-[5px] text-[#E5BD19] cursor-pointer text-[14px] flex items-center px-[10px] justify-between w-[90%] rounded-lg'>{`https://botsofbtc.com/rampage?...`} <Image src={copyImg} height={30} width={30} alt=""/> </span></div>
                    </div>

                    <div className='w-[90%] h-full flex flex-col items-center'>
                        <button onClick={()=>dailyMine()} className={`${rampageData.mintEnable ? "bg-black text-[#E5BD19]" : "text-gray-600 bg-[#cda916] border-black"} px-[20px] py-[5px] drop-shadow hover:drop-shadow-xl rounded-2xl border cursor-pointer transition duration-500 ease-linear transform hover:scale-105 hover:border-red-500 border-[#E5BD19] text-[25px] font-fredoka font-[700]`}>
                            {loaders.dailyLogin ? "Loading...": `Mine Daily RP`}
                        </button>
                    </div>
                  </div>:
                  <div className='flex flex-col items-center justify-center gap-[2rem] py-[2rem] border-[3px] border-black transition duration-500 ease-linear transform hover:scale-105 hover:drop-shadow-2xl drop-shadow-2xl w-[90%] md:w-[75%] lg:w-[45%] h-[60%] md:h-[50%] lg:mt-[100px] bg-[#E5BD19] bg-cover bg-no-repeat rounded-lg'>
                  <div className='flex flex-col items-center w-full gap-[14px] md:gap-[25px]'>
                    <div className='font-fredoka text-[35px] md:text-[50px] leading-[25px] font-extrabold'>WELCOME TO</div>
                    <div className='font-fredoka text-[45px] md:text-[60px] leading-[30px] font-extrabold'>RAMPAGE</div>
                  </div>
                  <div className='flex flex-col items-center w-full gap-[20px] text-[20px]'>
                    <div className='flex md:text-[25px] font-fredoka font-semibold flex-col py-[0.5rem] drop-shadow-lg bg-[black] text-[#E5BD19] px-[0.5rem] md:px-[3rem] items-center rounded-lg'>
                    <div>TO PARTICIPATE IN RAMPAGE</div>
                    <div>CHOOSE USERNAME & MINT ID</div>
                    </div>
                  </div>
                  <div className='w-[90%] md:w-[50%] pt-[3rem] md:pt-[1px] gap-[20px] lg:w-[40%] text-[20px] font-nunito rounded-lg h-full flex flex-col'>
                    <div className='flex w-full'>
                        <div className='w-[40%]'>Set Name:</div>
                        <input onChange={(e)=> handler(e)} className='h-[2rem] bg-transparent border rounded-lg w-[60%] cursor-pointer md:w-[70%]' type={'text'}/>
                    </div>

                    <div className='flex w-full justify-center items-center pt-[1rem] md:pt-[1px]]'>
                        <div onClick={()=> mintHandler()} className='flex bg-black px-[30px] py-[8px] transition duration-500 ease-linear transform hover:scale-105 cursor-pointer rounded-full text-[#E5BD19]'>
                          {loading ? "LOADING" : "MINT PROFILE"}
                        </div>
                    </div>
                  </div>
                </div>
                }
              </div>:
              <NetworkError/>
            }
            </div>:
            <WalletError/>
            }
            
            <div className=''>
               
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )}

export default Page