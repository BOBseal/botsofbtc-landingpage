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
  keywords:'BTC , Bitcoin , BOTS OF BITCOIN , Bots Of Bitcoin , Bots of btc , Ethereum , NFT , BOTS , PFP ,DeFi , Bitcoin Defi, BOB , Build On Bitcoin, BitVM , Skibbidies, Skibbidi Toilet , SOB '
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
