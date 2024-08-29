'use client'
import React,{useContext , useState, useEffect} from 'react'
import { AppContext } from '@/context/AppContext'
import { getLotteryContract,unixToGeneralTime} from '@/utils/hooks'
import { ethers } from '../../../node_modules/ethers/lib/index'

const Lottery = () => {
    const {user, lotteryData,setLotteryData} = useContext(AppContext);
//@BoBseal@123
    const getLotteryInfo = async()=>{
        try {
            let lastRoundWinners =[];
            let userLastRoundWins = [];
            let userLastRoundTickets =[];
            const contract = await getLotteryContract(user.wallet);
            const cr = await contract.currentRound();
            const currentRound = Number(cr);
            const te = await contract.ticketPriceEth();
            const ticketPriceEth = ethers.utils.formatEther(te);
            //const ticketPriceUsd = await contract.ethCostInUsd();
            const currentRoundData = await contract.getRoundData(Number(currentRound));
            const maxParticipants = await contract.maxTicketsPerRound();
            const currentRoundUserTickets = await contract.getUserTickets(user.wallet,currentRound);
            //const totalPool = (Number(ticketPriceEth) * Number(maxParticipants));
            const maxWinners = await contract.maxWinners();
            const ub = await contract.userBalances(user.wallet,"0x0000000000000000000000000000000000000000");
            const userBlances = ethers.utils.formatEther(ub)
            const userTicketCount = await contract.getUserTicketCount(user.wallet,currentRound);
            if(currentRound > 1){
                lastRoundWinners = await contract.getRoundWinners(currentRound-1);
                const userWinnerTicketCount = await contract.getUserWinnerTicketCount(user.wallet,currentRound);
                if(Number(userWinnerTicketCount) > 0){
                    userLastRoundTickets = await contract.getUserTickets(user.wallet,currentRound-1);
                    for(const id of userLastRoundTickets){
                        const isWinner = await contract.isWinnerTicket(id,currentRound-1);
                        if(isWinner){
                            userLastRoundWins.push()
                        }
                    }
                }
            }
            setLotteryData({...lotteryData,
                currentRound:currentRound ,
                ticketPrice:ticketPriceEth,
                currentParticipants:Number(currentRoundData[0]),
                maxParticipants:Number(maxParticipants),
                userTickets:Number(currentRoundUserTickets),
                maxWinners:Number(maxWinners),
                userBalance:userBlances,
                userTicketCount:Number(userTicketCount),
                lastWins:userLastRoundWins,
                lastTickets:userLastRoundTickets,
                lastWinners:lastRoundWinners 
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
      getLotteryInfo()
    }, [lotteryData.currentRound])
    
    
    return (
        <div className='flex justify-center items-center w-full h-full'>
            
        </div>
    )
}

export default Lottery