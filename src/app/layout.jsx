import './globals.css'
import Navbar from '@/components/Navbar'
import {Inter} from 'next/font/google'
import Footer from '@/components/Footer'
//export const inter = Inter({})

export const metadata= {
  title: 'BOTS OF BITCOIN',
  description: '10k UNIQUE BOTS ON BITCOIN. NFT-FI, De-Fi , Casino & Airdrops Combined into a Fun Platform!',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        <Footer/>
        </body>
    </html>
  )
}
