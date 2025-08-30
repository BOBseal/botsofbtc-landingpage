"use client"

import { useState, useEffect } from "react"
import { useAccount, useBalance, useChainId } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@/components/providers/wallet-provider"
import { mainnet, sepolia, polygon, arbitrum, optimism } from "viem/chains"

const chainsMap: Record<number, string> = {
  [mainnet.id]: mainnet.name,
  [sepolia.id]: sepolia.name,
  [polygon.id]: polygon.name,
  [arbitrum.id]: arbitrum.name,
  [optimism.id]: optimism.name,
}

export default function WalletConnection({
  onConnectionChange,
}: { onConnectionChange?: (connected: boolean) => void }) {
  const { isConnected, address, connect, disconnect } = useWallet()
  const { address: wagmiAddress } = useAccount()
  const chainId = useChainId()
  const { data: balanceData } = useBalance({
    address: (wagmiAddress ?? address) || undefined,
  })

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    onConnectionChange?.(isConnected)
  }, [isConnected, onConnectionChange])

  const handleConnect = async () => {
    setIsConnecting(true)
    await new Promise((r) => setTimeout(r, 600))
    await connect()
    setIsConnecting(false)
  }

  const handleDisconnect = () => {
    setIsDropdownOpen(false)
    disconnect()
    onConnectionChange?.(false)
  }

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address)
  }

  const chainName = chainId

  if (!isConnected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-semibold px-6 py-2 rounded-lg transition-all duration-300"
      >
        {isConnecting ? (
          <>
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </>
        )}
      </Button>
    )
  }

  return (
    <div className="relative flex items-center">
      <Button
        variant="outline"
        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10 bg-transparent"
        onClick={() => setIsDropdownOpen((o) => !o)}
      >
        <span className="truncate max-w-[140px]">{wagmiAddress || address}</span>
      </Button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50"
          >
            <Card className="bg-black/90 border-[#fae9c8]/20 backdrop-blur-sm min-w-[280px]">
              <CardContent className="p-4 space-y-4">
                {/* Wallet Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fae9c8]/20 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm truncate">{wagmiAddress || address}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={copyAddress}
                          className="p-1 h-auto hover:bg-[#fae9c8]/10"
                        >
                          <Copy className="w-3 h-3 text-gray-400" />
                        </Button>
                      </div>
                      <Badge variant="outline" className="border-[#fae9c8]/30 text-[#fae9c8] text-xs mt-1">
                        Connected Wallet
                      </Badge>
                    </div>
                  </div>

                  {/* Network + Balance */}
                  <div className="bg-black/50 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Network</span>
                      <span className="text-white font-medium">{chainName == 60808?`BOB Mainnet`:"Unsupported" }</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Balance</span>
                      <span className="text-white font-medium">
                        {balanceData ? `${balanceData.formatted} ${balanceData.symbol}` : "—"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2 border-t border-[#fae9c8]/10">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-[#fae9c8]/10"
                    onClick={() =>
                      wagmiAddress && window.open(`https://etherscan.io/address/${wagmiAddress}`, "_blank")
                    }
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    onClick={handleDisconnect}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
    </div>
  )
}
