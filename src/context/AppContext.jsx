'use client'

import React, {useState , useEffect} from "react"
import {BOB_MAINNET, IceRouterAbi , IceRouterAddress, IceCream,Skib} from "../utils/constants"
import { ethers } from "../../node_modules/ethers/lib/index"
import { 
    addNetwork,
    changeNetwork,
    connectContract,
    unixToGeneralTime,
    connectMetamask,
    getChainId,
    getEthBalance,
    walletSign,
    swapExactEthToToken,
    swapExactTokenToEth,
    swapExactTokenToToken,
    getMinterContract,
    getRampageCa,
    getRpCoreContract,
    getNFTCa,
    getErc20CA,
    getErc20Balances,
    formatNumber,
    getIceContract,
    connectRPCCa
 } from "../utils/hooks"
 import { supportedList } from "@/configs/config"

export const AppContext = React.createContext();

export const AppProvider =({children})=>{

    const findTokenByTicker = (ticker) => {
        return Object.values(supportedList).find(token => token.ticker === ticker);
    };

    const [user , setUser] = useState({});
    const [act , setAct] = useState(0);
    const [utils , setUtils] = useState(0);
    const [states, setStates] = useState({
        mobileMenuOpen: false ,
        contentsSubmenuOpen: false,
      })
    const projectCode = "lqh3jh"
    const [fusionData, setFusionData] = useState({})
    const zeroAddr = "0x0000000000000000000000000000000000000000"
    const [dexStates , setDexStates] = useState({
        amountOut:'',
        amountIn:'',
        tokenIn:'WETH',
        tokenOut:'USDT',
        type:'NATIVE',
        outBalance:'',
        inBalance:''
    })
    const [loaders , setLoaders] = useState({
        dailyLogin:false,
        swap:""
    });
    const [sobMint, setSobMint] = useState({
        amount:1
    })
    const [rampageData,setRampageData] = useState({})
    const connectWallet = async()=>{
        try {
            const accounts = await connectMetamask();
            if(accounts.wallet){
                const chainId = await getChainId();
                const correctChain = chainId === BOB_MAINNET[0].chainId ? true : false;
                const res =await walletSign("BOTS OF BITCOIN wants you to sign in and confirm wallet ownership. ARE YOU FRIKKIN READY TO RAMPAGE !!?" , accounts.wallet);                
         
                if(res)

                {   
                    const ethBalances = await getEthBalance(accounts.wallet); 
                    setUser({...user , wallet:accounts.wallet , chainId: chainId , correctChain: correctChain , ethBalance: ethBalances});
                    const tokenIn = findTokenByTicker(dexStates.tokenIn);
                    const tokenOut = findTokenByTicker(dexStates.tokenOut);
                    let tokenInBalances,tokenOutBalances;
                    if(tokenIn.address === zeroAddr){
                        tokenInBalances = ethBalances;
                    }
                    if(tokenOut.address === zeroAddr){
                        tokenOutBalances = await getEthBalance(accounts.wallet);
                    }
                    if(tokenIn.address != zeroAddr){
                        tokenInBalances = await getErc20Balances(tokenIn.address,accounts.wallet);
                    }
                    if(tokenOut.address != zeroAddr){
                        tokenOutBalances = await getErc20Balances(tokenOut.address,accounts.wallet);
                    }
                    console.log(tokenInBalances,tokenOutBalances)
                    setDexStates({...dexStates,outBalance:tokenOutBalances , inBalance:tokenInBalances})
                }
            }
            return accounts.wallet;
        } catch (error) {
            console.log(error)
        }
    }

    const openMobileMenu=()=>{
        if(states.mobileMenuOpen){
          setStates({...states,mobileMenuOpen:false})
          console.log(false)
          
        }
        if(!states.mobileMenuOpen){
          setStates({...states,mobileMenuOpen:true})
          console.log(true)
        }
    }

    function getPartnerByName(partners, name) {
        // Find the partner object with the matching name
        const partner = partners.find(partner => partner.name === name);
        
        // Return the found partner object or null if not found
        return partner || null;
      }

    const getFusionData=async()=>{
    try {
        const res = await fetch("https://fusion-api.gobob.xyz/partners");
        const data = await res.json();
        const ourProject = getPartnerByName(data.partners,"BOTS OF BITCOIN");
        console.log(ourProject)
        const ourPoints = ourProject.total_points;
        const nnnn = formatNumber(ourPoints);
        setFusionData({...fusionData, apiResponse: data, ok: res.ok , projectData:ourProject, totalPoints:nnnn});
        console.log(data)
    } catch (error) {
        console.log(error)
    }
    }

    const mintStarted = async()=>{
        try {
            const ca =await getMinterContract();
            const Bool = ca.mintStarted();
            return Bool
        } catch (error) {
            console.log(error);
        }
    }

    const getSupplyLeft =async()=>{
        try {
            const ca = await getMinterContract();
            const supp = await ca.supplyLeft();
            //console.log(supp);
            return supp
        } catch (error) {
            console.log(error);
        }
    }

    const getCurrentRound = async()=>{
        try {
            const ca = await getMinterContract();
            const round = await ca.getCurrentRound();
            console.log(round)
            return round;
        } catch (error) {
            console.log(error);
        }
    }

    const getUserMints = async()=>{
        try {
            if(user.wallet){
                const ca = await getMinterContract();
                const round = await ca.getCurrentRound();
                const rnd = parseInt(Number(round));
                const num = await ca.counter(rnd,user.wallet);
                return num;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const mintMulti = async()=>{
        try {
            const ca = await getMinterContract();
            const mint = await ca.mintMulti(sobMint.amount);
            return mint;
        } catch (error) {
            console.log(error);
        }
    }

    const dailyMine = async()=>{
        try {
            setLoaders({...loaders, dailyLogin: true})
            const ca = await getRampageCa(user.wallet);
            const st = await ca.getUserNextSignTime(user.wallet);
            const intSt = parseInt(Number(st));
            let milliseconds = Date.now();
            let unixTimestamp = Math.floor(milliseconds / 1000);
            console.log(intSt,unixTimestamp)
            if(intSt < unixTimestamp){
                const tx = await ca.dailyLogin({value:5000000000000});
                await getUserRampageData();
                setLoaders({...loaders, dailyLogin: false})
                return tx
            } else {
                alert("Already Signed In Today , Check Again after 24 Hours")
                setLoaders({...loaders, dailyLogin: false})
                return
            }
        } catch (error) {
            setLoaders({...loaders, dailyLogin: false})
            alert(error.message)
            console.log(error);
        }
    }

    const createRPAccountZero = async(ref)=>{
        try {
            if(rampageData.name){
                const ca = await getRampageCa(user.wallet)
                const tx = await ca.createAccount(ref,rampageData.name,{value:150000000000000});
                return tx;
            }
        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    const getUserRampageData = async()=>{
        try {
            if(user.wallet){
                const ca = await getRampageCa(user.wallet);
                const rpca = await getRpCoreContract(user.wallet);
                const skCa = await getNFTCa(user.wallet);
                //console.log(skCa)
                const totalPoints = await rpca.getTotalPoints();
                const totalUsers = await rpca.getTotalUsers();
                const userRpPerDay = await ca.userRpPerDay(user.wallet);
                const userPoints = await ca.userPoints(user.wallet);
                const userName = await ca.getUsername(user.wallet);
                const ur = await ca.userReferals(user.wallet);
                const prf = await ca.pointPerReferal();
                const nextSignTime = await ca.getUserNextSignTime(user.wallet);
                const balSk = await skCa.balanceOf(user.wallet);
                const st = await ca.getUserNextSignTime(user.wallet);
                const intSt = parseInt(Number(st));
                let milliseconds = Date.now();
                let unixTimestamp = Math.floor(milliseconds / 1000);
                //console.log(totalPoints,totalUsers);
                const ss = parseInt(Number(ur));
                const tp = parseInt(Number(totalPoints));
                const tu = parseInt(Number(totalUsers));
                const pd = parseInt(Number(userRpPerDay));
                const up = parseInt(Number(userPoints));
                const nt = parseInt(Number(nextSignTime));
                const skb = parseInt(Number(balSk));
                const ppf = parseInt(Number(prf));
                setRampageData({ ... rampageData,
                    totalRP: tp, 
                    totalUsers: tu, 
                    pointPerDay: pd, 
                    userPoints:up,
                    userName:userName,
                    nextTime: nt,
                    skibHeld:skb,
                    mineEnable:intSt < unixTimestamp ? true:false,
                    totalRef : ss,
                    pointPerRef : ppf
                })
                console.log(ss)
            }
            else console.log("ERROR LOADING DATA")
        } catch (error) {
            console.log(error)
        }
    }

    const rampageInitialized = async() =>{
        try {
            const ca = await getRampageCa(user.wallet);
            const isInit = await ca.userActivated(user.wallet);
            console.log(isInit)
            return isInit
        } catch (error) {
            console.log(error);
        }
    }

    const executeSwap=async(dataObj,token,amount)=>{
        try {
            setLoaders({...loaders, swap:"Loading"});
            const ca = await getIceContract(user.wallet);
           
            if(!dataObj){
                alert("Enter Amount")
                return
            }
            const caTkn = await getErc20CA(token,user.wallet);
            
            console.log(caTkn)
            const ss =await caTkn.allowance(user.wallet,IceCream[0].contract);
            const intSs = parseInt(Number(ss));
            const intAm = parseInt(Number(amount));
            console.log(intSs,intAm,"Allowances")
            if(intSs < intAm){
                setLoaders({...loaders, swap:"Approving"});
                const tt = await caTkn.approve(IceCream[0].contract, amount);
            tt.wait(1).then(async (receipt) => {
                alert(`Approve Successful hash : ${tt.hash}`)
            //tt.then(async()=>{
                setLoaders({...loaders, swap:"Swapping"});
                const exec = await ca.swap(dataObj.tx.to,dataObj.tx.data,token,amount,{value:dataObj.tx.value});
                exec.wait(1).then(async(a)=>{
                    alert(`swap complete txhash: ${exec.hash}`);
                    await getErc20Balances(dexStates.tokenIn, user.wallet);
                    await getErc20Balances(dexStates.tokenOut, user.wallet);
                })
                setLoaders({...loaders, swap:""});
                return exec
                //console.log(exec)
            //}).catch(e=>{
                //console.log(e);
            //})
        })} else {
            setLoaders({...loaders, swap:"Swapping"});
            const execs = await ca.swap(dataObj.tx.to,dataObj.tx.data,token,amount,{value:dataObj.tx.value});
            execs.wait(1).then(async(a)=>{alert(`swap complete txhash: ${execs.hash}`);
            setLoaders({...loaders, swap:""});})
        }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!fusionData.apiResponse){
            getFusionData();
        }
    }, [])
    

    ////////////////////////////////////////////

    return(
        <>
        <AppContext.Provider value={{connectWallet, dailyMine,user, act ,mintStarted, fusionData,setAct, states, setStates, openMobileMenu, getFusionData , getSupplyLeft , dexStates , setDexStates,
        getCurrentRound, getUserMints,utils,setUtils, setSobMint, sobMint, mintMulti , rampageData, setRampageData, createRPAccountZero , rampageInitialized , getUserRampageData, loaders, executeSwap
        }}>
            {children}
        </AppContext.Provider>
        </>
    )
}