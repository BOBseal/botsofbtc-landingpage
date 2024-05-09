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
    getEthBalance
 } from "../utils/hooks"

export const AppContext = React.createContext();

export const AppProvider =({children})=>{

    const [user , setUser] = useState({});


    const connectWallet = async()=>{
        try {
            const chain = await getChainId();
            if(chain != BOB_MAINNET[0].chainId){
                await addNetwork(BOB_MAINNET);
            }
            const accounts = await connectMetamask();
            setUser({... user, wallet: accounts.wallet})
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <AppContext.Provider value={{connectWallet, user}}>
            {children}
        </AppContext.Provider>
        </>
    )
}