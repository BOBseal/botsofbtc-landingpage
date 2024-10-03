'use client'
import React,{useContext , useState, useEffect} from 'react'
import { AppContext } from '@/context/AppContext'
import { getErc20CA, getErc20Decimals, getLotteryContract,unixToGeneralTime} from '@/utils/hooks'
import { ethers } from '../../../node_modules/ethers/lib/index'
import { Lottery } from '@/utils/constants'
import { lotteryTokenConfigs } from '@/configs/config'
import Image from 'next/image'
import l from "../../assets/leftArrow.png"

const LotteryPage = ({tokenAddress,_Function}) => {
    const {user, lotteryData,setLotteryData} = useContext(AppContext);
    const [dashboardActive,setDashboardActive] = useState(false);
    const [data, setData] = useState({
        deposit:"Deposit",
        withdraw:"Withdraw",
        buy:"BUY TICKET"
    })
//@BoBseal@123

    const findTokenByAddress = (address) => {
        return Object.values(lotteryTokenConfigs).find(token => token.address === address);
    };
    const getLotteryInfo = async()=>{
        try {
            let lastRoundWinners =[];
            let userLastRoundWins = [];
            let userLastRoundTickets =[];
            const contract = await getLotteryContract(user.wallet,tokenAddress);
            const tData = findTokenByAddress(tokenAddress);
            const cR = await contract.currentRound();
            const currentRound = Number(cR);
            const token = await contract.ticketToken();
            const tCost = await contract.ticketCost();
            const decimal = await getErc20Decimals(token,user.wallet);
            const ticketCost = ethers.utils.formatUnits(tCost,Number(decimal));
            const rTicketLeft = await contract.roundTicketsLeft(currentRound);
            const roundTicketsLeft = Number(rTicketLeft);
            const uTicketCount = await contract.userTicketCount(user.wallet,currentRound);
            const userTicketCount = Number(uTicketCount);
            const ownedTickets = await contract.userOwnedTickets(user.wallet,currentRound);
            const _userCaBalances= await contract.getUserBalances(user.wallet);
            const userCaBalances = ethers.utils.formatUnits(_userCaBalances,Number(decimal))
            const erc20Ca =await getErc20CA(token,user.wallet);
            const usrBal =await erc20Ca.balanceOf(user.wallet);
            const userBalances = ethers.utils.formatUnits(usrBal,Number(decimal));
            const mxWin = await contract.maxWinners();
            const maxWinners = Number(mxWin)
            const mxTicket = await contract.maxTicketsPerRound();
            const maxTicketsPerRound = Number(mxTicket);
            const mxTicketUser= await contract.maxTicketsPerUser();
            const maxTicketsPerUser = Number(mxTicketUser);
            
            if(currentRound > 1){
                lastRoundWinners = await contract.getRoundWinnerList(currentRound);
                userLastRoundWins = await contract.userWinTickets(user.wallet,currentRound -1);
            }

            setLotteryData({
                ...lotteryData,
                currentRound:currentRound,
                token:token,
                ticketPrice:ticketCost,
                ticketsLeft:roundTicketsLeft,
                userTicketCount:userTicketCount,
                userOwnedTickets:ownedTickets,
                caBalances:userCaBalances,
                walletBalances:userBalances,
                maxWinners:maxWinners,
                maxTickets:maxTicketsPerRound,
                ticketPerUser:maxTicketsPerUser,
                userLastRoundWins:userLastRoundWins,
                lastRoundWinners:lastRoundWinners,
                ticker:tData.ticker
            })
            console.log(ticketCost)
        } catch (error) {
            console.log(error);
        }
    }

    const buyTicket=async()=>{
        try {
            if(lotteryData.userTicketCount == lotteryData.ticketPerUser){
                alert(`You can only buy a max of ${lotteryData.ticketPerUser} in this Pot`)
                return
            }
            setData({...data,buy:"Buying ..."})
            const contract = await getLotteryContract(user.wallet,tokenAddress);
            const erc20Ca = await getErc20CA(tokenAddress,user.wallet);
            const allowance = await erc20Ca.allowance(user.wallet,contract.address);
            const decimal = await erc20Ca.decimals();
            const _cost = ethers.utils.formatUnits(allowance,decimal);
            const costPrice = await contract.ticketCost();

            if(Number(_cost) < Number(lotteryData.ticketPrice)){
                setData({...data,buy:"Approving ..."})
                const txSend =await erc20Ca.approve(contract.address,costPrice);
                txSend.wait(1).then(async()=>{
                    setData({...data,buy:"Buying ..."})
                    const buy =await contract.buyTicket();
                    buy.wait(1).then(()=>{
                        setData({...data,buy:"BUY TICKET"})
                        setLotteryData({})
                        getLotteryInfo();
                    })
                })
                setData({...data,buy:"BUY TICKET"})
            } else {
                const buy = await contract.buyTicket();
                buy.wait(1).then(()=>{
                    setData({...data,buy:"BUY TICKET"})
                    setLotteryData({})
                    getLotteryInfo();      
                })
                setData({...data,buy:"BUY TICKET"})
            }
        } catch (error) {
            setData({...data,buy:"BUY TICKET"})
            console.log(error)
        }
    }

    const deposit=async()=>{
        try {
            if(!data.depositAmount){
                alert("Cannot be 0")
                return
            }
            setData({...data,deposit:"Depositing ..."})
            const contract = await getLotteryContract(user.wallet,tokenAddress);
            const tokenCa =await getErc20CA(lotteryData.token,user.wallet)
            const decimals = await tokenCa.decimals();
            const allowance = await tokenCa.allowance(user.wallet,contract.address);
            const allowanceFormatted = ethers.utils.formatUnits(allowance,decimals);
            const amountFormatted = ethers.utils.parseUnits(data.depositAmount,decimals);
            if(Number(allowanceFormatted) < Number(amountFormatted)){
                setData({...data,deposit:"Approving ..."})
                const approve = await tokenCa.approve(contract.address,amountFormatted);
                approve.wait(1).then(async()=>{
                    setData({...data,deposit:"Depositing ..."})
                    const send = await contract.deposit(amountFormatted);
                    send.wait(1).then(()=>{
                        setData({...data,deposit:"Deposit"})
                        setLotteryData({})
                        getLotteryInfo();
                    })
                })
                setData({...data,deposit:"Deposit"})
            }else {
                const send = await contract.deposit(amountFormatted);
                send.wait(1).then(()=>{
                    setData({...data,deposit:"Deposit"})
                    setLotteryData({})
                    getLotteryInfo()
                })
                setData({...data,deposit:"Deposit"})
            }
        } catch (error) {
            console.log(error)       
        }
    }

    const withdraw=async()=>{
        try {
            if(!data.withdrawAmount){
                alert("Cannot be 0")
                return
            }
            setData({...data,withdraw:"Withdrawing ..."})
            const contract = await getLotteryContract(user.wallet,tokenAddress);
            const tokenCa =await getErc20CA(lotteryData.token,user.wallet)
            const decimals = await tokenCa.decimals();
            const balance = await contract.getUserBalances(user.wallet);
            const bal = ethers.utils.formatUnits(balance,decimals);
            if(Number(bal) < Number(data.withdrawAmount)){
                alert("Balances in Oil Pot Dashboard is Less than entered")
                return
            }
            //const allowance = await tokenCa.allowance(user.wallet,contract.address);
            //const allowanceFormatted = ethers.utils.formatUnits(allowance,decimals);
            const amountFormatted = ethers.utils.parseUnits(data.withdrawAmount,decimals);
            const withdraw = await contract.withdraw(user.wallet,amountFormatted);
            withdraw.wait(1).then(()=>{
                setData({...data,withdraw:"Withdraw"})
                setLotteryData({})
                getLotteryInfo();
            })
            setData({...data,withdraw:"Withdraw"})
        } catch (error) {
            setData({...data,withdraw:"Withdraw"})
            console.log(error)       
        }
    }

    const toggleDashboard=()=>{
        try {
            if(dashboardActive){
                setDashboardActive(false);
            }else {
                setDashboardActive(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getLotteryInfo()
    }, [lotteryData.currentRound])
    
    
    return (
        <div className='flex justify-center items-center px-[1.3rem] w-[90%] md:w-[70%] lg:w-[45%] h-[35rem]'>
           <div className='flex bg-[#231F20] w-full flex-col h-full border-b-[3px] border-r-[3px] rounded-2xl'>
                <div className='flex-col overflow-y-scroll flex items-center justify-between w-full h-full'>
                    <div className='flex w-full h-full justify-between items-center' >
                        <div className='flex pl-[1rem] h-[60px] w-[60px] pt-[1rem]'>
                            <Image onClick={()=> _Function()} className='cursor-pointer' src={l} alt='back' height={30} width={30}/>
                        </div>
                        <div className='flex w-[90%] flex-col text-[#E5BD19] font-nunito text-stroke text-[50px] items-center justify-center'>
                            <p>${lotteryData.ticker ? <>{lotteryData.ticker}</>:"Loading..."}</p> 
                            <p>OIL POTS</p>
                        </div>
                    </div>
                    <div className='flex flex-col w-full p-[1rem] border-y-[2px] text-white font-fredoka border-y-[#E5BD19] rounded-x-xl rounded-t-xl'>
                        
                        <p className='flex w-full justify-center text-[24px] pb-[10px]' onClick={()=>buyTicket()}>Round {lotteryData.currentRound}</p>
                        <p className='text-[18px]'>Tickets Left : {lotteryData.ticketsLeft ?<>{lotteryData.ticketsLeft}/{lotteryData.maxTickets}</>:"Loading ..."}</p>
                        <p className='text-[18px]'>Ticket Price : {lotteryData.ticketPrice ? <>{lotteryData.ticketPrice} {lotteryData.ticker}</>:"Loading ..."}</p>
                        <p className='text-[18px]'>Your Tickets : {lotteryData.userTicketCount? <>{lotteryData.userTicketCount}/{lotteryData.ticketPerUser}</>:"Loading ..."}</p>
                        <p className='text-[18px]'>Balance : {lotteryData.walletBalances ? <>{lotteryData.walletBalances} {lotteryData.ticker}</>:"Loading ..."}</p>
                        {lotteryData.userTicketCount>0? 
                        <div className='w-full items-center h-[8rem] flex text-[18px] gap-1 py-[10px]'>
                            <p>Tickets:</p>
                            <div className=' flex overflow-y-scroll w-[90%] items-center flex-col border-y rounded-lg h-full'>
                            {lotteryData.userOwnedTickets.length ==0 ?<>0 Tickets Owned</>:""}
                            {lotteryData.userOwnedTickets.map((ticket)=>(
                                <div key={ticket[0]} className='flex w-full items-center justify-center flex-col min-h-[50px]'>
                                   {ticket[0].slice(0,5)}...{ticket[0].slice(20)}
                                </div>
                            ))}
                            </div>
                        </div>:""}
                        <div onClick={()=>toggleDashboard()} className='py-[0.5rem] cursor-pointer text-[20px] w-full flex justify-center'>
                            {dashboardActive?"Close Dashboard":"Open Dashboard"}
                        </div>
                    </div>
                    {dashboardActive ?
                    <div className='flex flex-col h-full w-full p-[1rem] text-black font-fredoka bg-[#E5BD19] rounded-b-xl'>
                        <div className='flex w-full font-bold text-[25px] py-[0.5rem] h-full flex-col items-center'>
                            <div>Dashboard Balances :</div> 
                            <div>{lotteryData.caBalances ? <>{lotteryData.caBalances} {lotteryData.ticker}</>:"Loading ..."}</div>
                        </div>
                        <div className='flex w-full h-full justify-center flex-col-reverse items-center gap-[20px]'>
                            <div className='flex w-full h-full flex-col items-center gap-[15px]'>
                                <div className='flex h-full w-full justify-between items-center'>
                                    <input type={'number'} onChange={(e)=>setData({...data,withdrawAmount:e.target.value})} defaultValue={0} placeholder='input amount' className='w-full h-[4rem] rounded-xl bg-[#231F20] text-white'/>
                                </div>
                                <div className='flex justify-center w-full items-center py-[0.5rem]'>
                                    <button onClick={()=>withdraw()} className='text-[21px] bg-[#231F20] text-[#E5BD19] border-[#E5BD19] py-[4px] px-[15px] rounded-2xl'>{data.withdraw} {data.withdrawAmount} {lotteryData.ticker}</button>
                                </div>
                            </div>
                            <div className='flex w-full h-full flex-col items-center gap-[15px]'>
                                <div className='flex w-full h-full justify-between items-center'>
                                    <input type={'number'} onChange={(e)=>setData({...data,depositAmount:e.target.value})} defaultValue={0} placeholder='input amount' className='w-full h-[4rem]  rounded-xl bg-[#231F20] text-white'/>
                                </div>
                                <div className=' flex w-full justify-center items-center py-[0.5rem]'>
                                    <button onClick={()=>deposit()} className='text-[21px] bg-[#231F20] text-[#E5BD19] border-[#E5BD19] py-[4px] px-[15px] rounded-2xl'>{data.deposit} {data.depositAmount} {lotteryData.ticker}</button>
                                </div>
                            </div>
                        </div>
                        {lotteryData.userLastRoundWins.length >0? 
                            <div className='w-full items-center h-full flex flex-col text-[18px] gap-1 py-[10px]'>
                                <p>Prev Round Win Tickets:</p>
                                <div className=' flex bg-[#231F20] text-white overflow-y-scroll w-full items-center flex-col border-y rounded-lg h-[7rem]'>
                                {!lotteryData.userLastRoundWins ?<>0 Tickets Owned</>:""}
                                {lotteryData.userLastRoundWins.map((ticket)=>(
                                    <div key={ticket} className='flex w-full items-center justify-center flex-col min-h-[50px]'>
                                    {ticket.slice(0,5)}...{ticket.slice(20)}
                                    </div>
                                ))}
                                </div>
                            </div>:
                            <div className='flex w-full justify-center py-[0.5rem]'>
                            No Wins in Previous Round    
                            </div>}
                    </div>:
                    <div className='flex flex-col items-center h-full w-full p-[1rem] text-black font-fredoka bg-[#E5BD19] rounded-b-xl'>
                        <div onClick={()=>buyTicket()} className='flex cursor-pointer text-[25px] bg-[#231F20] text-[#E5BD19] px-[15px] py-[5px] rounded-full'>
                            {data.buy}
                        </div>
                    </div>}
                </div>
           </div>
        </div>
    )
}

export default LotteryPage