"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Shield,
  Zap,
  Clock,
  Target,
} from "lucide-react"
import BethChart from "@/components/beth-chart"
import BethAnalytics from "@/components/beth-analytics"
import DepositRedeemModal from "@/components/deposit-redeem-modal"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useWallet } from "@/components/providers/wallet-provider"

// Mock data - replace with real API calls
const mockData = {
  tvl: 2995.63,
  shareValue: 0.315106,
  btcPrice: 119542.11,
  ethPrice: 4679.3,
  vaultFee: 0.25,
  bethBalance: 363,
  usdtBalance: 0,
  apy: 12.5,
  volume24h: 45678.9,
  priceChange24h: 2.34,
  totalSupply: 9500,
  marketCap: 2995630,
}

export default function BethPage() {
  const [selectedAction, setSelectedAction] = useState<"deposit" | "redeem" | null>(null)
  const [timeframe, setTimeframe] = useState<string>("1d")
  const [isMobile, setIsMobile] = useState(false)
  const { isConnected } = useWallet()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* Header - Remove the wallet connection */}
      <div className="border-b flex border-[#fae9c8]/20 mt-16 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#fae9c8]">BTC-ETH (BETH)</h1>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Modified ERC-4626 tokenized vault designed as an index fund backed by Bitcoin and Ethereum
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the content remains the same */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          <Card className="bg-black/50 border-[#fae9c8]/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">TVL</p>
                  <p className="text-lg md:text-2xl font-bold text-[#fae9c8]">${mockData.tvl.toLocaleString()}</p>
                </div>
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-[#fae9c8]/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#fae9c8]/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">APY</p>
                  <p className="text-lg md:text-2xl font-bold text-green-400">{mockData.apy}%</p>
                </div>
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-400/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#fae9c8]/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">Share Value</p>
                  <p className="text-lg md:text-2xl font-bold text-white">${mockData.shareValue}</p>
                </div>
                <PieChart className="w-6 h-6 md:w-8 md:h-8 text-[#fae9c8]/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-[#fae9c8]/20">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm">24h Change</p>
                  <p className="text-lg md:text-2xl font-bold text-green-400">+{mockData.priceChange24h}%</p>
                </div>
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-green-400/60" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-black/50 border-[#fae9c8]/20">
              <CardHeader>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <CardTitle className="text-[#fae9c8]">Price Chart</CardTitle>
                  <div className="flex gap-2">
                    {["1d"].map((period) => (
                      <Button
                        key={period}
                        variant={timeframe === period ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeframe(period)}
                        className={
                          timeframe === period
                            ? "bg-[#fae9c8] text-black"
                            : "border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                        }
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <BethChart timeframe={timeframe} />
              </CardContent>
            </Card>

            <BethAnalytics />
          </motion.div>

          {/* Vault Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Vault Stats */}
            <Card className="bg-black/50 border-[#fae9c8]/20">
              <CardHeader>
                <CardTitle className="text-[#fae9c8] flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Vault Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">BTC Price</span>
                    <span className="text-white font-medium">${mockData.btcPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">ETH Price</span>
                    <span className="text-white font-medium">${mockData.ethPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Vault Fee</span>
                    <span className="text-white font-medium">{mockData.vaultFee}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Total Supply</span>
                    <span className="text-white font-medium">{mockData.totalSupply.toLocaleString()} BETH</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Balance */}
            {isConnected && (
              <Card className="bg-black/50 border-[#fae9c8]/20">
                <CardHeader>
                  <CardTitle className="text-[#fae9c8] flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Your Balance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">BETH Balance</span>
                      <span className="text-white font-medium">{mockData.bethBalance} BETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">USDT Balance</span>
                      <span className="text-white font-medium">{mockData.usdtBalance} USDT</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">USD Value</span>
                      <span className="text-[#fae9c8] font-medium">
                        ${(mockData.bethBalance * mockData.shareValue).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="bg-black/50 border-[#fae9c8]/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button
                    onClick={() => setSelectedAction("deposit")}
                    disabled={!isConnected}
                    className="w-full bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-semibold py-3"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Deposit
                  </Button>
                  <Button
                    onClick={() => setSelectedAction("redeem")}
                    disabled={!isConnected || mockData.bethBalance === 0}
                    variant="outline"
                    className="w-full border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10 py-3"
                  >
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Redeem
                  </Button>
                  {!isConnected && (
                    <p className="text-gray-400 text-xs text-center">Connect your wallet to interact with the vault</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Risk Information */}
            <Card className="bg-black/50 border-[#fae9c8]/20">
              <CardHeader>
                <CardTitle className="text-[#fae9c8] flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Risk Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-[#fae9c8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Index Fund Strategy</p>
                    <p className="text-gray-400 text-xs">Tracks BTC and ETH performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-[#fae9c8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Smart Contract Risk</p>
                    <p className="text-gray-400 text-xs">Audited but not risk-free</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#fae9c8] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">Market Volatility</p>
                    <p className="text-gray-400 text-xs">Subject to crypto market risks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900/50 border border-[#fae9c8]/10 rounded-lg p-4 md:p-6"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#fae9c8] mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-[#fae9c8] font-semibold text-sm">Disclaimer</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                BETH Vault is currently a Index Fund tied to BTC & ETH product and may incur losses during high
                volatility conditions and is affected by market & AMM conditions. Value of BETH is directly influenced
                by the value of Bitcoin and Ethereum. Bots Of Bitcoin holds no responsibility of losses incurred during
                the BETA launch of this product, please DYOR.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Deposit/Redeem Modal */}
      {selectedAction && (
        <DepositRedeemModal
          action={selectedAction}
          isOpen={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          vaultData={mockData}
        />
      )}
    </div>
  )
}
