"use client"
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { ethers } from "ethers";
import { getBobNftCa, getNFTCa, getRpCoreContract } from "@/utils/hooks";
const ClaimSpice = () => {
    const { connectWallet, user, getSpiceData, loaders, setLoaders, data , setData } = useContext(AppContext)
    const apiUrl = `https://api.botsofbtc.com`

    const claimDailySpice = async () => {
        try {
            setLoaders({ ...loaders, claim: "Claiming" ,claimLoader:true})
            if (loaders.initial) {
                setLoaders({ ...loaders, claim: "Claim Spice" })
                alert("Info loading , claim after states are loaded")
                return
            }
            const userFormat = ethers.utils.getAddress(user.wallet)
            const url = `${apiUrl}/dailyClaim?address=${userFormat}`
            const call = await fetch(url);
            if (call.ok) {
                alert(`${data.dailyClaimable} Spice is sent to ${userFormat}`);
                await getSpiceData();
            }
            else {
                alert(`Something went wrong when claiming`)
            }
            setLoaders({ ...loaders, claim: "Claim Spice" ,claimLoader:false})
        } catch (error) {
            console.log(error)
            setLoaders({ ...loaders, claim: "Claim Spice" ,claimLoader:false})
        }
    }

    const claimVoteSpice = async()=>{
        try {
            setLoaders({ ...loaders, vote: "Claiming" ,voteClaimLoader:true})
            const userFormat = ethers.utils.getAddress(user.wallet)
            const calldata = { address: userFormat}
            const call = await fetch(`${apiUrl}/voterClaim`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(calldata)
            })
            if (call.ok) {
                alert(`Claimed ${data.voteSpice} Spice for voting for BOTS OF BITCOIN on Fusion Voting in last round`)
                await getSpiceData()
            }
            setLoaders({ ...loaders, vote: "Voter Claim" ,voteClaimLoader:false})
        } catch (error) {
            console.log(error)
        }
    }
    

    const claimMintBonus = async () => {
        try {
            setLoaders({ ...loaders, bonus: "Claiming" ,mintBonusLoader:true})
            if (loaders.initial) {
                setLoaders({ ...loaders, bonus: "Claim Bonus" })
                alert("Info loading , claim after states are loaded")
                return
            }
            if(data.unclaimedIds.length == 0){
                setLoaders({...loaders,bonus:"Claim Bonus"})
                alert("No Unclaimed Mints left")
                return
            }
            const calldata = {address:user.wallet}
            const call = await fetch(`${apiUrl}/minterClaim`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(calldata)
            })
            if (call.ok) {
                alert(`Claimed ${data.claimableIds} mints`)
                await getSpiceData()
            }
            setLoaders({ ...loaders, bonus: "Claim Bonus" ,mintBonusLoader:false})

        } catch (error) {
            setLoaders({ ...loaders, bonus: "Claim Bonus" ,mintBonusLoader:false})
            console.log(error)
        }
    }
    const handler =async()=>{
        try {
            await getSpiceData();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (user.wallet) {
            const timeout = setTimeout(() => {
                handler();
            }, 300); // Debounce delay
    
            return () => clearTimeout(timeout); // Cleanup
        }
    }, [user.wallet]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-[95%] md:w-[65%] flex flex-col items-center justify-between lg:w-[45%] h-[29rem] lg:h-[35rem] rounded-xl border-r border-b bg-[#231F20]">
                <div className="flex h-[15%] flex justify-center items-center w-full bg-[#E5BD19] rounded-t-xl">
                    <h1 className="text-[30px] font-nunito text-black">SPICE CLAIMS</h1>
                </div>
                {!loaders.initial ?
                    <div className="flex text-white px-[0.5rem] md:pl-[2rem] font-fredoka pt-[1rem] gap-[5px] h-[70%] flex flex-col justify-center w-full">
                        <p className="text-[17px] lg:text-[22px]">Spice Per BOB/day: {data.spicePerBOB} Spice</p>

                        <p className="text-[17px] lg:text-[22px]">BOB Held: {data.bobHeld ? <>{data.bobHeld}</> : "0"} BOB</p>
                        <p className="text-[17px] lg:text-[22px]">Spice Per SOB/day: {data.spicePerSOB} Spice</p>

                        <p className="text-[17px] lg:text-[22px]">SOB Held: {data.sobHeld ? <>{data.sobHeld}</> : "0"} SOB</p>
                        <p className="text-[17px] lg:text-[22px]">Spice Per RP/day: {data.spicePerRP} Spice</p>
                        <p className="text-[17px] lg:text-[22px]">RP Balance: {data.rpBalance ? <>{data.rpBalance}</> : "0"} $RP</p>
                        {
                            data.eligible?
                            <div className="flex text-white gap-[5px] flex flex-col w-full">
                                <p className="text-[17px] lg:text-[22px]">Voting SOB Rewards: {data.voteSpice >0 ? <>{data.voteSpice}</> : "0"} Spice</p>
                            </div>
                            :""
                        }
                        {data.claimableIds > 0 ?
                            <div className="flex text-white gap-[5px] flex flex-col w-full">
                                <p className="text-[17px] lg:text-[22px]">Unclaimed BOB Mints: {data.claimableIds ? <>{data.claimableIds}</> : "0"} BOB</p>
                                <p className="text-[17px] lg:text-[22px]">Bonus Per Mint: 1000 Spice</p>
                                <p className="text-[17px] lg:text-[22px]">Claimable Bonus: {data.mintClaimable ? <>{data.mintClaimable}</> : "0"} Spice</p>
                            </div> : ""
                        }
                        <p className="text-[17px] lg:text-[22px]">Claimable Spice: {data.dailyClaimable ? <>{data.dailyClaimable}</> : "0"} Spice</p>
                    </div> :
                    <div className="text-white text-[25px]">Loading...</div>}
                <div className={`w-full text-[20px] lg:text-[25px] h-[15%] pb-[1rem] px-[1rem] flex ${data.claimableIds > 0 ? "justify-between" : "justify-center"}`}>
                    {data.claimableIds > 0 ?
                        <div className="flex w-[50%] justify-center items-center">
                            <button onClick={() => claimMintBonus()} disabled={loaders.mintBonusLoader} className="bg-yellow-500 px-[10px] py-[3px] rounded-full font-fredoka">{loaders.bonus}</button>
                        </div>
                        : ""}

                    <div className="flex w-[50%] justify-center items-center">
                        <button onClick={() => claimDailySpice()} disabled={loaders.claimLoader} className="bg-yellow-500 px-[10px] py-[3px] rounded-full font-fredoka">{loaders.claim}</button>
                    </div>
                    {
                            data.eligible?
                    <div className="flex w-[50%] justify-center items-center">
                        <button onClick={() => claimVoteSpice()} disabled={loaders.voteClaimLoader} className="bg-yellow-500 px-[10px] py-[3px] rounded-full font-fredoka">{loaders.vote}</button>
                    </div>
                    :""}
                </div>
            </div>
        </div>
    )
}

export default ClaimSpice