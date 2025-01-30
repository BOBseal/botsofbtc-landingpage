"use client"
import React from "react"
import NAVBAR from "@/components/NAVBAR"
import Footer from "@/components/Footer"
import AaveVault from "@/components/Vaults/AaveVault"

const AaveVaultPage=()=>{

    return(
        <>
            <NAVBAR/>
                <div className="flex w-full h-full">
                    <AaveVault/>
                </div>
            <Footer/>
        </>
    )
}

export default AaveVaultPage