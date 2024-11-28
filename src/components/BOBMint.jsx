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
import bot5 from "../assets/5.png"
import goto from "../assets/button_goto.svg"
import Link from 'next/link'

const BOBMint=()=>{
    const totalSupply = 10000;
    const {user,connectWallet} = useContext(AppContext);
    const [data,setData] = useState({});
    const [states , setStates] = useState({
        dashboardOn:false
    })
    const zeroAddr = "0x0000000000000000000000000000000000000000"
    const sp = useSearchParams();
    const ref = sp.get('ref');
    console.log(ref)
    const getMintInfo=async()=>{
        try {
            const mintCa = await getBobMinterCa(user.wallet);
            const currentRoundNo = await mintCa.currentRound();
            const roundDescription = await mintCa.getRound();
            //const nftCa = await getBobNftCa(user.wallet);
            const userEthBalance = await getEthBalance(user.wallet)
            const mCost = await mintCa.mintCost();
            const mintCostDefault = ethers.utils.formatEther(mCost);
            const dCost = await mintCa._calculateDiscount(user.wallet);
            const nextIdToMint = await mintCa._nextIdToMint();
            const totalLeft = totalSupply - Number(nextIdToMint) + 1;
            const actualMintCost = ethers.utils.formatEther(dCost);
            const mData = await mintCa.getMinterData(user.wallet);
            const publicMintsNo = Number(mData[0])
            const waitlistMintsNo = Number(mData[1])
            const totalReferals = Number(mData[2])
            const referer = mData[3]
            const maxPublicMintPerWallet = await mintCa.maxMintPerWallet();
            const maxWaitlistMintPerWallet = await mintCa.maxWlMint();
            const maxDrawWinners = await mintCa.maxWinners();
            //const isWhitelisted = await mintCa.wlZero(user.wallet);
            const referalBonus = await mintCa.referalBonus();
            const totalSOBOwned = await mintCa.getTotalSOBOwned(user.wallet);
            const userDBalances = await mintCa.getMinterBalances(user.wallet,"0x0000000000000000000000000000000000000000")
            const minterBalances = ethers.utils.formatEther(userDBalances);
            const whitelistData = await mintCa.wlZero(user.wallet);
            const amountAllowed = Number(whitelistData[1]);
            const amountMinted = Number(whitelistData[2]);
            console.log(amountAllowed,amountMinted) 
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
                //isWhitelisted:isWhitelisted,
                referalBonus:referalBonus,
                sobOwned:Number(totalSOBOwned),
                smartBalances:minterBalances,
                nextId:Number(nextIdToMint),
                mintsLeft:totalLeft,
                wlEligible:whitelistData[0],
                wlAmtAllowed : amountAllowed,
                wlAmtMinted : amountMinted
            }
            setData(obj);
            //console.log(totalSOBOwned);
            //console.log(Number(currentRoundNo), roundDescription)
        } catch (error) {
            console.log(error);
        }
    }

    const toggleDashboard=()=>{
        try {
            if(states.dashboardOn){
                setStates({...states,dashboardOn:false})
            } else 
            {
                setStates({...states,dashboardOn:true})
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const mint=async()=>{
        try {
            setStates({...states,loading:true})
            const ca = await getBobMinterCa(user.wallet);
            const round = data.currentRound//await ca.currentRound();
            const isA = ref ? ethers.utils.isAddress(ref):false;
            //console.log(ref,isA)
            let Addr = isA ? ref : zeroAddr;
            
            if(Number(round) == 0){
                //alert("Mints not started")
                //setStates({...states,loading:false})
                const mintTx = await ca.wlMint(Addr);
                mintTx.wait(1).then((data)=>{
                    getMintInfo();
                    setStates({...states,loading:false})
                })
            }
            if(Number(round) == 1){
                const cost = await ca._calculateDiscount(user.wallet);
                const mintTx = await ca.waitMint(Addr,{value:cost});
                mintTx.wait(1).then((data)=>{
                    getMintInfo();
                    setStates({...states,loading:false})
                })
            }
            if(Number(round) == 2){
                const whitelistData = await ca.wlZero(user.wallet);
                const amountAllowed = Number(whitelistData[1]);
                const amountMinted = Number(whitelistData[2]);
                let mintTx;
                if(amountMinted < amountAllowed){
                    mintTx = await ca.wlMint(Addr);
                } else {
                    const cost = await ca.mintCost();
                    mintTx = await ca.pubMint(Addr,{value:cost});
                }
                
                mintTx.wait(1).then((data)=>{
                    getMintInfo();
                    setStates({...states,loading:false})
                })
            }
        } catch (error) {
            console.log(error)
            setStates({...states,loading:false})
        }
    }

    const withdraw=async()=>{
        try {
            setStates({...states,loading1:true})
            const ca = await getBobMinterCa(user.wallet);
            const userDBalances = await ca.getMinterBalances(user.wallet,"0x0000000000000000000000000000000000000000")
            const mintCostDefault = ethers.utils.formatEther(userDBalances);
            if(Number(mintCostDefault) == 0){
                alert("No Balances On Contract to withdraw")
                setStates({...states,loading1:false})
                return
            }
            const txCall = await ca.withdrawUserBalances("0x0000000000000000000000000000000000000000",userDBalances);
            txCall.wait(1).then((data)=>{
                getMintInfo();
                setStates({...states,loading1:false})
            })
        } catch (error) {
            console.log(error)
            setStates({...states,loading1:false})
        }
    }

    const copyToClipboard = () => {
        if(user.wallet){
          const text = `https://botsofbtc.com/mint?ref=${user.wallet}`
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
        if(!user.wallet){
          connectWallet();
        }
        getMintInfo();
      }, [user.wallet,data.currentRound])
  
    return(
        <>
          <Navbar/>
            <div className='bg-[#231F20] flex flex-col items-center justify-center w-full h-full border-b pb-[1rem] pt-[1rem]'>
                <div className='flex w-full flex-col text-[38px] md:text-[48px] justify-center items-center font-nunito text-[#E5BD19]'>
                    <h1>BOTS OF BITCOIN</h1>
                    <h1>PFPs</h1>
                </div>
                <div className='flex justify-center w-full h-full items-center'>
                    <div className='flex w-full h-full px-[0.4rem] justify-center items-center pb-[1rem]'>
                    <div className='bg-[#231F20] md:w-[90%] lg:w-[55%] w-full p-[2px] rounded-xl h-full'>
                        <div className='bg-bubbles flex p-[5px] justify-between bg-center rounded-xl border border-[#E5BD19] bg-cover bg-no-repeat md:h-[10rem] h-[8rem] flex w-full'>
                            <div className='w-full md:w-[65%] flex flex-col items-center pt-[1rem]'>
                                <Link href={'http://fusion.gobob.xyz/?refCode=lqh3jh'} target={'_blank'}>
                                <div className='bg-black hover:scale-105 px-[10px] py-[3px] flex gap-[10px] rounded-full justify-center items-center cursor-pointer'>
                                    <h1 className='text-[20px] md:text-[25px] text-white font-fredoka'>Join Fusion S3</h1>
                                    
                                    <div className='flex items-center'>
                                        <Image src={goto} alt='button' height={13} width={13}/>
                                    </div>
                                    
                                </div>
                                </Link>
                                
                                <div className='flex w-full h-full items-center justify-center'>
                                <Link href={'/rampage'} target={'_blank'}>
                                    <h2 className='text-[#FFFF33] hover:scale-105 cursor-pointer bg-black px-[5px] rounded-full text-stroke-1 border-r border-[#FFFF33] border-b text-[25px] md:text-[38px] lg:text-[42px] font-extrabold font-nunito'>
                                        Mint BOB & Claim Spice
                                    </h2>
                                </Link>
                                </div>
                                
                            </div>
                            <div className='hidden md:w-[35%] md:flex justify-center items-center'>
                                <div className='w-full h-full flex items-center justify-center'>
                                    <Image alt="bot-chan" src={bot5} height={200} width={200} className='object-cover hover:scale-105 cursor-pointer border-[2px] border-[#E5BD19] rounded-full w-[120px] h-[120px] md:w-[150px] md:h-[150px]'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className='flex flex-col w-full h-full justify-center items-center px-[2.5rem] pt-[1rem] md:pt-[2rem]'>
                    
                    <div className='flex w-full md:w-[90%] lg:w-[55%] items-center justify-center h-full flex-col md:flex-row-reverse gap-[2rem]'>
                        <div className='flex items-center justify-center h-full md:w-[50%] w-full'>
                            <Image src={imgBOB} height={400} width={400}/>
                        </div>

                        {
                            !states.dashboardOn ?
                        <div className='flex w-full md:w-[50%] flex-col gap-[18px] flex-wrap text-wrap'>
                            {data.currentRound ==null ? 
                            <div className='w-full h-full flex justify-center'>
                            <div className='font-nunito text-[#E5BD19] py-[0.25rem] text-[24px] md:text-[28px]'>
                                    LOADING ...
                            </div>
                            </div>:""
                            }
                            {data.currentRound == 0?
                            <div className='w-full h-full'>
                                <div className='font-nunito text-[#E5BD19] py-[0.25rem] text-[24px] md:text-[28px]'>
                                        MINTS STARTING SOON
                                    </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                Mint Date : 2:30 pm UTC , 7th October
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Mint Price : {data.mintPrice ? <>{data.mintPrice}{" "}ETH</> :"Loading ..."}
                                </div>  
                            </div>
                            :""
                            }
                            {data.currentRound ==1? 
                                <div className='w-full h-full'>
                                    <div className='font-nunito text-[#E5BD19] py-[0.25rem] text-[24px] md:text-[28px]'>
                                        Current Round :  Waitlist
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        NFTs Left : {data.mintsLeft ? <>{data.mintsLeft}/10000</> :"10000"}
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Eligible For Mint : {data.sobOwned > 0 ? "True":"False"}    
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Applicable Discount : {data.sobOwned ? data.sobOwned :"0"}%
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Discounted Price : {data.userMintPrice ? data.userMintPrice :"0.02"} ETH
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Original Price : 0.02 ETH
                                    </div>
                                    
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Your Mints : {data.userWaitlistMints ? <>{data.userWaitlistMints} / {data.maxWaitlistMint}</>:<>0 / {data.maxWaitlistMint} Mints</>}
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Total Referals : {data.totalReferals ? <>{data.totalReferals}</>:"0"}
                                    </div>
                                    
                                    <div className='flex cursor-pointer flex-col py-[0.2rem] w-full font-nunito text-[18px] md:text-[20px]'>
                                        <p>Referal Link : </p>
                                        <div onClick={()=>copyToClipboard()}>https://botsofbtc.com/mints?...</div> 
                                    </div>
                                    <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Your Balance : {data.userBalances ?<>{data.userBalances.slice(0,8)}</>:"0"} ETH
                                    </div>
                                    <div className='w-full flex justify-center pt-[1rem]'>
                                        <button onClick={()=>toggleDashboard()} className='bg-[#E5BD19] hover:scale-105 text-black font-nunito text-[20px] px-[10px] py-[4px] rounded-full'>
                                            Open Dashboard    
                                        </button>
                                    </div>                              
                                </div>
                            :""}
                            {data.currentRound ==2? 
                                <div className='w-full h-full text-white flex flex-col justify-center md:justify-between'>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Mint Price : 0.005 ETH
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                        NFTs Left : {data.mintsLeft ? <>{data.mintsLeft}/10000</> :"10000"}
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Your Mints : {data.userPublicMints ? <>{data.userPublicMints} / {data.maxPublicMints}</>:<>0 / {data.maxPublicMints} Mints</>}
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Spice Bonus/Mint : 400 Spice Bonus
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Daily Spice : 200 Spice/Day
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                    Total Referals : {data.totalReferals ? <>{data.totalReferals}</>:"0"}
                                </div>
                                {
                                    data.wlAmtMinted < data.wlAmtMinted?
                                    <div className='w-full h-full'>
                                        <div className='font-nunito text-[16px] md:text-[18px]'>
                                            Free Mints: {data.wlAmtMinted}/{data.wlAmtAllowed}
                                        </div>
                                    </div>:
                                    ""
                                }
                                <div className='flex flex-col py-[0.2rem] w-full font-nunito text-[18px] md:text-[20px]'>
                                    <p>Referal Link : </p>
                                    <div onClick={()=>copyToClipboard()}>https://botsofbtc.com/mints?...</div> 
                                </div>
                                <div className='font-nunito text-[16px] md:text-[18px]'>
                                        Your Balances : {data.userBalances ?<>{data.userBalances.slice(0,8)}</>:"0"} ETH
                                </div>
                                <div className='w-full flex justify-center pt-[1rem]'>
                                    <button onClick={()=>toggleDashboard()} className='bg-[#E5BD19] hover:scale-105 text-black font-nunito text-[20px] px-[10px] py-[4px] rounded-full'>
                                        Open Dashboard    
                                    </button>
                                </div>                              
                            </div>
                            :""}
                        </div>
                        :
                        <div className='flex w-full md:w-[50%] text-white flex-col gap-[18px] flex-wrap text-wrap'>
                            <div className='font-nunito text-[#E5BD19] py-[0.25rem] text-[24px] md:text-[28px]'>                                    
                                Referal Dashboard
                            </div>
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Total Minted : {data.userWaitlistMints + data.userPublicMints}
                            </div>
                            
                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Total Referals : {data.totalReferals}
                            </div>

                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Dashboard Balances : {data.smartBalances} ETH
                            </div>

                            <div className='font-nunito text-[16px] md:text-[18px]'>
                                Wallet Balances : {data.userBalances ?<>{data.userBalances.slice(0,8)}</>:"0"} ETH
                            </div>

                            <div className='flex cursor-pointer flex-col py-[0.2rem] w-full font-nunito text-[18px] md:text-[20px]'>
                                <p>Referal Link : </p>
                                <div onClick={()=>copyToClipboard()}>https://botsofbtc.com/mints?...</div> 
                            </div>
                            <div className='w-full flex justify-between py-[1rem]'>
                                <button onClick={()=>toggleDashboard()} className='bg-[#E5BD19] hover:scale-105 text-black font-nunito text-[20px] px-[10px] py-[4px] rounded-full'>
                                   Go Back    
                                </button>
                                <button onClick={()=>withdraw()} className='bg-[#E5BD19] hover:scale-105 text-black font-nunito text-[20px] px-[10px] py-[4px] rounded-full'>
                                    {!states.loading1 ? "Withdraw" :"Withdrawing"}    
                                </button>
                            </div> 
                        </div>
                        }

                    </div>

                    <div className='flex flex-col gap-[2rem] h-full pt-[1rem]'>
                        
                        {
                        !states.loading ?
                        <div className='border-[#E5BD19] text-white border-[3px] px-[20px] py-[5px] text-[25px] font-fredoka rounded-xl hover:scale-105 cursor-pointer' 
                        onClick={()=>mint()}>
                            MINT {data.wlAmtMinted < data.wlAmtAllowed ? "0" :"0.005"} ETH
                        </div> :
                        <div className='border-[#E5BD19] text-white border-[3px] px-[20px] py-[5px] text-[25px] font-fredoka rounded-xl hover:scale-105 cursor-pointer' 
                        >
                            Minting
                        </div>
                        }
                        
                    </div>
                </div>
                    

                <div className='flex flex-col w-full md:w-[95%] lg:w-[70%] h-full items-center justify-center pt-[2rem] md:pt-[3rem]'>
                    <div className='flex border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>About :</h2>
                    </div>
                    <div className='font-nunito text-white p-[1rem] text-[16px] md:text-[18px]'>
                                BOTS OF BITCOIN (BOB) PFPs are 10k ERC721 NFTs each featuring an Unique BOT PFP along the ability for its holders to morph 
                                its Looks into select other NFTs & Image Assets that the Holder Own. Not
                                being just a PFP , BOTS OF BITCOIN (BOB) NFTs also will serve in Governance of the Platform & as a "VIP Pass" to BOTS OF BITCOIN Ecosystem.
                    </div>
                    
                    <div className='flex border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Utilities & Benifits</h2>
                    </div>
                    
                    <div className='flex flex-col text-white w-full h-full'>
                        <div className='p-[1.5rem] text-[20px] font-nunito'>
                            BOTS OF BITCOIN NFTs are meant to serve as one of the cores of the platform, thus along with Dynamic PFPs they are also poised to serve 
                            several utilities & be of use for several services in the platform. They are also set apart by the fact that each BOTS OF BITCOIN PFP can 
                            Transform its looks to other select NFT Collections. In future BOTS OF BITCOIN NFTs may also serve as licensing for any node/DLT features launched.
                        </div>
                        <div className='px-[2.5rem] text-[20px] font-semibold font-fredoka'>
                            <li>Dynamic PFPs</li>
                        
                            <li>Governance</li>

                            <li>Ecosytem VIP Passes</li>

                            <li>Revenue Sharing through Staking</li>
                            
                            <li>Platform Token Incentives ($BOTS Airdrop)</li>
                        </div>
                    </div>
                    
                    <div className='flex pt-[1rem] border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Fusion S3 Spice :</h2>
                    </div>

                    <div className='p-[1.5rem] text-[20px] text-white font-nunito flex flex-col w-full h-full'>
                            BOB Fusion Spice S3 generated from the NFT mints will be available to claim everyday on Rampage Section. 
                    </div>
                    <div className='px-[1.5rem] text-[20px] font-bold text-white font-fredoka'>
                            <li className='px-[15px] py-[8px]'>Fusion Season 3 Spice based on Number of PFPs held.</li>      
                            <li className='px-[15px] py-[8px]'>Claim 400 Spice instantly for Each Mint.</li>
                            <li className='px-[15px] py-[8px]'>Spice Up for Claims everyday based on BOB NFTs held, SOB NFTs held, RP & Value across services held.</li>
                            <p className='px-[15px] py-[8px]'>Read more...</p>
                    </div>

                    <div className='flex pt-[1rem] border-b items-center justify-center md:w-[50%] text-[29px] font-fredoka w-[70%]'>
                        <h2 className='text-[#E5BD19]'>Mint Details :</h2>
                    </div>
                    
                    <div className='flex flex-col text-white w-full h-full'>
                        
                        <div className='px-[1.5rem] py-[1.5rem] text-[20px] font-nunito flex-wrap text-wrap'>
                            Minting Process of BOTS OF BITCOIN collection will follow 2 stages, Waitlist Mint & Public Mint. Users who have either held or staked 
                            SOB are eligible for a guaranteed entry & discount upto 50% on Mint Price during Waitlist Mint stage. Moreover 10 Random Lucky NFTs minted will
                            stand a chance to share 10% of entire raised amount in ETH , each Minted is counted as Entry Ticket. There is also a Referal Program where 
                            you can Earn 5% of your referal's mints in ETH.Minter addresses are counted as Early Supporters & are eligible for future bonuses.
                        </div>
                        <div className='px-[1.5rem] text-[20px] font-bold font-fredoka'>
                            <li className='px-[15px] py-[8px]'>Waitlist Mint Amount : {data.maxWaitlistMint ? <>{data.maxWaitlistMint}</>:"0"}</li>      
                            <li className='px-[15px] py-[8px]'>Waitlist Mint Time : 14:30 UTC 7 Oct</li>
                            <li className='px-[15px] py-[8px]'>Public Mint Time : 14:30 UTC 8 Oct</li>
                            <li className='px-[15px] py-[8px]'>Public Mint Amount : {data.maxPublicMints ? <>{data.maxPublicMints}</>:"0"}</li>      
                            <li className='px-[15px] py-[8px]'>Mint Price : 0.005 ETH</li>
                            <li className='px-[15px] py-[8px]'>6.9% Royalties for ID's Minter - ERC2981 Compliant Marketplaces only.</li>
                            <li className='px-[15px] py-[8px]'>1% Discount for each SOB held, upto 50%.</li>
                            <li className='px-[15px] py-[8px]'>Earn 5% of mint cost from referal mints.</li>
                            <li className='px-[15px] py-[8px]'>Early Supporter Role for Minters.</li>
                            <li className='px-[15px] py-[8px]'>10 Random BOTs Minted & its Owners can win a lucky draw.</li>
                        </div>
                    </div>
                </div>
            </div>
          <Footer/>      
        </>
    )
}

export default BOBMint

/*
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
 */