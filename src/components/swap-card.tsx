"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, Settings, Zap, AlertTriangle, Loader2 } from "lucide-react"
import { useWallet } from "@/components/providers/wallet-provider"

const YELLOW = "#f1c40f" // bright yellow like rampage
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray

// Mock token data
const tokens = [
  { symbol: "WETH", name: "Wrapped Ethereum", balance: 0.00031809, decimals: 18, logo: "⟠" },
  { symbol: "USDT", name: "Tether USD", balance: 0.0, decimals: 6, logo: "₮" },
  { symbol: "WBTC", name: "Wrapped Bitcoin", balance: 0.0, decimals: 8, logo: "₿" },
  { symbol: "BETH", name: "BTC-ETH Index", balance: 363.0, decimals: 18, logo: "🤖" },
  { symbol: "BOB", name: "Bots of Bitcoin", balance: 6.0, decimals: 18, logo: "🤖" },
]

// Mock price data
const mockPrices = {
  WETH: 3000,
  USDT: 1,
  WBTC: 60000,
  BETH: 0.315106,
  BOB: 0.05,
}

interface SwapCardProps {
  isEmbedded?: boolean
  className?: string
}

export default function SwapCard({ isEmbedded = false, className = "" }: SwapCardProps) {
  const { isConnected } = useWallet()
  const [fromToken, setFromToken] = useState("WETH")
  const [toToken, setToToken] = useState("USDT")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const fromTokenData = tokens.find((t) => t.symbol === fromToken)
  const toTokenData = tokens.find((t) => t.symbol === toToken)

  // Calculate exchange rate and output amount
  const exchangeRate = useMemo(() => {
    if (!fromTokenData || !toTokenData) return 0
    const fromPrice = mockPrices[fromToken as keyof typeof mockPrices] || 0
    const toPrice = mockPrices[toToken as keyof typeof mockPrices] || 1
    return fromPrice / toPrice
  }, [fromToken, toToken, fromTokenData, toTokenData])

  // Update toAmount when fromAmount changes
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const output = Number(fromAmount) * exchangeRate
      setToAmount(output.toFixed(6))
    } else {
      setToAmount("")
    }
  }, [fromAmount, exchangeRate])

  const swapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSwap = async () => {
    if (!isConnected || !fromAmount || Number(fromAmount) <= 0) return

    setIsSwapping(true)
    // Simulate swap transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSwapping(false)

    // Reset form
    setFromAmount("")
    setToAmount("")
  }

  const canSwap =
    isConnected && fromAmount && Number(fromAmount) > 0 && fromTokenData && fromTokenData.balance >= Number(fromAmount)

  const TokenSelector = ({
    selectedToken,
    onSelect,
    label,
  }: {
    selectedToken: string
    onSelect: (token: string) => void
    label: string
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const tokenData = tokens.find((t) => t.symbol === selectedToken)

    return (
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-black/50 border-[#f1c40f]/30 text-[#f1c40f] hover:bg-[#f1c40f]/10"
        >
          <span className="text-lg">{tokenData?.logo}</span>
          <span className="font-medium">{selectedToken}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 left-0 right-0 z-50 bg-black/90 border border-[#f1c40f]/20 rounded-lg backdrop-blur-sm"
            >
              {tokens
                .filter((token) => token.symbol !== (label === "FROM" ? toToken : fromToken))
                .map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => {
                      onSelect(token.symbol)
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#f1c40f]/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-lg">{token.logo}</span>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-gray-400 text-xs">{token.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#f1c40f] text-sm">{token.balance.toFixed(6)}</div>
                    </div>
                  </button>
                ))}
            </motion.div>
          </>
        )}
      </div>
    )
  }

  return (
    <Card
      className={`bg-black/50 border-[#f1c40f]/20 backdrop-blur-sm ${isEmbedded ? "w-full" : "w-full max-w-md mx-auto"} ${className}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#f1c40f] flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            {isEmbedded ? "Swap Tokens" : "SWAP"}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-[#f1c40f] hover:bg-[#f1c40f]/10"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-black/30 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Slippage Tolerance</span>
              <div className="flex items-center gap-2">
                {["0.1", "0.5", "1.0"].map((value) => (
                  <Button
                    key={value}
                    variant={slippage === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSlippage(value)}
                    className={
                      slippage === value
                        ? "bg-[#f1c40f] text-black text-xs"
                        : "border-[#f1c40f]/30 text-[#f1c40f] hover:bg-[#f1c40f]/10 text-xs"
                    }
                  >
                    {value}%
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* From Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm font-medium">FROM:</span>
            <span className="text-gray-400 text-xs">
              Balance: {fromTokenData?.balance.toFixed(6)} {fromToken}
            </span>
          </div>
          <div className="bg-black/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <TokenSelector selectedToken={fromToken} onSelect={setFromToken} label="FROM" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFromAmount(fromTokenData?.balance.toString() || "")}
                className="text-[#f1c40f] hover:bg-[#f1c40f]/10 text-xs"
              >
                MAX
              </Button>
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="bg-transparent border-none text-2xl font-bold text-white placeholder-gray-500 p-0 h-auto focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={swapTokens}
            className="rounded-full p-2 bg-[#f1c40f]/10 hover:bg-[#f1c40f]/20 border border-[#f1c40f]/30"
          >
            <ArrowUpDown className="w-4 h-4 text-[#f1c40f]" />
          </Button>
        </div>

        {/* To Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm font-medium">TO:</span>
            <span className="text-gray-400 text-xs">
              Balance: {toTokenData?.balance.toFixed(6)} {toToken}
            </span>
          </div>
          <div className="bg-black/50 rounded-lg p-4 space-y-3">
            <TokenSelector selectedToken={toToken} onSelect={setToToken} label="TO" />
            <div className="text-2xl font-bold text-white">{toAmount || "0.0"}</div>
          </div>
        </div>

        {/* Exchange Rate */}
        {fromAmount && toAmount && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 rounded-lg p-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Exchange Rate:</span>
              <span className="text-[#f1c40f] font-medium">
                1 {fromToken} = {exchangeRate.toFixed(6)} {toToken}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400">Price Impact:</span>
              <span className="text-green-400">{"<0.01%"}</span>
            </div>
          </motion.div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!canSwap || isSwapping}
          className="w-full bg-[#f1c40f] hover:bg-[#f1c40f]/90 text-black font-bold py-4 text-lg rounded-lg"
        >
          {isSwapping ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Swapping...
            </>
          ) : !isConnected ? (
            "Connect Wallet"
          ) : !fromAmount ? (
            "Enter Amount"
          ) : Number(fromAmount) > (fromTokenData?.balance || 0) ? (
            "Insufficient Balance"
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              SWAP NOW
            </>
          )}
        </Button>

        {/* Warning */}
        {!isEmbedded && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-yellow-400 text-sm font-medium">Important Notice</p>
                <p className="text-yellow-300 text-xs">
                  Always verify token addresses and amounts before confirming swaps. Slippage may occur during high
                  volatility.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Powered By */}
        {!isEmbedded && (
          <div className="text-center pt-4 border-t border-[#f1c40f]/20">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
              <span>Powered by</span>
              <div className="flex items-center gap-1">
                <span style={{ color: YELLOW }} className="font-medium">
                  IceCreamSwap
                </span>
                <span>🍦</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">A Multi-Chain DeFi Ecosystem</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
