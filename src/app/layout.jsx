import './globals.css'
import Navbar from '@/components/Navbar'
import {Fredoka} from 'next/font/google'
import Footer from '@/components/Footer'

const fredoka = Fredoka({
  subsets:['latin'],
  variable: "--font-fredoka",
  weight: "400"
})

export const metadata= {
  title: 'BOTS OF BITCOIN',
  description: '10k UNIQUE BOTS ON BITCOIN. NFT-FI, De-Fi , Casino & Airdrops Combined into a Fun Platform!',
}

export default function RootLayout({
  children,
}) {
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
