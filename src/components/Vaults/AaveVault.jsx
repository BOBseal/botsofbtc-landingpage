"use client"
import React,{useContext, useEffect, useState} from "react"
import { AppContext } from "@/context/AppContext"
import { getChainId } from "@/utils/hooks"
import { SepoliaChain } from "@/utils/constants"
import NetworkError from "../CARDS/NetworkError"
import { 
    connectContract,
    getEthBalance
} from "@/utils/hooks"
import Vault from "@/utils/ABIS/Vault.json"
import { erc20Abi } from "viem"
import { ethers } from "ethers"
import Faucet from "@/utils/ABIS/Faucet.json"

const AaveVault=()=>{
    const lnUSDTAddress = "0x58E557cEB48Dc6218717f20fafb417988071F852"
    const lnUSDCAddress = "0x65f138763F6eeD9d2E60630Be997C74603c96322";
    const USDTAddress = "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0"
    const USDCAddress = "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
    const VaultABI = Vault.abi;
    const OneShare = ethers.utils.parseEther("1");
    const {user, connectWallet} = useContext(AppContext)
    const [states,setStates] = useState({
        correctChain:false,
        usdtDeposit:false,
        usdtRedeem:false,
        usdtHideButton:false,
        usdcDeposit:false,
        usdcRedeem:false,
        usdcHideButton:false
    })
    const [inputData , setInputData] = useState({
        usdtDepositInput:0,
        usdtDepositCost:0,
        usdtRedeemInput:0,
        usdtRedeemOutput:0,
        usdcDepositInput:0,
        usdcDepositCost:0,
        usdcRedeemInput:0,
        usdcRedeemOutput:0
    })
    const [data,setData]= useState({});
    const [loaders,setLoaders] = useState({
        dataLoader:false,
        faucetLoaderUSDT:'Claim 10k Test USDT',
        faucetLoaderUSDC:'Claim 10k Test USDC',
        usdtDepositLoader:"BuyShares",
        usdtRedeemLoader:"SellShares"
    })

    const getDataResolver =async()=>{
        try {
            if(!data.fetched && user.wallet){
                await getVaultData();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getVaultData=async()=>{
        try {
            setLoaders({...loaders,dataLoader:true})
            const lendUsdtCa = await connectContract(lnUSDTAddress,VaultABI,user.wallet);
            const USDTCa= await connectContract(USDTAddress,erc20Abi,user.wallet);
            const _tA = await lendUsdtCa.totalAssets();
            const _totalAssets = ethers.utils.formatUnits(_tA,6);
            const _totalSupply = await lendUsdtCa.totalSupply();
            const totalLnUsdtSupply = ethers.utils.formatEther(_totalSupply);
            const _uBst= await USDTCa.balanceOf(user.wallet);
            const _userUsdtBalances = ethers.utils.formatUnits(_uBst,6);
            const _uB = await lendUsdtCa.balanceOf(user.wallet);
            const _userLnUSDTBalances =  ethers.utils.formatEther(_uB);
            const _Ups = await lendUsdtCa.convertToAssets(OneShare);
            const _USDTPerShare = ethers.utils.formatUnits(_Ups,6);
            //////////////////////////////////////////////////////
            const lendUsdcCa = await connectContract(lnUSDCAddress,VaultABI,user.wallet);
            const USDCCa= await connectContract(USDCAddress,erc20Abi,user.wallet);
            const _tAU = await lendUsdcCa.totalAssets();
            const _totalAssetsU = ethers.utils.formatUnits(_tAU,6);
            const _totalSupplyU = await lendUsdcCa.totalSupply();
            const totalLnUsdcSupply = ethers.utils.formatEther(_totalSupplyU);
            const _uBsc= await USDCCa.balanceOf(user.wallet);
            const _userUsdcBalances = ethers.utils.formatUnits(_uBsc,6);
            const _uBC = await lendUsdcCa.balanceOf(user.wallet);
            const _userLnUSDCBalances =  ethers.utils.formatEther(_uBC);
            const _Upc = await lendUsdcCa.convertToAssets(OneShare);
            const _USDCPerShare = ethers.utils.formatUnits(_Upc,6);
            const totalValueLocked = Number(_totalAssets) + Number(_totalAssetsU)
            setData({
                ...data,
                tvl:totalValueLocked,
                usdtValueLocked:Number(_totalAssets),
                usdtUserBalance:Number(_userUsdtBalances),
                lnUsdtUserBalance:Number(_userLnUSDTBalances),
                lnUsdtValue:Number(_USDTPerShare),
                lnUsdtSupply:Number(totalLnUsdtSupply),
                usdcValueLocked:Number(_totalAssetsU),
                usdcUserBalance:Number(_userUsdcBalances),
                lnUsdcUserBalance:Number(_userLnUSDCBalances),
                lnUsdcValue:Number(_USDCPerShare),
                lnUsdcSupply:Number(totalLnUsdcSupply),
                fetched:true
            })
            setLoaders({...loaders,dataLoader:false})
            console.log(_userLnUSDTBalances,_userLnUSDCBalances)
        } catch (error) {
            setLoaders({...loaders,dataLoader:false})
            console.log(error);
        }
    }
    
    const resolveChain=async()=>{
        try {
            if(!user.wallet){
                connectWallet();
            }
            const ch =await getChainId();
            if(ch === SepoliaChain.chainId){
                setStates({...states,correctChain:true})
            }else {
                setStates({...states,correctChain:false})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const toggleUsdtButtons=(isDeposit , close)=>{
        try {
            if(!close){
                if(isDeposit){
                    setStates({...states,usdtDeposit:true,usdtRedeem:false,usdtHideButton:true})
                }else {
                    setStates({...states,usdtDeposit:false,usdtRedeem:true,usdtHideButton:true})
                }
            }else {
                    setInputData({...inputData,usdtDepositInput:0,
                        usdtDepositCost:0,
                        usdtRedeemInput:0,
                        usdtRedeemOutput:0,})
                    setStates({...states,usdtDeposit:false,usdtRedeem:false,usdtHideButton:false})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleUsdcButtons=(isDeposit , close)=>{
        try {
            if(!close){
                if(isDeposit){
                    setStates({...states,usdcDeposit:true,usdcRedeem:false,usdcHideButton:true})
                }else {
                    setStates({...states,usdcDeposit:false,usdcRedeem:true,usdcHideButton:true})
                }
            }else {
                    setInputData({...inputData,
                        usdcDepositInput:0,
                        usdcDepositCost:0,
                        usdcRedeemInput:0,
                        usdcRedeemOutput:0})
                    setStates({...states,usdcDeposit:false,usdcRedeem:false,usdcHideButton:false})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const previewUsdtDeposit =async(e)=>{
        try {
            const value = e.target.value;
            const lendUsdtCa = await connectContract(lnUSDTAddress,VaultABI,user.wallet);
            const decimals = await lendUsdtCa.decimals();
            const valStr = value.toString();
            const formattedNum = ethers.utils.parseUnits(valStr,Number(decimals));
            const preview =await lendUsdtCa.previewMint(formattedNum);
            const formattedPreview = ethers.utils.formatUnits(preview,6);
            console.log(formattedPreview)
            setInputData({...inputData,usdtDepositInput:value, usdtDepositCost:Number(formattedPreview)})
            return preview;
        } catch (error) {
            setInputData({...inputData,usdtDepositInput:0, usdtDepositCost:0})
            console.log(error)
        }
    }

    const previewUsdtRedeem = async(e)=>{
        try {
            const value = e.target.value;
            const lendUsdtCa = await connectContract(lnUSDTAddress,VaultABI,user.wallet);
            const decimals = await lendUsdtCa.decimals();
            const valStr = value.toString();
            const formattedNum = ethers.utils.parseUnits(valStr,Number(decimals));
            const preview =await lendUsdtCa.previewRedeem(formattedNum);
            const formattedPreview = ethers.utils.formatUnits(preview,6);
            console.log(formattedPreview)
            setInputData({...inputData,usdtRedeemInput:value, usdtRedeemOutput:Number(formattedPreview)})
            return preview
        } catch (error) {
            setInputData({...inputData,usdtRedeemInput:0, usdtRedeemOutput:0})
            console.log(error)
        }   
    }

    const previewUsdcDeposit =async(e)=>{
        try {
            try {
                const value = e.target.value;
                const lendUsdtCa = await connectContract(lnUSDCAddress,VaultABI,user.wallet);
                const decimals = await lendUsdtCa.decimals();
                const valStr = value.toString();
                const formattedNum = ethers.utils.parseUnits(valStr,Number(decimals));
                const preview =await lendUsdtCa.previewMint(formattedNum);
                const formattedPreview = ethers.utils.formatUnits(preview,6);
                console.log(formattedPreview)
                setInputData({...inputData,usdcDepositInput:value, usdcDepositCost:Number(formattedPreview)})
                return preview
            } catch (error) {
                setInputData({...inputData,usdcDepositInput:0, usdcDepositCost:0})
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const previewUsdcRedeem = async(e)=>{
        try {
            const value = e.target.value;
            const lendUsdtCa = await connectContract(lnUSDCAddress,VaultABI,user.wallet);
            const decimals = await lendUsdtCa.decimals();
            const valStr = value.toString();
            const formattedNum = ethers.utils.parseUnits(valStr,Number(decimals));
            const preview =await lendUsdtCa.previewRedeem(formattedNum);
            const formattedPreview = ethers.utils.formatUnits(preview,6);
            console.log(formattedPreview)
            setInputData({...inputData,usdcRedeemInput:value, usdcRedeemOutput:Number(formattedPreview)})
            return preview
        } catch (error) {
            setInputData({...inputData,usdcRedeemInput:0, usdcRedeemOutput:0})
            console.log(error)
        }   
    }

    const claimFaucet =async(isUSDC)=>{
        try {
            let toMint = isUSDC? USDCAddress : USDTAddress;
            if(isUSDC){
                setLoaders({...loaders,faucetLoaderUSDC:"Claiming ..."})
            } else {
                setLoaders({...loaders,faucetLoaderUSDT:"Claiming ..."})
            }
            const fAddress ="0xC959483DBa39aa9E78757139af0e9a2EDEb3f42D";
            const faucetContract = await connectContract(fAddress,Faucet.abi,user.wallet);
            const mintAmount = "10000"
            const formatAmount = ethers.utils.parseUnits(mintAmount,6);
            const mint = await faucetContract.mint(toMint,user.wallet,formatAmount);
            mint.wait().then(async()=>{
                await getVaultData();
            })
        
            if(isUSDC){
                setLoaders({...loaders,faucetLoaderUSDC:"Claim 10k Test USDC"})
            } else {
                setLoaders({...loaders,faucetLoaderUSDT:"Claim 10k Test USDT"})
            }
        } catch (error) {
            setLoaders({...loaders,faucetLoaderUSDC:"Claim 10k Test USDC",faucetLoaderUSDT:"Claim 10k Test USDT"})
            console.log(error);
        }
    }

    const usdtDeposit=async()=>{
        try {
            setLoaders({...loaders,usdtDepositLoader:"Approving"})
            const lendUsdtCa = await connectContract(lnUSDTAddress,VaultABI,user.wallet);
            const usdtCa = await connectContract(USDTAddress,erc20Abi,user.wallet)
            const decimals = await lendUsdtCa.decimals();
            if(inputData.usdtDepositInput == 0){
                alert("Minimum shares to buy must be Greater than 0")
                setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                return
            }
            const value = inputData.usdtDepositInput.toString()
            const formattedNum = ethers.utils.parseUnits(value,decimals);
            const usdtAmount = await lendUsdtCa.previewMint(formattedNum);
            const formatAmount = ethers.utils.formatUnits(usdtAmount,6);
            const addToFormat = Number(formatAmount) + 1;
            const formatToStr = addToFormat.toString();
            const reformat = ethers.utils.parseUnits(formatToStr,6);
            const userUsdtBalance = await usdtCa.balanceOf(user.wallet);
            const formattedBalance = ethers.utils.formatUnits(userUsdtBalance,6);
            ///// BALANCE CHECK //////
            if(Number(formattedBalance)<formatAmount){
                alert("Not Enough USDT , Claim some test USDT and try again");
                setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                return
            }
            /////// APPROVAL //////
            const approve =await usdtCa.approve(lnUSDTAddress,reformat);
            approve.wait().then(async()=>{
                ////// MINT SHARES ///////
                setLoaders({...loaders,usdtDepositLoader:"Buying"})
                const mint = await lendUsdtCa.mint(formattedNum,user.wallet);
                mint.wait().then(async()=>{
                    setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                    await getVaultData()
                })
            })
        } catch (error) {
            setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
            console.log(error)
        }
    }

    const usdtRedeem=async()=>{
        try {
            setLoaders({...loaders,usdtRedeemLoader:"Selling"})
            const lendUsdtCa = await connectContract(lnUSDTAddress,VaultABI,user.wallet);
            const num = inputData.usdtRedeemInput;
            const bal = await lendUsdtCa.balanceOf(user.wallet)
            const balanceFormat = ethers.utils.formatEther(bal)
            if(Number(balanceFormat)<num){
                alert("Cannot redeem more Shares than you hold")
                setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
                return
            }
            const numStr = num.toString();
            const numFormat = ethers.utils.parseUnits(numStr,18);
            const redeem = await lendUsdtCa.redeem(numFormat,user.wallet,user.wallet);
            redeem.wait().then(async()=>{
                await getVaultData()
                setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
            })
        } catch (error) {
            setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            resolveChain();
            getDataResolver();
        } catch (error) {
            console.log(error)
        }
      }, [user.wallet]);

    return(
        <div className="bg-[#231F20] h-full w-full border-b-[3px] border-[#E5BD19]">
            <div className="flex flex-col items-center w-full h-full py-[20px]">
                <h1 className="font-fredoka text-[28px] md:text-[35px] text-[#E5BD19]">LENDING VAULTS</h1>
                {/* NETWORK ERROR*/}
                {states.correctChain?
                <div className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-col text-white w-full px-[10px] justify-center md:px-[1rem]">
                    Tokenized Vaults that are powered by AAVE and generate Dual Yields form
                    Supplying Assets to AAVE + Vault Fee rewarding long term holders with Boosted Yields than just supplying to AAVE alone.
                    <div className="hover:underline w-[8rem] hover:text-blue-400 cursor-pointer">Learn More ...</div>
                    </div>
                    
                    <div className="flex border-y border-y-[3px] py-[0.4rem] px-[2rem] border-black w-[75%] justify-center md:w-[50%] lg:w-[25%] mt-[1rem] text-black bg-[#E5BD19]">
                        <div className="text-[20px] md:text-[25px] lg:text-[28px] font-nunito">TVL : {data.tvl ? <>{parseFloat(data.tvl.toFixed(2))}</>:"0"} tUSD</div>
                    </div>
                    
                    <div className="flex w-full md:w-[80%] py-[1rem] justify-evenly h-full">
                        <div>
                            <button onClick={()=> claimFaucet(false)} className="bg-[#E5BD19] hover:scale-105 font-nunito p-[5px] rounded-xl text-black">{loaders.faucetLoaderUSDT}</button>
                        </div>
                        <div>
                            <button onClick={()=> claimFaucet(true)} className="bg-[#E5BD19] hover:scale-105 font-nunito p-[5px] rounded-xl text-black">{loaders.faucetLoaderUSDC}</button>
                        </div>
                    </div>
                    {/* VAULTS LAYOUT */}
                    
                    <div className="flex flex-col md:flex-row w-full md:w-[95%] lg:w-[50%] gap-[20px] lg:gap-[3rem] items-center justify-center mt-[2rem]">
                        
                        <div className="border-l-[2px] border-b-[2px] rounded-xl gap-[10px] w-[95%] py-[20px] h-full flex flex-col items-center">
                            <h2 className="text-[#E5BD19] font-fredoka text-[22px]">AAVE LEND USDT - lnUSDT</h2>
                            <div className="w-full text-[16px] text-white font-nunito md:w-[90%] flex flex-col px-[20px] md:px-[25px]">
                                <p>Lending APY : N/A</p>
                                <p>Vault Boostrap : 0.1 USDT per lnUSDT</p>
                                <p>Value Locked : $ {data.usdtValueLocked ? <>{parseFloat(data.usdtValueLocked.toFixed(2))}</>:"0"}</p>
                                <p>Share Value : {data.lnUsdtValue ? <>{parseFloat(data.lnUsdtValue.toFixed(6))}</>:"0"} USDT</p>
                                <p>Vault Fee : 0.5% </p>
                                <p>lnUSDT Balance : {data.lnUsdtUserBalance ? <>{parseFloat(data.lnUsdtUserBalance.toFixed(2))}</>:"0"} lnUSDT</p>
                                <p>USDT Balance : {data.usdtUserBalance ? <>{parseFloat(data.usdtUserBalance.toFixed(2))}</>:"0"} USDT</p>
                                {states.usdtDeposit ? <p>Cost : {inputData.usdtDepositCost? <>{inputData.usdtDepositCost}</>:"0"} USDT</p> :""}
                                {states.usdtRedeem ? <p>Recieve : {inputData.usdtRedeemOutput? <>{inputData.usdtRedeemOutput}</>:"0"} USDT</p> :""}
                            </div>
                            <div className="flex flex-col w-full items-center gap-[15px]">
                            {states.usdtDeposit ? <div className="flex w-full flex-col items-center justify-center gap-[5px]">                              
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] rounded-lg" type={`number`} onChange={(e)=> previewUsdtDeposit(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=>usdtDeposit()} className="bg-[#E5BD19] text-black px-[10px] hover:scale-105 font-nunito text-[18px] rounded-xl">
                                        {loaders.usdtDepositLoader}
                                    </button>
                                    <button onClick={()=>toggleUsdtButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
                                </div> :""}
                                
                                {states.usdtRedeem ? <div className="flex flex-col w-full items-center justify-center gap-[5px]">
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] rounded-lg" type={`number`} onChange={(e)=> previewUsdtRedeem(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=> usdtRedeem()} className="bg-[#E5BD19] text-black hover:scale-105 px-[10px] font-nunito text-[18px] rounded-xl">
                                        {loaders.usdtRedeemLoader}
                                    </button>
                                    <button onClick={()=>toggleUsdtButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
                                </div> :""}
                                {!states.usdtHideButton ?<div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=> toggleUsdtButtons(true,false)} className="bg-[#E5BD19] hover:scale-105 px-[10px] font-nunito text-[18px] rounded-xl">
                                        Deposit
                                    </button>
                                    <button onClick={()=> toggleUsdtButtons(false,false)} className="bg-[#E5BD19] hover:scale-105 px-[10px] font-nunito rounded-xl text-[18px]">
                                        Redeem
                                    </button>       
                                </div>:""}
                            </div>
                        </div>

                        <div className="border-l-[2px] w-[95%] border-b-[2px] rounded-xl py-[20px] gap-[10px] h-full flex flex-col items-center">
                            <h2 className="text-[#E5BD19] font-fredoka text-[22px]">AAVE LEND USDC - lnUSDC</h2>
                            <div className="w-full text-[16px] text-white font-nunito md:w-[90%] flex flex-col px-[20px] md:px-[25px]">
                                <p>Lending APY : N/A</p>
                                <p>Vault Boostrap: 0.1 USDC per lnUSDC</p>
                                <p>Value Locked : ${data.usdcValueLocked ? <>{parseFloat(data.usdcValueLocked.toFixed(2))}</>:"0"}</p>
                                <p>Share Value : {data.lnUsdcValue ? <>{parseFloat(data.lnUsdcValue.toFixed(6))}</>:"0"} USDC</p>
                                <p>Vault Fee : 0.5%</p>
                                <p>lnUSDC Balance : {data.lnUsdcUserBalance ? <>{parseFloat(data.lnUsdcUserBalance.toFixed(2))}</>:"0"} lnUSDC</p>
                                <p>USDC Balance : {data.usdcUserBalance ? <>{parseFloat(data.usdcUserBalance.toFixed(2))}</>:"0"} USDC</p>
                                {states.usdcDeposit ? <p>Cost : {inputData.usdcDepositCost?<>{inputData.usdcDepositCost}</>:"0"} USDC</p> :""}
                                {states.usdcRedeem ? <p>Recieve : {inputData.usdcRedeemOutput?<>{inputData.usdcRedeemOutput}</>:"0"} USDC</p> :""}
                            </div>
                            <div className="flex flex-col w-full items-center gap-[15px]">
                                {states.usdcDeposit ? <div className="flex w-full flex-col items-center justify-center gap-[5px]">                              
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] rounded-lg" type={`number`} onChange={(e)=>previewUsdcDeposit(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                       BuyShares
                                    </button>
                                    <button onClick={()=>toggleUsdcButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
                                </div> :""}
                                
                                {states.usdcRedeem ? <div className="flex flex-col w-full items-center justify-center gap-[5px]">
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] rounded-lg" type={`number`} onChange={(e)=> previewUsdcRedeem(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        SellShares
                                    </button>
                                    <button onClick={()=>toggleUsdcButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
                                </div> :""}
                                {!states.usdcHideButton ?<div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=>toggleUsdcButtons(true,false)} className="bg-[#E5BD19] hover:scale-105 px-[10px] font-nunito text-[18px] rounded-xl">
                                        Deposit
                                    </button>
                                    <button onClick={()=> toggleUsdcButtons(false,false)} className="bg-[#E5BD19] hover:scale-105 px-[10px] font-nunito rounded-xl text-[18px]">
                                        Redeem
                                    </button>       
                                </div>:""}
                            </div>
                        </div>
                    </div>


                </div>:<NetworkError data={"SEPOLIA TESTNET"}/>}
            </div>
        </div>
    )
}

export default AaveVault