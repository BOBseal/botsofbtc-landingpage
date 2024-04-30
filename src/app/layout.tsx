import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import {Fredoka , VarelaRound , Saira} from 'next/font/google'

import Footer from '@/components/Footer'

const fredoka = Saira({
  subsets:['latin'],
  variable: "--font-fredoka",
  weight:"500"
})

export const metadata :Metadata= {
  title: 'BOTS OF BITCOIN',
  description: '10k UNIQUE BOTS ON BITCOIN. NFT-FI, De-Fi , Casino & Airdrops Combined into a Fun Platform!',
}

export default function RootLayout({
  children,
} : {
  children: React.ReactNode
}){
  return (
    <html lang="en">
      <body className={`${fredoka.variable}`}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
