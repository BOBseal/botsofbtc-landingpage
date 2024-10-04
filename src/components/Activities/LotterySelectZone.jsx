"use client"

import React,{useEffect, useState, useContext} from "react"
import LotteryPage from "./Lottery.jsx"
import { lotteryTokenConfigs } from "@/configs/config.jsx"
import placeHolderImg from "../../assets/BOB_LOGO.png"
import Image from "next/image"
import { AppContext } from '@/context/AppContext'
import { getLotteryContract,getErc20Decimals } from "@/utils/hooks.jsx"
import { ethers } from "ethers"

const LotterySelectZone=()=>{
    const {user , connectWallet,setLotteryData} = useContext(AppContext);
    const [data , setData] = useState({
        selectedToken:'',
        tokenList:[
            "WETH",
            "WBTC",
            "UniBTC",
            "USDC",
            "wRP"
        ],
        active:false
    })
    const [listData , setListData] = useState([])

    const findTokenByTicker = (ticker) => {
        return Object.values(lotteryTokenConfigs).find(token => token.ticker === ticker);
    };

    const setList = async()=>{
        try {
            let lData = [];
            for(const d of data.tokenList){
                const obj = findTokenByTicker(d);
                const addr = obj.address;
                const img = obj.img;
                const contract = await getLotteryContract(user.wallet,addr);
                const cRound = await contract.currentRound();
                const maxT = await contract.maxTicketsPerRound();
                const maxW = await contract.maxWinners();
                const currentRound = Number(cRound);
                const hF = await contract.houseFee();
                const tCost = await contract.ticketCost();
                const decimal = await getErc20Decimals(addr,user.wallet);
                const ticketCost = ethers.utils.formatUnits(tCost,Number(decimal));
                const totalPool = Number(ticketCost) * Number(maxT);
                const winPool = (totalPool * (100 - Number(hF)))/100;
                const winA =  winPool/Number(maxW);
                const winAmount = winA.toFixed(4);
                const ticketLeft = await contract.roundTicketsLeft(currentRound);
                const newObj = {address:addr,image:img,ticker:d,ticketCost:ticketCost+ ` ${d}`, currentRound:currentRound,winAmount:winAmount + ` ${d}`,ticketLeft:Number(ticketLeft)}
                lData.push(newObj);
            }
            console.log(lData);
            setListData(lData);
        } catch (error) {
            console.log(error);
        }
    }

    const selectTokenHandler = async(address)=>{
        try {
            if(data.active){
                setData({...data,selectedToken:address, active:false})
                setLotteryData({})
            }
            if(!data.active){
                setData({...data,selectedToken:address, active:true})   
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        setList()
      }, [listData.length])
    return(
        <div className="flex flex-col w-full h-full drop-shadow-2xl items-center">
            {!data.selectedToken?
            <div className="flex flex-col w-full drop-shadow-2xl h-full justify-center items-center">
                <div className="border-[2px] border-black bg-abstractBg bg-cover rounded-xl flex w-[90%] md:w-[70%] lg:w-[45%] h-[32rem] flex-col overflow-auto">
                    <div className="flex w-full h-full border-[2px] rounded-xl border-[#E5BD19]">
                        <div className="flex flex-col items-center h-full w-full px-[0.5rem] pb-[1rem]">
                            <div className="flex items-center w-full flex-col pb-[1rem] pt-[0.6rem]">
                                <h1 className="text-[#E5BD19] font-nunito text-stroke text-[50px]">OIL POTS</h1>    
                            </div>
                            <div className="flex flex-col overflow-auto w-fulll h-full w-full border-x-[2px] rounded-xl bg-[#231F20]">
                                {listData.length ? 
                                    <div className="w-full h-full gap-[15px] flex shadow-2xl flex-col p-[15px]">
                                        {listData.map((data)=>(
                                            <div onClick={()=> selectTokenHandler(data.address)} className="flex border-b-[#E5BD19] border-r-[#E5BD19] gap-[15px] border-b-[3px] border-r-[3px] rounded-2xl drop-shadow-2xl w-full min-h-[14rem] items-center cursor-pointer justify-between" key={data.address}>
                                                <div className="w-[30%] h-full flex justify-center items-center">
                                                    <Image src={data.image} width={65} height={65} alt="Logo" className="rounded-full"/>
                                                </div>
                                                <div className="h-full items-center flex flex-col w-[70%] py-[1.5rem] justify-center">
                                                    <h3 className="font-fredoka font-bold text-[#E5BD19] text-[32px] pb-[0.3rem]">{data.ticker}</h3>
                                                    <div className="w-full flex flex-col pl-[1rem] justify-center text-white font-nunito text-[14px]">
                                                        <p>Current Round : {data.currentRound ? <>{data.currentRound}</>:"Loading ..."}</p>
                                                        <p>Ticket Price : {data.ticketCost ? <>{data.ticketCost}</>:"Loading ..."}</p>
                                                        <p>Tickets Left : {data.ticketLeft ? <>{data.ticketLeft}</> :"0"}</p>
                                                        <p>Win/Ticket : {data.winAmount ? <>{data.winAmount}</> :"Loading ..."}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                :
                                <div className="flex h-full text-white items-center justify-cetner font-nunito text-[30px]">
                                    Loading ...
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> :""
            }
            {data.selectedToken? <LotteryPage _Function={selectTokenHandler} tokenAddress={data.selectedToken}/> :""}            
        </div>
    )
}

export default LotterySelectZone