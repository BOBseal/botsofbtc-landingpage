"use client"
import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { ethers } from "ethers";
import { getBobNftCa, getNFTCa, getRpCoreContract } from "@/utils/hooks";
const ClaimSpice = () => {
    const { connectWallet, user } = useContext(AppContext)
    const [data, setData] = useState({
        spicePerBOB: 500,
        spicePerSOB: 100,
        spicePerRP: 0.075,
        maxRpCalculated: 150000
    })
    const [loaders, setLoaders] = useState({
        initial: false,
        claim: "Claim Spice",
        bonus: "Claim Bonus",
        vote:"Voter Claim"
    })
    const apiUrl = `https://api.botsofbtc.com`

    const getSpiceData = async () => {
        try {
            setLoaders({ ...loaders, initial: true })
            let unclaimedIds = []
            let claimableMintSpice = 0;
            const userFormat = ethers.utils.getAddress(user.wallet)
            const bobCa = await getBobNftCa(user.wallet)
            const sobCa = await getNFTCa(user.wallet)
            const coreCa = await getRpCoreContract(user.wallet);
            const bobHolderList = await fetch(`${apiUrl}/holderListBOB`);
            const eligibleSpice = await fetch(`${apiUrl}/eligibleSobSpice?address=${user.wallet}`)
            let vtSpc = 0;
            let elig = false;
            if(eligibleSpice.status == 200){
                const response = await eligibleSpice.json();
                elig = true;
                vtSpc = response.claimable 
            } 
            if(eligibleSpice.status == 400){
                vtSpc = "Ineligible or Already Claimed"
            }
            if (bobHolderList.ok) {

                const holderListData = await bobHolderList.json();
                const holderData = holderListData[userFormat];
                //console.log(dailyClaimSpice.claimable)
                if (holderData) {
                    for (const j of holderData.ownedIds) {
                        const ic = await fetch(`${apiUrl}/idClaimed?tokenId=${j}`)
                        const isClaimed = await ic.json();
                        if (!isClaimed) {
                            claimableMintSpice = claimableMintSpice + 1000;
                            //claimableIds = claimableIds + 1;
                            unclaimedIds.push(j);
                        }
                    }
                }
            }
            //console.log(vtSpc)
            const bobHeld = await bobCa.balanceOf(user.wallet)
            const sobHeld = await sobCa.balanceOf(user.wallet)
            const rpData = await coreCa.getUser(user.wallet)
            const dca = await fetch(`${apiUrl}/claimableSpice?address=${userFormat}`)
            const dCa = await dca.json();
            const dailyClaim = dCa.claimable;
            setData({
                ...data,
                bobHeld: Number(bobHeld),
                sobHeld: Number(sobHeld),
                unclaimedIds: unclaimedIds,
                claimableIds: unclaimedIds.length,
                rpBalance: Number(rpData[1]),
                dailyClaimable: dailyClaim,
                mintClaimable: claimableMintSpice,
                totalClaimable: Number(claimableMintSpice) + Number(dailyClaim),
                voteSpice:vtSpc,
                eligible:elig,
                processed: true
            })
            setLoaders({ ...loaders, initial: false })
        } catch (error) {
            console.log(error)
            setLoaders({ ...loaders, initial: false })
        }
    }

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
            const calldata = { tokenIds: data.unclaimedIds}
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

    useEffect(() => {
        getSpiceData();
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