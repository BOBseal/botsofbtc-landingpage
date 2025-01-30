'use client'
import React from "react"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi";

const HMT = () => {
    const { address, isConnecting, isDisconnected } = useAccount();
    return(
        <>
        <ConnectKitButton/>
        <div>Wallet : {address}</div>
        </>
    )
}

export default HMT