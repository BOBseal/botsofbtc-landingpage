//import HomePage from "../screens/Home.jsx";
'use client'
import { NextPage } from "next"

import Navbar from "../components/navbar"
import BackgroundPaths from "../components/landingpage/background-paths"
import PartnerDetails from "../components/partners"
import Footer from "../components/footer"
import ProjectDetails from "../components/project-details"
import Roadmap from "../components/roadmap"
import SwapCard from "../components/swap-card"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <BackgroundPaths title="BOTS OF BITCOIN" />
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black border-t border-[#fae9c8]/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-[#f1c40f]/10 border border-[#f1c40f]/20 rounded-full px-4 py-2 mb-4">
              <span className="text-lg">🍦</span>
              <span className="text-[#f1c40f] text-sm font-medium">Powered by IceCreamSwap</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f1c40f] to-[#f39c12]">
              Swap Tokens
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Trade cryptocurrencies instantly with our trusted partner IceCreamSwap&apos;s infrastructure.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SwapCard isEmbedded={true} />
            </div>
          </div>
        </div>
      </section>
      <ProjectDetails/>
      <PartnerDetails/>
      <Roadmap/>
      <Footer/>
    </div>
  )
}