"use client"
import React,{useContext, useEffect, useState} from "react"
import BethVault from "./BethVault.jsx"
import Link from "next/link"
import Image from "next/image.js"
import { partnerInfo } from "@/configs/config"
import okuLogo from "../../assets/Oku.svg"
import apiLogo from "../../assets/api3lgo.svg"

const BethWrap =()=>{

    return(
        <div className="bg-[#231F20] h-full w-full border-b-[3px] border-[#E5BD19]">
            <div className="flex flex-col items-center w-full h-full py-[20px]">
                <h1 className="font-fredoka text-[28px] md:text-[35px] text-[#E5BD19]">BTC-ETH (BETH)</h1>
                {/* NETWORK ERROR*/}
                <div className="flex flex-col items-center gap-[3rem] w-full h-full">
                    <div className="flex flex-col items-center w-full h-full">
                    <div className="flex flex-col text-white w-full md:w-[90%] lg:w-[60%] px-[10px] justify-center md:px-[1rem]">
                    BTC-ETH (BETH) is a modified ERC-4626 tokenized vault designed to function as an index fund backed by Bitcoin (BTC) and Ethereum (ETH). It also acts as a hybrid ERC20 token, with its value directly influenced by the prices of the underlying BTC and ETH assets. The BETH Vault is designed to eventually serve as a liquidity layer for the WBTC-WETH pair on OKU (Uni v3), aiming to generate real yield for its underlying assets. This yield, once enabled, will contribute to pushing the base price floor of BETH shares higher over time — ensuring sustainable growth and value appreciation for its holders.
                    <Link href={'https://botsofbtc.notion.site/BTC-ETH-Hybrid-Vault-V1-1a2dae0f14ca80718af1eb8e16d9c918?pvs=4'} target={'_blank'}>
                        <div className="hover:underline w-[8rem] hover:text-blue-400 cursor-pointer">Learn More ...</div>
                    </Link>
                    </div>

                    <BethVault/>
                    
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

                    <div className="flex flex-col text-white text-[10px] w-[90%] md:w-[70%] lg:w-[50%]">
                    <p>disclaimer*</p>
                    <p>BETH vault is currently a Index Fund tied to BTC & ETH product and may incurr losses during high volatility conditions and is affected by market & AMM conditions. Value of BETH is directly influenced by the Value of Bitcoin and Ethereum. Bots Of Bitcoin holds no responsibility of losses incurred during the BETA launch of this product , please DYOR</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default BethWrap