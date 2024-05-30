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
    swapExactTokenToToken
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
    
    const connectWallet = async()=>{
        try {
            const chain = await getChainId();
            console.log(chain)
            const accounts = await connectMetamask();
            console.log(accounts)
            if(accounts.wallet){
                const res = walletSign("BOTS OF BITCOIN wants you to sign in and confirm wallet ownership. ARE YOU FRIKKIN READY TO RAMPAGE !!?" , accounts.wallet);                
                res.then(async()=>{
                    setUser({...user , wallet: accounts.wallet});
                }).catch((err)=>{
                    alert("Sign In failed")
                })
            }
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

    ///////ICE CREAM SWAP CALLS /////////////////

    /////helpers////////
    const iceRouterObj =async()=>{
        try {
            if(user.wallet){
                const contract = await connectContract(IceRouterAddress, IceRouterAbi, user.wallet)
                return contract   
            }
        } catch (error) {
            console.log(error)
        }
    }
    ////////////////////

    const WETH =async()=>{
        try {
            const contract = iceRouterObj();
            const WETH = await contract.WETH();
            return WETH
        } catch (error) {
            console.log(error)
        }
    }

    const getAmountsOut = async(amountIn, path)=>{
        try {
            const contract = iceRouterObj();
            const amountOut =await contract.getAmountsOut(amountIn, path);
            return amountOut
        } catch (error) {
            console.log(error);
        }
    }

    const getAmountsIn = async(amountOut) =>{
        try {
            const contract = iceRouterObj();
            const amountIn = await contract.getAmountsIn(amountOut, path);
        } catch (error) {
            console.log(error)
        }
    }

    const executeSwap=async()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    ////////////////////////////////////////////

    return(
        <>
        <AppContext.Provider value={{connectWallet, user, act , fusionData,setAct, states, setStates, openMobileMenu, getFusionData , dexStates , setDexStates}}>
            {children}
        </AppContext.Provider>
        </>
    )
}