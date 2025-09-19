"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SwapCard from "@/components/swap-card"
import { TrendingUp, Zap, Shield, ArrowUpDown, BarChart3, Users, ExternalLink, Star } from "lucide-react"
import Link from "next/link"

const YELLOW = "#f1c40f" // bright yellow like rampage
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray

const features = [
  {
    icon: Zap,
    title: "Multi-Chain Support",
    description: "Trade across multiple blockchains seamlessly",
  },
  {
    icon: Shield,
    title: "Battle-Tested Security",
    description: "Powered by IceCreamSwap's proven infrastructure",
  },
  {
    icon: TrendingUp,
    title: "Optimal Routing",
    description: "Best prices through intelligent order routing",
  },
  {
    icon: BarChart3,
    title: "Deep Liquidity",
    description: "Access to extensive liquidity pools",
  },
]

const partnerFeatures = [
  "Cross-chain swaps with minimal fees",
  "Advanced MEV protection",
  "Institutional-grade infrastructure",
  "24/7 liquidity provision",
  "Real-time price optimization",
]

export default function SwapPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: `linear-gradient(135deg, ${BLACK}, ${DARK_GRAY})` }}>
      <Navbar />

      {/* Enhanced top stripe like rampage */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-40"
        style={{
          background: `linear-gradient(90deg, ${YELLOW}, ${GOLD}, ${DARK_YELLOW}, ${LIGHT_YELLOW})`,
          backgroundSize: "300% 100%",
          animation: "gradient-flow 8s ease-in-out infinite",
        }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-12"
          >
            {/*<div
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 border"
              style={{
                background: `${YELLOW}20`,
                borderColor: `${YELLOW}40`,
                boxShadow: `0 0 20px ${YELLOW}30`,
              }}
            >
              <span className="text-2xl">🍦</span>
              <span style={{ color: YELLOW }} className="text-sm font-bold">
                POWERED BY ICECREAMSWAP
              </span>
            </div>*/}

            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-wide"
              style={{
                color: YELLOW,
                textShadow: `0 0 30px ${YELLOW}80, 0 0 60px ${YELLOW}40`,
              }}
            >
              SWAP TOKENS
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
              Trade cryptocurrencies instantly across multiple chains with{" "}
              <span style={{ color: YELLOW }} className="font-semibold">
                IceCreamSwap&apos;s
              </span>{" "}
              battle-tested infrastructure. Experience the sweetest DeFi trading with optimal rates and minimal
              slippage.
            </p>

            {/* Partner Badge */}
            {/*<motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center"
            >
              <div
                className="rounded-2xl px-6 py-4 font-bold text-center shadow-lg"
                style={{
                  background: BLACK,
                  color: YELLOW,
                  boxShadow: `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}40`,
                  border: `2px solid ${YELLOW}30`,
                }}
              >
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5" />
                  <span>OFFICIAL PARTNER INTEGRATION</span>
                  <Star className="w-5 h-5" />
                </div>
              </div>
            </motion.div>*/}
          </motion.div>

          {/* Main Content Grid */}
          <div className="flex justify-center">
            {/* Swap Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <SwapCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Partner Information Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 border-t" style={{ borderColor: `${YELLOW}20` }}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            {/* Partner Hero */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${YELLOW}, ${GOLD})`, color: BLACK }}
                >
                  🍦
                </div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: YELLOW }}>
                    IceCreamSwap
                  </h2>
                  <p className="text-gray-300">A Multi-Chain DeFi Ecosystem</p>
                </div>
              </div>

              <p className="text-gray-300 max-w-4xl mx-auto text-lg leading-relaxed">
                We&apos;ve partnered with{" "}
                <span style={{ color: YELLOW }} className="font-semibold">
                  IceCreamSwap
                </span>
                , one of the most trusted and innovative DeFi protocols in the space. Their cutting-edge technology
                powers our swap functionality, ensuring you get the best trading experience possible.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl transform transition-all duration-200 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${BLACK}f0, ${DARK_GRAY}e0)`,
                    boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px ${YELLOW}20 inset`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: YELLOW }} />
                  <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6">
              <div
                className="inline-block rounded-2xl px-8 py-6 transform transition-all duration-200 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${YELLOW}f0, ${GOLD}e0, ${DARK_YELLOW}d0)`,
                  boxShadow: `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px ${YELLOW}30 inset`,
                }}
              >
                <h3 className="text-2xl font-extrabold mb-3" style={{ color: BLACK }}>
                  Ready to Experience the Sweetest Swaps?
                </h3>
                <p className="text-black/80 mb-4">
                  Join thousands of traders who trust IceCreamSwap for their DeFi needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href={"https://icecreamswap.com"} target="_blank"></Link>
                  <button
                    className="inline-flex items-center gap-2 rounded-full font-bold px-6 py-3 border transform transition-all duration-200 hover:scale-105"
                    style={{
                      borderColor: BLACK,
                      color: YELLOW,
                      background: "BLACK",
                    }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit IceCreamSwap
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes gradient-flow {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  )
}
