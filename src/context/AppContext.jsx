'use client'

import React, {useState , useEffect} from "react"
import {BOB_MAINNET, IceRouterAbi , IceRouterAddress} from "../utils/constants"
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
    getNFTCa
 } from "../utils/hooks"

export const AppContext = React.createContext();

export const AppProvider =({children})=>{

    const [user , setUser] = useState({});
    const [act , setAct] = useState(0);
    const [states, setStates] = useState({
        mobileMenuOpen: false ,
        contentsSubmenuOpen: false,
      })
    const [fusionData, setFusionData] = useState({})
    const [dexStates , setDexStates] = useState({
        amountOut:'',
        amountIn:'',
        fromToken:'',
        toToken:'',
        type:'NATIVE'
    })
    const [loaders , setLoaders] = useState({
        dailyLogin:false
    });
    const [sobMint, setSobMint] = useState({
        amount:1
    })
    const [rampageData,setRampageData] = useState({})
    const connectWallet = async()=>{
        try {
            const accounts = await connectMetamask();
            console.log(accounts)
            if(accounts.wallet){
                const chainId = await getChainId();
                const correctChain = chainId === BOB_MAINNET[0].chainId ? true : false;
                const res = walletSign("BOTS OF BITCOIN wants you to sign in and confirm wallet ownership. ARE YOU FRIKKIN READY TO RAMPAGE !!?" , accounts.wallet);                
                res.then(async()=>{
                    setUser({...user , wallet:accounts.wallet , chainId: chainId , correctChain: correctChain});
                }).catch((err)=>{
                    alert("Sign In failed")
                })
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

    const getFusionData=async()=>{
    try {
        const res = await fetch("https://fusion-api.gobob.xyz/partners");
        const data = await res.json();
        setFusionData({...fusionData, apiResponse: data, ok: res.ok})
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
                const tx = await ca.dailyLogin();
                await getUserRampageData();
                setLoaders({...loaders, dailyLogin: false})
                return tx
            } else {
                alert("Already Signed In Today , Check Again after 24 Hours")
                setLoaders({...loaders, dailyLogin: false})
                return
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    }

    const createRPAccountZero = async()=>{
        try {
            if(rampageData.name){
                const ca = await getRampageCa(user.wallet)
                const tx = await ca.createAccount("0x0000000000000000000000000000000000000000",rampageData.name,{value:150000000000000});
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
                const ca = await getRampageCa();
                const rpca = await getRpCoreContract();
                const skCa = await getNFTCa(user.wallet);
                //console.log(skCa)
                const totalPoints = await rpca.getTotalPoints();
                const totalUsers = await rpca.getTotalUsers();
                const userRpPerDay = await ca.userRpPerDay(user.wallet);
                const userPoints = await ca.userPoints(user.wallet);
                const userName = await ca.getUsername(user.wallet);
                const nextSignTime = await ca.getUserNextSignTime(user.wallet);
                const balSk = await skCa.balanceOf(user.wallet);
                const st = await ca.getUserNextSignTime(user.wallet);
                const intSt = parseInt(Number(st));
                let milliseconds = Date.now();
                let unixTimestamp = Math.floor(milliseconds / 1000);
                //console.log(totalPoints,totalUsers);
                const tp = parseInt(Number(totalPoints));
                const tu = parseInt(Number(totalUsers));
                const pd = parseInt(Number(userRpPerDay));
                const up = parseInt(Number(userPoints));
                const nt = parseInt(Number(nextSignTime));
                const skb = parseInt(Number(balSk));
                setRampageData({ ... rampageData,
                    totalRP: tp, 
                    totalUsers: tu, 
                    pointPerDay: pd, 
                    userPoints:up,
                    userName:userName,
                    nextTime: nt,
                    skibHeld:skb,
                    mineEnable:intSt < unixTimestamp ? true:false
                })
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

    ////////////////////////////////////////////

    return(
        <>
        <AppContext.Provider value={{connectWallet, dailyMine,user, act ,mintStarted, fusionData,setAct, states, setStates, openMobileMenu, getFusionData , getSupplyLeft , dexStates , setDexStates,
        getCurrentRound, getUserMints, setSobMint, sobMint, mintMulti , rampageData, setRampageData, createRPAccountZero , rampageInitialized , getUserRampageData, loaders
        }}>
            {children}
        </AppContext.Provider>
        </>
    )
}