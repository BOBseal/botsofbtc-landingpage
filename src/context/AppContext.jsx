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
    getRampageCa
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
    const [loading , setLoading] = useState(false);
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

    const createRPAccount = async()=>{
        try {
            if(rampageData.name){
                const encodedForm = ethers.utils.defaultAbiCoder.encode(["bytes"],rampageData.name);
                if(encodedForm.length == 0){
                    alert("Name Must not be empty");
                    return
                }
                const ca = await getRampageCa(user.wallet)
                const tx = await ca.createAccount("0x0000000000000000000000000000000000000000",rampageData.name);
                return tx;
            }
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
        <AppContext.Provider value={{connectWallet, user, act ,mintStarted, fusionData,setAct, states, setStates, openMobileMenu, getFusionData , getSupplyLeft , dexStates , setDexStates,
        getCurrentRound, getUserMints, setSobMint, sobMint, mintMulti , setRampageData, createRPAccount , rampageInitialized
        }}>
            {children}
        </AppContext.Provider>
        </>
    )
}