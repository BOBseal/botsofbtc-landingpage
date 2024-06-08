'use client'
import React,{useContext , useEffect, useState} from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
import Image from '../../../node_modules/next/image'
import img from "../../assets/lotterypage.png"
import rimg from "../../assets/rampagelogin.png"

const Page = () => {
  const {user, connectWallet, setRampageData, createRPAccount, rampageInitialized} = useContext(AppContext);

  const [details , setDetails] = useState({});
  
  const checkStat = async()=>{
    if(user.wallet){
      const ans = await rampageInitialized();
      setDetails({initialized: ans})
    }
  }

  useEffect(() => {
    try {
      if(!user.wallet){
        connectWallet();
      }
      checkStat();
    } catch (error) {
      console.log(error)
    }
  }, [user.wallet])
  

  return (
    <>
    <Navbar/>
    <div className=' bg-rp bg-cover bg-no-repeat w-full py-[1rem]'>
        <div className='h-[50rem] w-full flex flex-col items-center'>
            {user.wallet ? 
            <div className='flex flex-col items-center w-full h-full'>
              {user.correctChain ? 
              <div className='flex flex-col items-center h-full w-full justify-center'>
                  {details.initialized?
                  <div className='flex flex-col items-center justify-center gap-[2rem] py-[2rem] border-[3px] border-black drop-shadow-2xl w-[90%] md:w-[75%] lg:mt-[100px] lg:w-[45%] h-[60%] md:h-[50%] bg-[#E5BD19] bg-cover bg-no-repeat rounded-lg'>
                    <div className='flex flex-col items-center w-full gap-[14px] md:gap-[25px]'>
                      <p className='font-fredoka text-[35px] md:text-[50px]] leading-[25px] font-extrabold'>WELCOME TO</p>
                      <p className='font-fredoka text-[45px] md:text-[60px] leading-[30px] font-extrabold'>RAMPAGE</p>
                    </div>
                    <div className='flex flex-col items-center w-full gap-[20px] text-[20px]'>
                      <div className='flex md:text-[25px] font-fredoka font-semibold flex-col py-[0.5rem] drop-shadow-lg bg-[black] text-[#E5BD19] px-[3rem] items-center rounded-lg'>
                      <p>TOTAL $RP COLLECTED</p>
                      <p>10000000000 $RP</p>
                      </div>
                    </div>

                    <div className='w-[90%] md:w-[50%] gap-[20px] lg:w-[40%] text-[20px] font-nunito rounded-lg h-full flex flex-col'>
                      <p>UserName : BLABLA</p>
                      <p>Your $RP Balances : 1000</p>
                    </div>
                  </div>:
                  <div className='flex flex-col items-center justify-center gap-[2rem] py-[2rem] border-[3px] border-black drop-shadow-2xl w-[90%] md:w-[75%] lg:w-[45%] h-[60%] md:h-[50%] lg:mt-[100px] bg-[#E5BD19] bg-cover bg-no-repeat rounded-lg'>
                  <div className='flex flex-col items-center w-full gap-[14px] md:gap-[25px]'>
                    <p className='font-fredoka text-[35px] md:text-[50px] leading-[25px] font-extrabold'>WELCOME TO</p>
                    <p className='font-fredoka text-[45px] md:text-[60px] leading-[30px] font-extrabold'>RAMPAGE</p>
                  </div>
                  <div className='flex flex-col items-center w-full gap-[20px] text-[20px]'>
                    <div className='flex md:text-[25px] font-fredoka font-semibold flex-col py-[0.5rem] drop-shadow-lg bg-[black] text-[#E5BD19] px-[0.5rem] md:px-[3rem] items-center rounded-lg'>
                    <p>TO PARTICIPATE IN RAMPAGE</p>
                    <p>CHOOSE USERNAME & MINT ID</p>
                    </div>
                  </div>
                  <div className='w-[90%] md:w-[50%] gap-[20px] lg:w-[40%] text-[20px] font-nunito rounded-lg h-full flex flex-col'>
                    <input type={'text'}/>
                  </div>
                </div>
                }
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