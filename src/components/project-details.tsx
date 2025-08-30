"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Zap, Layers, Globe, Smartphone, Github, CheckCircle, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const technologies = [
  { name: "Next.js 15", description: "React framework with App Router", icon: Code },
  { name: "TypeScript", description: "Type-safe JavaScript development", icon: Code },
  { name: "Framer Motion", description: "Advanced animations and interactions", icon: Zap },
  { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: Palette },
  { name: "SVG Processing", description: "Advanced vector graphics parsing", icon: Layers },
  { name: "Responsive Design", description: "Mobile-first approach", icon: Smartphone },
]

const features = [
  "Genesis NFT collection with staking utility and early ecosystem access",
  "Tokenized BTC/ETH/stablecoin vaults offering yield through DeFi strategies",
  "Decentralized automation layer for autonomous contract execution on BitVMs",
  "Permissionless tools: memecoin launchers, token deployers, Telegram bots",
  "Partner-driven DeFi integrations: DEX, liquidity management, NFT launchers",
  "SDKs & Toolings for developers to configure automation and run execution nodes"
]

export default function ProjectDetails() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="project" className="min-h-screen bg-black py-12 md:py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-16"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 md:space-y-6"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffaf19] to-[#ff8c00]">
              An Overview
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              BOTS OF BITCOIN is an Innovative Bicoin DeFi project aiming to become an One Stop Hub for DeFi , NFTs & Automations within the Bitcoin Ecosystem.
            </p>
          </motion.div>

          {/* Purpose Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 md:space-y-8"
          >
            <Card className="bg-black/50 border-[#ffaf19]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-[#ffaf19] flex items-center gap-3">
                  <Globe className="w-5 h-5 md:w-6 md:h-6" />
                  Our Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 md:space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                Bots of Bitcoin is on a mission to build the execution layer for Bitcoin Layer 2s by merging NFTs, DeFi vaults, and decentralized automation infrastructure.
                </p>
                <p>
                    Our project addresses a critical limitation in blockchain ecosystems: the lack of native, autonomous smart contract execution. By developing a decentralized network of automation nodes powered by BitVM, we aim to eliminate the need for manual triggers and centralized off-chain services — reducing operational costs, enhancing security, and enabling scalable on-chain automation.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Through this, we are not just enhancing Bitcoin&apos;s DeFi potential but also creating new paradigms for yield generation, decentralized tooling, and autonomous execution across the Bitcoin ecosystem.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#ffaf19] text-center">Planned Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-black/30 border border-[#ffaf19]/10 hover:border-[#ffaf19]/30 transition-colors duration-200"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#ffaf19] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
         


          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-4 md:space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">Ready to Explore?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Dive deeper & Explore what we have in store.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#ffaf19] hover:bg-[#ff8c00] text-black font-semibold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
              >
                Go To APP
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
