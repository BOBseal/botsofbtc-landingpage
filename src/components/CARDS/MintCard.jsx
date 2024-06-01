'use client'
import React from 'react'
import Image from '../../../node_modules/next/image'
import ff from "../../assets/sobdemo.png"
import escan from "../../assets/etherscan.png"
import ele from "../../assets/element.png"

const MintCard = ({state, mintData}) => {
    const style = {
        box:`flex flex-col md:flex-row w-[90%] lg:w-[50%] md:justify-center bg-[#E5BD19] md:bg-[#231F20] drop-shadow-xl hover:drop-shadow-2xl md:border-none transition duration-500 ease-linear transform hover:scale-105 items-center h-[30rem] justify-between border-[2px] rounded-2xl border-[#E5BD19]`,
        box2:`h-[90%] md:hidden flex w-full flex-col gap-[8px] justify-between pb-[20px] bg-[#231F20] rounded-2xl`,
        mintButt:`h-[10%] w-full flex items-center justify-center rounded-b-2xl md:hidden`,
        imageBox:`h-[70%] py-[1em] w-full flex flex-col justify-between items-center gap-[5px]`,
        contentBox:`h-[30%%] flex-col gap-[0.15rem] flex pl-[45px] text-white`,
        mintButton:`font-fredoka text-[30px] font-[700] cursor-pointer`,
        img:`w-[15.4rem] flex justify-center`
    }
  return (
    <div className={style.box}>
        <div className={style.box2}>
            <div className={`${style.imageBox} `}>
                <div className={style.img}>
                    <Image src={ff} height={1000} width={1000} alt="MintDemo" className='object-cover rounded-2xl'/>
                </div>
                <div className='flex w-[70%] justify-between'>
                    <div>
                        <Image src={escan} width={20} height={20} alt="etherscan" className='hover:scale-105'/>
                    </div>
                    <div className='text-white'>
                        {mintData.supplyLeft ? <>{mintData.supplyLeft} / 3456</>:"*/ 3456"}
                    </div>
                </div>
            </div>
            <div className={style.contentBox}>
                <p>Total Supply : 3456</p>
                <p>Current Round : {mintData.currentRound ? <>{mintData.currentRound}</> : "NOT STARTED"}</p>
                <p>Mint Price : Free</p>
                <p>Your Mints : {mintData.userMints > 0? <>{mintData.userMints}</>:"0"}/{mintData.currentRound === "WL Round" ||mintData.currentRound ==="Not Started"  ? 15 : 10} SOB</p>
                <div className='flex gap-[0.6rem]'>
                   Select Amount : <input defaultValue={1} min={0} type={'number'} max={15} className="bg-transparent border w-[7rem]"/>
                </div>
            </div>
        </div>
        <div className={style.mintButt}>
            <div className={style.mintButton}>{state ? 
            <div className='flex justify-center items-center gap-[1rem]'>
                MINT NOW
            </div>
            : "Coming Soon"}</div>
        </div>



        <div className='w-[50%] hidden md:flex flex-col items-center justify-center border-r-[2px] border-[#E5BD19]'>
            <div className={`w-[90%] flex flex-col items-center gap-[20px] justify-center`}>
                    <div className={`md:w-full`}>
                        <Image src={ff} height={1000} width={1000} alt="MintDemo" className='object-cover rounded-2xl'/>
                    </div>
                    <div className='flex w-[90%] justify-between'>
                        <div>
                            <Image src={escan} width={30} height={30} alt="etherscan" className='hover:scale-105 cursor-pointer'/>
                        </div>
                        <div className='text-white'>
                        {mintData.supplyLeft ? <>{mintData.supplyLeft} / 3456</>:"*/ 3456"}
                        </div>
                    </div>
            </div>
        </div>

        <div className='w-[50%] hidden md:flex py-[2rem] flex-col items-center justify-between h-full'>
            <div className='h-[30%] border-b-[2px] w-full flex justify-center items-center'>
                <p className='font-fredoka font-[800] lg:text-[40px] md:text-[35px] text-[#E5BD19] cursor-pointer'>Skibbidies Of Bitcoin</p>
            </div>
            <div className='h-[70%] pt-[0.5rem] flex-col w-full items-center justify-between'>
                <div className='flex flex-col text-[20px] h-[75%] pl-[1rem] justify-center gap-[0.5rem] text-white'>
                <p>Total Supply : 3456</p>
                <p>Current Round : {mintData.currentRound ? <>{mintData.currentRound}</> : "NOT STARTED"}</p>
                <p>Mint Price : Free</p>
                <p>Your Mints : {mintData.userMints > 0? <>{mintData.userMints}</>:"0"}/{mintData.currentRound === "WL Round" ||mintData.currentRound ==="Not Started"  ? 15 : 10} SOB</p>
                <div className='flex gap-[1rem]'>
                   Select Amount : <input min={0} type={'number'} max={15} className="bg-transparent border w-[10rem]"/>
                </div>
                </div>
                <div className='flex justify-center items-center w-full'>
                    <p className='bg-gradient-to-r cursor-pointer from-[#E5BD19] to-[#E56F19] px-[15px] py-[4px] rounded-full text-[25px] font-bold transition duration-400 ease-linear transform hover:scale-105 hover:drop-shadow-lg'>{state ? "Mint Now" : "Coming Soon"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MintCard