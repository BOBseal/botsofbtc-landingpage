"use client"
import React,{useContext, useEffect, useState} from "react"
import { AppContext } from "@/context/AppContext"
import { getChainId } from "@/utils/hooks"
import { BOB_MAINNET } from "@/utils/constants"
import NetworkError from "../CARDS/NetworkError"
import { 
    connectContract,
    getEthBalance
} from "@/utils/hooks"
import Vault from "@/utils/ABIS/Multi4626V1.json"
import { erc20Abi } from "viem"
import { ethers } from "ethers"
import Faucet from "@/utils/ABIS/Faucet.json"
import Link from "next/link"
import Image from "next/image"
import { partnerInfo } from "@/configs/config"
import okuLogo from "../../assets/Oku.svg"
import apiLogo from "../../assets/api3lgo.svg"

const AaveVault=()=>{
    const BethAddress = "0xf9bcffb46e008ff75006a7c906976bDC6d89615D"
    const USDTAddress = "0x05D032ac25d322df992303dCa074EE7392C117b9"
    const VaultABI = Vault.abi;
    const {user, connectWallet} = useContext(AppContext)
    const [states,setStates] = useState({
        correctChain:false,
        usdtDeposit:false,
        usdtRedeem:false,
        usdtHideButton:false
    })
    const [inputData , setInputData] = useState({
        usdtDepositInput:0,
        usdtDepositCost:0,
        usdtRedeemInput:0,
        usdtRedeemOutput:0
    })
    const [data,setData]= useState({});
    const [loaders,setLoaders] = useState({
        dataLoader:false,
        usdtDepositLoader:"BuyShares",
        usdtRedeemLoader:"SellShares",
        
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
            const vaultCa = await connectContract(BethAddress,VaultABI,user.wallet);
            const usdtCa = await connectContract(USDTAddress,erc20Abi,user.wallet);
            const bethDecimals = await vaultCa.decimals();
            const usdtDecimals = await usdtCa.decimals();
            const userBethBalance = await vaultCa.balanceOf(user.wallet);
            const formatBethBalance = ethers.utils.formatUnits(userBethBalance,Number(bethDecimals));
            const userUsdtBalance = await usdtCa.balanceOf(user.wallet);
            const formatUsdtBalance = ethers.utils.formatUnits(userUsdtBalance,Number(usdtDecimals));
            const pricePerShare = await vaultCa.pricePerShare();
            const formatPrice = ethers.utils.formatEther(pricePerShare);
            const totalAssetsData = await vaultCa.totalAssets();
            const tvl = ethers.utils.formatEther(totalAssetsData[0]);
            const priceList = totalAssetsData[1];
            const btcPrice = ethers.utils.formatEther(priceList[0]);
            const ethPrice = ethers.utils.formatEther(priceList[1])
            setData({...data,
                userBethBalance:Number(formatBethBalance),
                userUsdtBalance:Number(formatUsdtBalance),
                sharePrice:Number(formatPrice),
                tvl:Number(tvl),
                ethPrice:Number(ethPrice),
                btcPrice:Number(btcPrice)
            })            
            setLoaders({...loaders,dataLoader:false})
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
            if(ch === BOB_MAINNET[0].chainId){
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
                    setInputData({...inputData,usdtDepositInput:0,
                        usdtDepositCost:0,
                        usdtRedeemInput:0,
                        usdtRedeemOutput:0,})
                }else {
                    setStates({...states,usdtDeposit:false,usdtRedeem:true,usdtHideButton:true})
                    setInputData({...inputData,usdtDepositInput:0,
                        usdtDepositCost:0,
                        usdtRedeemInput:0,
                        usdtRedeemOutput:0,})
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

    const previewUsdtDeposit =async(e)=>{
        try {
            const value = Number(e.target.value) ;
            const vaultCa = await connectContract(BethAddress,VaultABI,user.wallet);
            const decimals =await vaultCa.decimals();
            const onePercent = Number(value)/100;
            let ssss = 0;
            if(value>100){
                console.log(onePercent)
                ssss = Number(value)+onePercent;
                console.log(ssss)
            } else {
                ssss = Number(value)+1;
                console.log(ssss)
            }
            const valStr = ssss.toString()
            const format = ethers.utils.parseUnits(valStr,Number(decimals))
            const preview =await vaultCa.previewMint(format);
            const formattedPreview =  ethers.utils.formatUnits(preview,6)
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
            const vaultCa = await connectContract(BethAddress,VaultABI,user.wallet);
            const decimals =await vaultCa.decimals();
            const valStr = value.toString()
            const format = ethers.utils.parseUnits(valStr,Number(decimals))
            const preview =await vaultCa.previewRedeem(format);
            const formattedPreview =  ethers.utils.formatUnits(preview,18)
            setInputData({...inputData,usdtRedeemInput:value, usdtRedeemOutput:Number(formattedPreview)})
            return preview
        } catch (error) {
            setInputData({...inputData,usdtRedeemInput:0, usdtRedeemOutput:0})
            console.log(error)
        }   
    }

    const usdtDeposit=async()=>{
        try {
            setLoaders({...loaders,usdtDepositLoader:"Approving"})
            const vaultCa = await connectContract(BethAddress,VaultABI,user.wallet);
            const usdtCa = await connectContract(USDTAddress,erc20Abi,user.wallet);
            const vaultDecimals = await vaultCa.decimals();
            if(inputData.usdtDepositInput < 50){
                alert("Minimum shares to buy must be Greater than 50")
                setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                return
            }

            if(inputData.usdtDepositInput > 10000){
                alert("Maximum of 10000 Shares can be minted in One Tx")
                setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                return
            }
            const toMint =inputData.usdtDepositInput;
            const toMintRefactor = Number(toMint)+1; 
            const val = toMintRefactor.toString();
            const formatVal = ethers.utils.parseUnits(val,vaultDecimals);
            const usdtAmount = await vaultCa.previewMint(formatVal);
            const formatAmount = ethers.utils.formatUnits(usdtAmount,6);
            const addToFormat = Number(formatAmount) + 1;
            const formatToStr = addToFormat.toString();
            const reformat = ethers.utils.parseUnits(formatToStr,6);
            const userUsdtBalance = await usdtCa.balanceOf(user.wallet);
            const formattedBalance = ethers.utils.formatUnits(userUsdtBalance,6);
            if(Number(formattedBalance)<formatAmount){
                alert("Not Enough USDT , buy some USDT and try again");
                setLoaders({...loaders,usdtDepositLoader:"BuyShares"})
                return
            }
            const approve = await usdtCa.approve(BethAddress,reformat);
            approve.wait().then(async()=>{
                setLoaders({...loaders,usdtDepositLoader:"Buying"})
                const mint = await vaultCa.mint(formatVal,user.wallet)
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
            const vaultCa = await connectContract(BethAddress,VaultABI,user.wallet);
            const num = inputData.usdtRedeemInput;
            const decimals = await vaultCa.decimals();
            const bal = await vaultCa.balanceOf(user.wallet)
            const balanceFormat = ethers.utils.formatUnits(bal,Number(decimals));
            if(Number(balanceFormat)<num){
                alert("Cannot redeem more Shares than you hold")
                setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
                return
            }
            const numStr = num.toString();
            const numFormat = ethers.utils.parseUnits(numStr,Number(decimals));
            const redeem =  await vaultCa.redeem(numFormat,user.wallet);
            redeem.wait().then(async()=>{
                await getVaultData()
                setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
            })
                        
        } catch (error) {
            setLoaders({...loaders,usdtRedeemLoader:"SellShares"})
            console.log(error)
        }
    }

    const estimateMaxUsdtDeposit = async () => {
        try {
            const value = data.userUsdtBalance; // User's balance in USDT (6 decimals)
            if (!value || value <= 0) {
                throw new Error("Invalid USDT balance");
            }
    
            const lendUsdtCa = await connectContract(BethAddress, VaultABI, user.wallet);
    
            // Get the latest share price in USDT terms (18 decimals)
            const pricePerShare = await lendUsdtCa.pricePerShare();
    
            // Convert user balance to 26 decimals
            const userBalanceInUsdt = ethers.utils.parseUnits(value.toString(), 6);
    
            // ✅ Scale pricePerShare to 26 decimals by multiplying it by 10^8
            const scaledPricePerShare = pricePerShare.mul(ethers.BigNumber.from("10").pow(8));
    
            // ✅ Now calculate max shares without truncation
            const maxShares = userBalanceInUsdt
                .mul(ethers.BigNumber.from("10").pow(26)) // Scale USDT balance to 26 decimals
                .div(scaledPricePerShare); // Divide by 26-decimal adjusted price
    
            // ✅ Set minimum buyable shares (1 share with 26 decimals)
            const minBuyableShares = ethers.utils.parseUnits("1", 26);
    
            // ✅ Prevent fractional truncation (return 0 if < 1 share)
            const estimatedShares = maxShares.gte(minBuyableShares) ? maxShares : ethers.BigNumber.from("0");
    
            // ✅ Convert shares to human-readable format
            const formattedShares = ethers.utils.formatUnits(estimatedShares, 26);
    
            console.log("✅ Estimated Max Shares:", formattedShares);
    
            setInputData({
                ...inputData,
                usdtDepositInput: Number(formattedShares),
                usdtDepositCost: value,
            });
    
        } catch (error) {
            console.error("❌ Error estimating max USDT deposit:", error);
            setInputData({
                ...inputData,
                usdtDepositInput: 0,
                usdtDepositCost: 0,
            });
        }
    };
        
    const estimateMaxUsdtRedeem = async()=>{
        try {
            
        } catch (error) {
            setInputData({...inputData,usdtRedeemInput:0, usdtRedeemOutput:0})
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
                <h1 className="font-fredoka text-[28px] md:text-[35px] text-[#E5BD19]">BTC-ETH (BETH) - BETA</h1>
                {/* NETWORK ERROR*/}
                {states.correctChain?
                <div className="flex flex-col items-center gap-[3rem] w-full h-full">
                    <div className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-col text-white w-full md:w-[90%] lg:w-[60%] px-[10px] justify-center md:px-[1rem]">
                    BTC-ETH (BETH) is a modified ERC-4626 tokenized vault designed to function as an index fund backed by Bitcoin (BTC) and Ethereum (ETH). It also acts as a hybrid ERC20 token, with its value directly influenced by the prices of the underlying BTC and ETH assets. The BETH Vault is designed to eventually serve as a liquidity layer for the WBTC-WETH pair on OKU (Uni v3), aiming to generate real yield for its underlying assets. This yield, once enabled, will contribute to pushing the base price floor of BETH shares higher over time — ensuring sustainable growth and value appreciation for its holders.
                    <Link href={'https://botsofbtc.notion.site/BTC-ETH-Hybrid-Vault-V1-1a2dae0f14ca80718af1eb8e16d9c918?pvs=4'} target={'_blank'}>
                        <div className="hover:underline w-[8rem] hover:text-blue-400 cursor-pointer">Learn More ...</div>
                    </Link>
                    </div>
                   
                    <div className="flex border-y border-y-[3px] py-[0.4rem] px-[2rem] border-black w-[75%] justify-center md:w-[50%] lg:w-[25%] mt-[1rem] text-black bg-[#E5BD19]">
                        <div className="text-[20px] md:text-[25px] lg:text-[28px] font-nunito">TVL : {data.tvl ? <>{parseFloat(data.tvl.toFixed(2))}</>:"0"} USD</div>
                    </div>

                    {/* VAULT LAYOUT */}
                    <div className="flex flex-col md:flex-row w-[90%] md:w-[60%] lg:w-[33%] gap-[20px] lg:gap-[3rem] items-center justify-center mt-[2rem]">
                        
                        <div className="border-l-[2px] border-b-[2px] rounded-xl gap-[10px] w-[95%] py-[20px] h-full flex flex-col items-center">
                            <h2 className="text-[#E5BD19] font-fredoka text-[22px]">BTC-ETH - BETH</h2>
                            <div className="w-full text-[16px] text-white font-nunito md:w-[90%] flex flex-col px-[20px] md:px-[25px]">
                                <p>Share Value : {data.sharePrice ? <>{parseFloat(data.sharePrice.toFixed(6))}</>:"0"} USDT</p>
                                <p>BTC Price :{data.btcPrice ? <>{parseFloat(data.btcPrice.toFixed(2))}</>:"0"} USDT</p>
                                <p>ETH Price :{data.ethPrice ? <>{parseFloat(data.ethPrice.toFixed(2))}</>:"0"} USDT</p>
                                <p>Vault Fee : 0.25% + Slippage & Swap Fee</p>
                                <p>BETH Balance : {data.userBethBalance ? <>{parseFloat(data.userBethBalance.toFixed(2))}</>:"0"} BETH</p>
                                <p>USDT Balance : {data.userUsdtBalance ? <>{parseFloat(data.userUsdtBalance.toFixed(2))}</>:"0"} USDT</p>
                                {states.usdtDeposit ? <p>Cost : {inputData.usdtDepositCost? <>{inputData.usdtDepositCost}</>:"0"} USDT</p> :""}
                                {states.usdtRedeem ? <p>Recieve : {inputData.usdtRedeemOutput? <>{inputData.usdtRedeemOutput}</>:"0"} USDT</p> :""}
                            </div>
                            <div className="flex flex-col w-full items-center gap-[15px]">
                            {states.usdtDeposit ? <div className="flex w-full flex-col items-center justify-center gap-[5px]">                              
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] text-white rounded-lg" value={inputData.usdtDepositInput} type={`number`} onChange={(e)=> previewUsdtDeposit(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=>usdtDeposit()} className="bg-[#E5BD19] text-black px-[10px] hover:scale-105 font-nunito text-[18px] rounded-xl">
                                        {loaders.usdtDepositLoader}
                                    </button>
                                    <div className="flex">
                                    <button onClick={()=>toggleUsdtButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
                                    </div>
                                </div> :""}
                                
                                {states.usdtRedeem ? <div className="flex flex-col w-full items-center justify-center gap-[5px]">
                                    <input className="flex bg-transparent border w-[80%] h-[2.5rem] text-white rounded-lg" value={inputData.usdtRedeemInput} type={`number`} onChange={(e)=> previewUsdtRedeem(e)}/>
                                    <div className="flex w-[80%] text-black justify-between px-[20px]">
                                    <button onClick={()=> usdtRedeem()} className="bg-[#E5BD19] text-black hover:scale-105 px-[10px] font-nunito text-[18px] rounded-xl">
                                        {loaders.usdtRedeemLoader}
                                    </button>
                                    
                                    <div className="flex">
                                    
                                    <button onClick={()=>toggleUsdtButtons(true,true)} className="bg-[#E5BD19] hover:scale-105 text-black px-[10px] font-nunito text-[18px] rounded-xl">
                                        Close
                                    </button>
                                    </div>
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
                        </div>
                </div>

                
                <div className="text-[15px] w-[95%] border-b-[2px] py-[0.5rem] md:w-auto font-fredoka flex flex-col items-center bg-transparent text-white p-[5px] rounded-2xl ">
                POWERED BY :
                    <div className="flex gap-[0.5rem] cursor-pointer pt-[0.3rem] justify-evenly w-full md:w-[25rem]">
                        <Link href={"https://api3.org"} target={'_blank'}>
                            <Image src={apiLogo} height={50} width={50} alt="powered" />{" "}
                        </Link>
                        <Link href={"https://oku.trade"} target={'_blank'}>
                            <Image src={okuLogo} height={100} width={60} alt="powered" />{" "}
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col text-[10px] w-[90%] md:w-[70%] lg:w-[50%]">
                    <p>disclaimer*</p>
                    <p>BETH vault is currently a BETA product and may incurr losses during high volatility conditions and is affected by market & AMM conditions. Value of BETH is directly influenced by the Value of Bitcoin and Ethereum. Bots Of Bitcoin holds no responsibility of losses incurred during the BETA launch of this product , please DYOR</p>
                </div>
                </div>:<NetworkError data={"BOB Mainnet"}/>}
            </div>
        </div>
    )
}

export default AaveVault