"use client"
import React from "react"
import NAVBAR from "@/components/NAVBAR"
import Footer from "@/components/Footer"
import Vault from "@/components/Vaults/BethVault"
import VaultWrapper from "@/components/Vaults/VaultWrapper.jsx"

const AaveVaultPage=()=>{

    return(
        <>
            <NAVBAR/>
                <div className="flex w-full h-full">
                    <VaultWrapper/>
                </div>
            <Footer/>
        </>
    )
}

export default AaveVaultPage