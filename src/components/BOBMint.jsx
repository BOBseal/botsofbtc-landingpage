/* eslint-disable react/no-unescaped-entities */
'use client'
import React,{useContext , useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
import CountdownTimer from './Utils/Timer'
import Image from 'next/image'
import imgBOB from "../assets/haha.gif"

const BOBMint=()=>{
    const {user,connectWallet} = useContext(AppContext);
    
    
    useEffect(() => {
        if(!user.wallet){
          connectWallet();
        }
      }, [user.wallet])
  
    return(
        <>
          <Navbar/>
            <div className='bg-[#231F20] w-full h-full border-b pb-[1rem] pt-[1rem]'>
                <div className='flex w-full flex-col text-[38px] md:text-[48px] justify-center items-center font-nunito text-[#E5BD19]'>
                    <h1>BOTS OF BITCOIN</h1>
                    <h1>PFPs</h1>
                </div>
                <div className='flex justify-center w-full h-full items-center'>
                    <CountdownTimer targetDate={"2024-10-7-14-30"}/>
                </div>

                <div className='flex flex-col w-full h-full justify-center items-center px-[2.5rem] pt-[1rem] md:pt-[2rem]'>
                    <div className='flex w-full md:w-[90%] lg:w-[55%] items-center justify-center h-full flex-col md:flex-row-reverse gap-[2rem]'>
                        <div className='flex items-center justify-center h-full md:w-[50%] w-full'>
                            <Image src={imgBOB} height={400} width={400}/>
                        </div>
                        <div className='flex w-full md:w-[50%] flex-col gap-[18px] flex-wrap text-wrap'>
                            <div className='font-nunito text-[25px]'>About :</div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                BOTS OF BITCOIN (BOB) PFPs are 10k ERC721 NFTs each featuring an Unique BOT PFP along the ability for its holders to morph 
                                its Looks into select other NFTs & Image Assets that the Holder Own. Not
                                being just a PFP , BOTS OF BITCOIN (BOB) NFTs also will serve in Governance of the Platform & as a "VIP Pass" to BOTS OF BITCOIN Ecosystem.
                            </div>
                            <div>Learn More ...</div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Current Round : Team & Partners
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Mint Price : 0.02 ETH
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                SOB Holder Discount : 1% * SOB 
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[90%] gap-[2rem] lg:w-[55%] items-center justify-between w-full h-full pt-[2rem]'>
                        
                        <div className='border-[#E5BD19] border-[3px] px-[20px] py-[5px] text-[25px] font-fredoka rounded-xl'>MINT 0.02 ETH</div>
                        
                    </div>
                </div>

                <div className='flex flex-col w-full h-full items-center pt-[2rem] md:pt-[3rem]'>
                    <div className='flex border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2>Utilities & Benifits :</h2>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                        <div className='p-[1.5rem]'>
                            BOTS OF BITCOIN NFTs are meant to serve as one of the cores of the platform, thus along with Dynamic PFPs they are also poised to serve 
                            several utilities & be of use for several services in the platform. They are also set apart by the fact that each BOTS OF BITCOIN PFP can 
                            Transform its looks to look like other select NFT Collections. In future BOTS OF BITCOIN NFTs may also serve as licensing for any node/DLT features launched.
                        </div>
                        <div className='px-[1.5rem] text-[20px] font-bold'>
                            <li>PFP</li>
                        
                            <li>Governance</li>

                            <li>Ecosytem VIP Passes</li>

                            <li>Revenue Sharing through Staking</li>
                            
                            <li>Platform Token Incentives</li>

                            <li>Change Looks</li>
                        </div>
                    </div>
                    
                    <div className='flex pt-[1rem] border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2>Mint Details :</h2>
                    </div>
                    
                    <div className='flex flex-col w-full h-full'>
                        <div className='p-[1.5rem] text-[20px] font-bold'>
                            <li className='px-[15px] py-[10px]'>SOB Holders Mint Time: 14:30 UTC 7 Oct</li>
                            <li className='px-[15px] py-[10px]'>Public Mint Time: 14:30 UTC 8 Oct</li>
                            <li className='px-[15px] py-[10px]'>Mint Price : 0.02 ETH</li>
                            <li className='px-[15px] py-[10px]'>6.9% Royalties for ID's Minter - ERC2981 Complaint Marketplaces only.</li>
                            <li className='px-[15px] py-[10px]'>1% Discount for each SOB held, upto 50%.</li>
                            <li className='px-[15px] py-[10px]'>Earn 5% of mint cost from referal mints.</li>
                            <li className='px-[15px] py-[10px]'>Early Supporter Role for Minters.</li>
                            <li className='px-[15px] py-[10px]'>10 Random BOTs Minted & its Owners can win a lucky draw.</li>
                        </div>
                    </div>
                </div>
            </div>
          <Footer/>      
        </>
    )
}

export default BOBMint