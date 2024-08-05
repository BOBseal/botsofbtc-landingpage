import React from 'react'
import Image from 'next/image'
import img from "../../assets/lotterypage.png"

const WalletError = () => {
  return (
    <div className={`h-full w-full flex flex-col items-center gap-[15px] justify-center pb-[2rem]`}>
                <div className='flex div-[10px]'>
                   <Image src={img} height={400} width={400} alt="Connect Wallet" className={`object-cover w-[380px] h-[380px] md:w-[400px]`}/>
                </div>
                <div className='text-white flex justify-center text-center -mt-[2rem] rounded-lg text-[20px] font-bold font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] div-[1rem]'>
                  <div className='animate-pulse'>OOPS WALLET NOT DETECTED !</div>
                </div>
                <div onClick={()=>connectWallet()} className='text-white rounded-lg cursor-pointer text-[20px] font-bold font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] div-[1rem]'>
                  <div>CONNECT WALLET</div>
                </div>
    </div>
  )
}

export default WalletError