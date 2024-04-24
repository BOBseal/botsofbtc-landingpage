import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata= {
  title: 'BOOBS OF BITCOIN',
  description: '10k UNIQUE BOOBS ON BITCOIN. NFT-FI, De-Fi , Casino & Airdrops Combined into a Fun Platform!',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
