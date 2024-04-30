import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import {Fredoka , Varela_Round , Saira, Nunito} from 'next/font/google'

import Footer from '@/components/Footer'

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
      <body className={`${fredoka.variable} ${nunito.variable}`}>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
