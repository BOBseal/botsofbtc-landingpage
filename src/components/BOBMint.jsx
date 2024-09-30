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
import { 
    getBobMinterCa, 
    getBobNftCa,
    getErc20Balances, 
    getEthBalance,
    getStakingContract 
} from '@/utils/hooks'
import { ethers } from 'ethers'


const BOBMint=()=>{
    const totalSupply = 10000;
    const {user,connectWallet} = useContext(AppContext);
    const [data,setData] = useState({});

    const getMintInfo=async()=>{
        try {
            if(!user.wallet){
                connectWallet()
            }
            const mintCa = await getBobMinterCa(user.wallet);
            const currentRoundNo = await mintCa.currentRound();
            const roundDescription = await mintCa.getRound();
            //const nftCa = await getBobNftCa(user.wallet);
            const userEthBalance = await getEthBalance(user.wallet)
            const mCost = await mintCa.mintCost();
            const mintCostDefault = ethers.utils.formatEther(mCost);
            const dCost = await mintCa._calculateDiscount(user.wallet);
            const nextIdToMint = await mintCa._nextIdToMint();
            const totalLeft = totalSupply - Number(nextIdToMint);
            const actualMintCost = ethers.utils.formatEther(dCost);
            const mData = await mintCa.getMinterData(user.wallet);
            const publicMintsNo = Number(mData[0])
            const waitlistMintsNo = Number(mData[1])
            const totalReferals = Number(mData[2])
            const referer = mData[3]
            const maxPublicMintPerWallet = await mintCa.maxMintPerWallet();
            const maxWaitlistMintPerWallet = await mintCa.maxWlMint();
            const maxDrawWinners = await mintCa.maxWinners();
            const isWhitelisted = await mintCa.wlZero(user.wallet);
            const referalBonus = await mintCa.referalBonus();
            const totalSOBOwned = await mintCa.getTotalSOBOwned(user.wallet);
            const userDBalances = await mintCa.getMinterBalances(user.wallet,"0x0000000000000000000000000000000000000000")
            const minterBalances = ethers.utils.formatEther(userDBalances);
            const obj = {
                currentRound:Number(currentRoundNo),
                roundName:roundDescription,
                userBalances:userEthBalance,
                mintPrice:mintCostDefault,
                userMintPrice:actualMintCost,
                userPublicMints:publicMintsNo,
                userWaitlistMints:waitlistMintsNo,
                totalReferals:totalReferals,
                referer:referer,
                maxPublicMints:Number(maxPublicMintPerWallet),
                maxWaitlistMint:Number(maxWaitlistMintPerWallet),
                maxWinners:Number(maxDrawWinners),
                isWhitelisted:isWhitelisted,
                referalBonus:referalBonus,
                sobOwned:Number(totalSOBOwned),
                smartBalances:minterBalances,
                nextId:Number(nextIdToMint),
                mintsLeft:totalLeft
            }
            setData(obj);
            //console.log(totalSOBOwned);
            //console.log(Number(currentRoundNo), roundDescription)
        } catch (error) {
            console.log(error);
        }
    }
    
    const mint=async()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!user.wallet){
          connectWallet();
        }
        getMintInfo();
      }, [user.wallet])
  
    return(
        <>
          <Navbar/>
            <div className='bg-[#231F20] flex flex-col items-center justify-center w-full h-full border-b pb-[1rem] pt-[1rem]'>
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
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Mint Date : 2:30 pm UTC , 7th October
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Mint Price : {data.mintPrice ? <>{data.mintPrice}{" "}ETH</> :"Loading ..."}
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Referal Bonuses : 5% of Mint Cost + 1000 RP per referal mint. 
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                SOBs Held or Staked : {data.sobOwned ? data.sobOwned :"0"} 
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[90%] gap-[2rem] lg:w-[55%]  w-full h-full pt-[2rem]'>
                        
                        <div className='border-[#E5BD19] border-[3px] px-[20px] py-[5px] text-[25px] font-fredoka rounded-xl hover:scale-105 cursor-pointer'>MINT {data.userMintPrice ? data.userMintPrice :"0.02"} ETH</div>
                        
                    </div>
                </div>

                <div className='flex flex-col w-full md:w-[95%] lg:w-[70%] h-full items-center justify-center pt-[2rem] md:pt-[3rem]'>
                    <div className='flex border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Utilities & Benifits :</h2>
                    </div>
                    <div className='flex flex-col w-full h-full'>
                        <div className='p-[1.5rem] text-[20px] font-nunito'>
                            BOTS OF BITCOIN NFTs are meant to serve as one of the cores of the platform, thus along with Dynamic PFPs they are also poised to serve 
                            several utilities & be of use for several services in the platform. They are also set apart by the fact that each BOTS OF BITCOIN PFP can 
                            Transform its looks to look like other select NFT Collections. In future BOTS OF BITCOIN NFTs may also serve as licensing for any node/DLT features launched.
                        </div>
                        <div className='px-[2.5rem] text-[20px] font-bold font-fredoka'>
                            <li>Dynamic PFPs</li>
                        
                            <li>Governance</li>

                            <li>Ecosytem VIP Passes</li>

                            <li>Revenue Sharing through Staking</li>
                            
                            <li>Platform Token Incentives</li>
                        </div>
                    </div>
                    
                    <div className='flex pt-[1rem] border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Mint Details :</h2>
                    </div>
                    
                    <div className='flex flex-col w-full h-full'>
                        <div className='px-[1.5rem] py-[1.5rem] text-[20px] font-nunito flex-wrap text-wrap'>
                            Minting Process of BOTS OF BITCOIN collection will follow 2 stages, Waitlist Mint & Public Mint. Users who have either held or staked 
                            SOB are eligible for a guaranteed entry & discount upto 50% on Mint Price during Waitlist Mint stage. Moreover 10 Random Lucky NFTs minted will
                            stand a chance to share 10% of entire raised amount in ETH , each Minted is counted as Entry Ticket. There is also a Referal Program where 
                            you can Earn 5% of your referal's mints in ETH.Minter addresses are counted as Early Supporters & are eligible for future bonuses.
                        </div>
                        <div className='px-[1.5rem] text-[20px] font-bold font-fredoka'>
                            <li className='px-[15px] py-[8px]'>Waitlist Mint Time: 14:30 UTC 7 Oct</li>
                            <li className='px-[15px] py-[8px]'>Public Mint Time: 14:30 UTC 8 Oct</li>
                            <li className='px-[15px] py-[8px]'>Mint Price : 0.02 ETH</li>
                            <li className='px-[15px] py-[8px]'>6.9% Royalties for ID's Minter - ERC2981 Compliant Marketplaces only.</li>
                            <li className='px-[15px] py-[8px]'>1% Discount for each SOB held, upto 50%.</li>
                            <li className='px-[15px] py-[8px]'>Earn 5% of mint cost from referal mints.</li>
                            <li className='px-[15px] py-[8px]'>Early Supporter Role for Minters.</li>
                            <li className='px-[15px] py-[8px]'>10 Random BOTs Minted & its Owners can win a lucky draw.</li>
                        </div>
                    </div>

                    <div className='flex pt-[1rem] border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Fusion S3 Spice :</h2>
                    </div>

                    <div className='p-[1.5rem] text-[20px] font-nunito flex flex-col w-full h-full'>
                            BOB Fusion Spice S3 generated from the NFT mints will be distributed at a latter date on basis of Mint Participation + NFT Held Parameters, More details will be announced on our Socials.
                    </div>
                </div>
            </div>
          <Footer/>      
        </>
    )
}

export default BOBMint