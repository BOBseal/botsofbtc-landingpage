import React from 'react'
import Image from 'next/image'
import img from "../../assets/lotterypage.png"
const NetworkError = ({data}) => {
  return (
    <div className={`h-full w-full flex flex-col items-center justify-center pb-[2rem]`}>
        <div className='flex div-[10px]'>
           <Image src={img} height={400} width={400} alt="Connect Wallet" className={`object-cover w-[380px] h-[380px] md:w-[400px]`}/>
        </div>
        <div className='text-white text-center rounded-lg text-[20px] font-bold flex flex-col items-center gap-[1rem] font-fredoka border-[2px] border-[#E5BD19] bg-[#231F20] div-[1rem]'>
          <div className='animate-pulse'>WRONG NETWORK DETECTED !</div>
          <div className='animate-pulse'>SWITCH TO <>{data}</> & REFRESH THIS PAGE.</div>
        </div>
    </div> 
  )
}

export default NetworkError