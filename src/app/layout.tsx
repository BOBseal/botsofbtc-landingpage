import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react';
//import Navbar from '@/components/Navbar'
//import NAVBAR from "../components/NAVBAR"
import {Fredoka , Varela_Round , Saira, Nunito} from 'next/font/google'
//import Footer from '@/components/Footer'
//import { Web3Provider } from '../components/Providers/Web3Provider.jsx';

const fredoka = Saira({
  subsets:['latin'],
  variable: "--font-fredoka",
  weight:"500"
})

const nunito = Nunito({
  subsets:['latin'],
  variable:"--font-nunito",
  weight:'800'
})

export const metadata:Metadata = {
  title: 'BOTS OF BITCOIN',
  description: 'A Bitcoin Defi & NFT platform. Fusing Bitcoin & Ethereum with $BETH , 10k Unique Dynamic NFTs with multiple changeable looks , Aggregated Defi with AAVE supply vaults , DEX and many more!',
  keywords:'BTC, Bitcoin, Ethereum, ETH, DeFi, Bitcoin DeFi, Crypto, Blockchain, Decentralized Finance, Web3, Crypto Yield, Yield Vaults, Index Vaults, Tokenized Vaults, Crypto Swaps, Onchain Finance, Layer 2 Bitcoin, Bitcoin Layer 2, Bitcoin Scaling, Ordinals, BOTS OF BITCOIN, Bots Of Bitcoin, bots of bitcoin, Bots of BTC, BOB Token, BOB NFTs, SOB Token, SOB NFTs, Build On Bitcoin, BOB Yield, Bots on Bitcoin, BOB DeFi, BOB Vaults, BOB Ecosystem, BOB Index Fund, BOB DAO, Bots of Blockchain, Bitcoin Bots, NFT, NFTs, PFP NFTs, Dynamic NFTs, NFT Yield, NFT Staking, NFT Utilities, Profile Picture NFT, Generative NFT, Skibbidies, Skibbidi Toilet, Skibidi NFTs, Toiletverse, Meme NFTs, NFT Bots, AI NFTs, NFT Collection, BitVM, BitVM 2, Bitcoin Virtual Machine, Smart Contracts, Solidity, Bitcoin Dev, Bitcoin dApps, Bitcoin Protocol, Taproot, Bitcoin Innovation, Bitcoin Scripting, Bitcoin Tools, EVM, zk-rollups, Rollups on Bitcoin, Crypto Community, Bitcoin Builders, BOB Army, Skibbidiverse, Toilet Wars, Meme Coin, Meme Culture, NFT Culture, Crypto Degens, PFP Culture, Crypto Token, Bitcoin Token, Utility Token, BOB Tokenomics, Token Launch, TGE, Token Ecosystem, Liquidity Vault, LP Vault, Onchain Index, #BOTSOFBITCOIN, #BOBToken, #BitcoinDeFi, #Skibbidies, #BuildOnBitcoin, #BitVM, #NFTBots, #CryptoPFP, #BitcoinNFTs, #YieldOnBitcoin'
}

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
} ){
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable}`}>
        
        {children}
        
        <Analytics/>
        </body>
    </html>
  )
}
