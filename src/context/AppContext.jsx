'use client'

import React, {useState , useEffect} from "react"
import {BOB_MAINNET} from "../utils/constants"
import ethers from 'ethers'
import { 
    addNetwork,
    changeNetwork,
    connectContract,
    unixToGeneralTime,
    connectMetamask,
    getChainId,
    getEthBalance,
    walletSign
 } from "../utils/hooks"

export const AppContext = React.createContext();

export const AppProvider =({children})=>{

    const [user , setUser] = useState({});
    const [act , setAct] = useState(1);
    const [states, setStates] = useState({
        mobileMenuOpen: false ,
        contentsSubmenuOpen: false
      })

    const connectWallet = async()=>{
        try {
            const chain = await getChainId();
            if(chain != BOB_MAINNET[0].chainId){
                await addNetwork(BOB_MAINNET);
            }
            const accounts = await connectMetamask();
            console.log(accounts)
            if(accounts.wallet){
                const res = walletSign("BOTS OF BITCOIN wants you to sign in and confirm wallet ownership. ARE YOU FRIKKIN READY TO RAMPAGE !!?" , accounts.wallet);                
                res.then(()=>{
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

    return(
        <>
        <AppContext.Provider value={{connectWallet, user, act , setAct, states, setStates, openMobileMenu}}>
            {children}
        </AppContext.Provider>
        </>
    )
}