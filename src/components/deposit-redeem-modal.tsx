"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"

interface DepositRedeemModalProps {
  action: "deposit" | "redeem"
  isOpen: boolean
  onClose: () => void
  vaultData: any
}

export default function DepositRedeemModal({ action, isOpen, onClose, vaultData }: DepositRedeemModalProps) {
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(action === "deposit" ? "USDT" : "BETH")

  const isDeposit = action === "deposit"
  const maxAmount = isDeposit ? 10000 : vaultData.bethBalance

  const handleSubmit = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    setIsProcessing(true)
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
      setAmount("")
    }, 2000)
  }

  const estimatedOutput = () => {
    if (!amount) return "0"
    const inputAmount = Number.parseFloat(amount)
    if (isDeposit) {
      return (inputAmount / vaultData.shareValue).toFixed(6)
    } else {
      return (inputAmount * vaultData.shareValue).toFixed(6)
    }
  }

  const setMaxAmount = () => {
    setAmount(maxAmount.toString())
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md"
        >
          <Card className="bg-black/90 border-[#fae9c8]/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#fae9c8] flex items-center gap-2">
                  {isDeposit ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  {isDeposit ? "Deposit" : "Redeem"} Assets
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 space-y-4"
                >
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Transaction Successful!</h3>
                    <p className="text-gray-400">
                      Your {action} of {amount} {selectedAsset} has been processed.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Asset Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-300">
                      {isDeposit ? "Deposit Asset" : "Redeem Asset"}
                    </label>
                    <div className="flex gap-2">
                      {(isDeposit ? ["USDT", "BTC", "ETH"] : ["BETH"]).map((asset) => (
                        <Button
                          key={asset}
                          variant={selectedAsset === asset ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedAsset(asset)}
                          className={
                            selectedAsset === asset
                              ? "bg-[#fae9c8] text-black"
                              : "border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                          }
                        >
                          {asset}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">Amount</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          Available: {maxAmount.toLocaleString()} {selectedAsset}
                        </span>
                        <Button variant="ghost" size="sm" onClick={setMaxAmount} className="text-[#fae9c8] text-xs">
                          MAX
                        </Button>
                      </div>
                    </div>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-black/50 border-[#fae9c8]/30 text-white placeholder-gray-500 pr-16"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        {selectedAsset}
                      </div>
                    </div>
                  </div>

                  {/* Estimated Output */}
                  <div className="bg-black/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">You will receive</span>
                      <span className="text-white font-medium">
                        {estimatedOutput()} {isDeposit ? "BETH" : "USDT"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Exchange Rate</span>
                      <span className="text-white font-medium">1 BETH = ${vaultData.shareValue.toFixed(6)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Fee</span>
                      <span className="text-white font-medium">{vaultData.vaultFee}%</span>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <p className="text-yellow-400 text-sm font-medium">Important Notice</p>
                        <p className="text-yellow-300 text-xs">
                          {isDeposit
                            ? "Deposits are subject to slippage and may take a few minutes to process."
                            : "Redemptions may be subject to exit fees and processing delays during high volatility."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={handleSubmit}
                    disabled={!amount || Number.parseFloat(amount) <= 0 || isProcessing}
                    className="w-full bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-semibold py-3"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {isDeposit ? (
                          <ArrowUpRight className="w-4 h-4 mr-2" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-2" />
                        )}
                        {isDeposit ? "Deposit" : "Redeem"} {selectedAsset}
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
