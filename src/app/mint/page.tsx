"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Zap,
  Shield,
  Sparkles,
  Plus,
  Minus,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Loader2,
  LinkIcon,
  Copy,
} from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther, parseUnits, type Address } from "viem"
import { CONTRACTS, TOKEN_DECIMALS } from "@/lib/web3-config"
import { bobNftAbi } from "@/abis/bob-nft"
import { erc20Abi } from "@/abis/erc20"

// IPFS assets (replace with your real reveal/preview flow)
const ipfsImages = [
  "ipfs://bafybeibwpkk25hj72ildehlxcowzbne3v6yi5b3bqgy3zip6iw3g2q6t5u/1.json"
]

function ipfsToHttp(uri: string) {
  if (uri.startsWith("ipfs://")) return "https://ipfs.io/ipfs/" + uri.slice("ipfs://".length)
  return uri
}

const contractData = {
  mintPriceETH: 0.005, // base price per NFT in ETH
  pfpLimit: 10000,
  totalSupplyPerHolder: 10,
  mintLimitPerWallet: 10,
  dailySales: 200,
  totalMinted: 0,
  mintStatus: "Live",
}

const utilities = [
  { name: "Dynamic PFPs", icon: Sparkles, description: "NFTs that evolve based on market conditions" },
  { name: "Governance", icon: Shield, description: "Vote on protocol decisions and upgrades" },
]

const mintDetails = [
  "Waitlist Mint Amount: 3",
  "Waitlist Mint Time: 14:30 UTC 1st Oct",
  "Public Mint Time: 16:30 UTC 6 Oct",
  "Public Mint Amount: 10",
  "Mint Price: 0.005 ETH (or equivalent in WBTC/USDT)",
  "Earn 5% of mint cost from referral mints",
  "10 Random BOTs lucky draw for minters",
]

function MintContent() {
  const { address, isConnected } = useAccount()
  const [mintQuantity, setMintQuantity] = useState(1)
  const [asset, setAsset] = useState<"ETH" | "WBTC" | "USDT">("ETH")
  const [ipfsIndex, setIpfsIndex] = useState(0)
  const currentIpfsUrl = useMemo(() => ipfsToHttp(ipfsImages[ipfsIndex % ipfsImages.length]), [ipfsIndex])

  // Mock FX rates (replace with oracle/price feed)
  const [rates] = useState({ ETH_USD: 3000, BTC_USD: 60000 })

  // Referrals state (replace with contract reads)
  const [refTotals, setRefTotals] = useState({
    totalReferrals: 38,
    totalReferredUsers: 31,
    totalEarnedEth: 0.42,
    withdrawableEth: 0.21,
  })

  const { writeContractAsync, data: pendingHash, isPending: isWriting } = useWriteContract()
  const { isLoading: txLoading, isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: pendingHash,
  })

  const pricePerNft = useMemo(() => {
    const priceEth = contractData.mintPriceETH
    const priceUsd = priceEth * rates.ETH_USD
    if (asset === "ETH") return { value: priceEth, label: `${priceEth} ETH` }
    if (asset === "USDT") return { value: priceUsd, label: `${priceUsd.toFixed(2)} USDT` }
    const priceWbtc = priceUsd / rates.BTC_USD
    return { value: priceWbtc, label: `${priceWbtc.toFixed(6)} WBTC` }
  }, [asset, rates])

  const totalCostLabel = useMemo(() => {
    if (asset === "ETH") return `${(mintQuantity * pricePerNft.value).toFixed(6)} ETH`
    if (asset === "USDT") return `${(mintQuantity * pricePerNft.value).toFixed(2)} USDT`
    return `${(mintQuantity * pricePerNft.value).toFixed(6)} WBTC`
  }, [mintQuantity, pricePerNft, asset])

  const totalCostBigInt = () => {
    if (asset === "ETH") {
      return parseEther((contractData.mintPriceETH * mintQuantity).toString())
    }
    const dec = TOKEN_DECIMALS[asset]
    const raw = (pricePerNft.value * mintQuantity).toFixed(Math.min(dec, 12))
    return parseUnits(raw, dec)
  }

  async function mintWithETH() {
    return await writeContractAsync({
      address: CONTRACTS.BOB_NFT,
      abi: bobNftAbi,
      functionName: "mint",
      args: [BigInt(mintQuantity)],
      value: totalCostBigInt(),
    })
  }

  async function approveToken(token: Address, amount: bigint) {
    return await writeContractAsync({
      address: token,
      abi: erc20Abi,
      functionName: "approve",
      args: [CONTRACTS.BOB_NFT, amount],
    })
  }

  async function mintWithToken(token: Address) {
    const amount = totalCostBigInt()
    await approveToken(token, amount)
    return await writeContractAsync({
      address: CONTRACTS.BOB_NFT,
      abi: bobNftAbi,
      functionName: "mintWithToken",
      args: [token, BigInt(mintQuantity)],
    })
  }

  async function handleMint() {
    if (!isConnected) {
      alert("Please connect your wallet first.")
      return
    }
    try {
      if (asset === "ETH") {
        await mintWithETH()
      } else if (asset === "WBTC") {
        await mintWithToken(CONTRACTS.WBTC)
      } else {
        await mintWithToken(CONTRACTS.USDT)
      }
    } catch (err) {
      console.error("Mint error:", err)
      alert("Mint failed. Check console for details.")
    }
  }

  async function withdrawReferral() {
    try {
      await writeContractAsync({
        address: CONTRACTS.BOB_NFT,
        abi: bobNftAbi,
        functionName: "withdrawReferral",
        args: [],
      })
      setRefTotals((p) => ({ ...p, withdrawableEth: 0 }))
    } catch (e) {
      console.error("Withdraw referral failed:", e)
      alert("Withdraw referral failed.")
    }
  }

  const isMinting = isWriting || txLoading
  const mintSuccess = txSuccess

  const copyReferral = () => {
    const ref = address || "0x0000…"
    const link = `${typeof window !== "undefined" ? window.location.origin : ""}/mint?ref=${ref}`
    navigator.clipboard.writeText(link)
  }

  useEffect(() => {
    if (txSuccess) {
      // Could refetch balances, supplies, etc.
    }
  }, [txSuccess])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="relative overflow-hidden bg-gradient-to-b from-black via-black to-gray-900 pt-16">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-[#fae9c8]/10 border border-[#fae9c8]/20 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-[#fae9c8]" />
              <span className="text-[#fae9c8] text-sm font-medium">Mint BOB & Claim Spice</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fae9c8] to-[#fae9c8]/80">
              BOTS OF BITCOIN
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-white">PFPs</h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Dynamic NFTs that evolve with the Bitcoin ecosystem. Multi-asset minting supported: ETH, WBTC, USDT.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="bg-black/50 border-[#fae9c8]/20">
                <CardHeader>
                  <CardTitle className="text-[#fae9c8] flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Contract Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Mint Price:</span>
                      <div className="text-white font-bold">{contractData.mintPriceETH} ETH</div>
                    </div>
                    <div>
                      <span className="text-gray-400">PFP Limit:</span>
                      <div className="text-white font-bold">{contractData.pfpLimit.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Per Holder Supply:</span>
                      <div className="text-white font-bold">{contractData.totalSupplyPerHolder}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Mint Limit/Wallet:</span>
                      <div className="text-white font-bold">{contractData.mintLimitPerWallet}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Daily Sales:</span>
                      <div className="text-white font-bold">{contractData.dailySales} / day</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Total Minted:</span>
                      <div className="text-white font-bold">{contractData.totalMinted}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#fae9c8]/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Mint Status:</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {contractData.mintStatus}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500 break-all">Contract: {CONTRACTS.BOB_NFT}</div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10 bg-transparent"
                    onClick={() => window.open(`https://etherscan.io/address/${CONTRACTS.BOB_NFT}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mint */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-black/50 border-[#fae9c8]/20">
                <CardContent className="p-6 space-y-6">
                  {/* IPFS Preview */}
                  <div className="rounded-xl overflow-hidden bg-black/40 border border-[#fae9c8]/10">
                    <div className="aspect-square w-full">
                      <img
                        src={currentIpfsUrl || "/placeholder.svg"}
                        alt="BOB NFT Preview"
                        className="w-full h-full object-contain bg-gradient-to-br from-pink-500 via-purple-600 to-pink-700"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="flex items-center justify-between p-3 border-t border-[#fae9c8]/10">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIpfsIndex((i) => (i + ipfsImages.length - 1) % ipfsImages.length)}
                        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                      >
                        Prev
                      </Button>
                      <a
                        href={currentIpfsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#fae9c8] text-sm inline-flex items-center gap-2 hover:underline"
                      >
                        <LinkIcon className="w-4 h-4" />
                        View on IPFS
                      </a>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIpfsIndex((i) => (i + 1) % ipfsImages.length)}
                        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  {/* Asset selector */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300 font-medium">Pay With</div>
                    <div className="flex flex-wrap gap-2">
                      {(["ETH", "WBTC", "USDT"] as const).map((a) => (
                        <Button
                          key={a}
                          variant={asset === a ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAsset(a)}
                          className={
                            asset === a
                              ? "bg-[#fae9c8] text-black"
                              : "border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                          }
                        >
                          {a}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-300">Quantity</label>
                      <div className="text-xs text-gray-400">Max per wallet: {contractData.mintLimitPerWallet}</div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMintQuantity((q) => Math.max(1, q - 1))}
                        disabled={mintQuantity <= 1}
                        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10 bg-transparent"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="w-20">
                        <Input
                          type="number"
                          value={mintQuantity}
                          onChange={(e) => {
                            const v = Math.max(
                              1,
                              Math.min(Number.parseInt(e.target.value || "1"), contractData.mintLimitPerWallet),
                            )
                            setMintQuantity(v)
                          }}
                          className="bg-black/50 border-[#fae9c8]/30 text-white text-center"
                          min={1}
                          max={contractData.mintLimitPerWallet}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMintQuantity((q) => Math.min(contractData.mintLimitPerWallet, q + 1))}
                        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-black/30 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Price per NFT:</span>
                      <span className="text-white font-medium">{pricePerNft.label}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#fae9c8]/10 pt-2">
                      <span className="text-[#fae9c8] font-medium">Total:</span>
                      <span className="text-[#fae9c8] font-bold">{totalCostLabel}</span>
                    </div>
                  </div>

                  {/* Mint CTA */}
                  <Button
                    onClick={handleMint}
                    disabled={!isConnected || isMinting}
                    className="w-full bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-bold py-4 text-lg"
                  >
                    {isMinting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Minting...
                      </>
                    ) : mintSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Minted Successfully!
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Mint {totalCostLabel}
                      </>
                    )}
                  </Button>

                  {!isConnected && <p className="text-center text-xs text-gray-400">Connect your wallet to mint.</p>}

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <p className="text-yellow-300 text-sm">
                        Verify the payment asset and total before confirming the transaction in your wallet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Referrals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-black/50 border-[#fae9c8]/20">
                <CardHeader>
                  <CardTitle className="text-[#fae9c8]">Referral Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300 font-medium">Your Referral Link</div>
                    <div className="flex items-center gap-2">
                      <Input
                        readOnly
                        value={`${typeof window !== "undefined" ? window.location.origin : ""}/mint?ref=${address || "0x..."}`}
                        className="bg-black/50 border-[#fae9c8]/30 text-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyReferral}
                        className="border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10 bg-transparent"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Share this link. You earn a percentage from mints by your referrals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Referrals / Users</span>
                        <span className="text-white font-semibold">
                          {refTotals.totalReferrals} / {refTotals.totalReferredUsers}
                        </span>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Earned (ETH)</span>
                        <span className="text-[#fae9c8] font-semibold">{refTotals.totalEarnedEth.toFixed(4)} ETH</span>
                      </div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Withdrawable Balance</span>
                        <span className="text-[#fae9c8] font-semibold">{refTotals.withdrawableEth.toFixed(4)} ETH</span>
                      </div>
                      <Button
                        onClick={withdrawReferral}
                        disabled={!isConnected || refTotals.withdrawableEth <= 0 || isMinting}
                        className="mt-3 w-full bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-semibold"
                      >
                        {isMinting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Withdraw"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* About */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black border-t border-[#fae9c8]/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fae9c8]">About</h2>
              <p className="text-gray-300 max-w-4xl mx-auto">
                BOTS OF BITCOIN (BOB) PFPs are ERC721 NFTs. Not just a PFP — they participate in governance and act as
                VIP access to the Bots of Bitcoin ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {utilities.map((u) => (
                <Card key={u.name} className="bg-black/50 border-[#fae9c8]/20">
                  <CardContent className="p-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#fae9c8]/10">
                        <u.icon className="w-6 h-6 text-[#fae9c8]" />
                      </div>
                      <h3 className="text-white font-semibold">{u.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm">{u.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mint Details */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-black border-t border-[#fae9c8]/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fae9c8]">Mint Details</h2>
              <p className="text-gray-300">Important information about the minting process and requirements</p>
            </div>
            <Card className="bg-black/50 border-[#fae9c8]/20">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mintDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-black/30 border border-[#fae9c8]/10"
                    >
                      <div className="w-2 h-2 bg-[#fae9c8] rounded-full mt-2" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <p className="text-yellow-300 text-sm">
                      Always verify contract addresses and transaction details. Use the referral link responsibly and be
                      aware of phishing risks.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function MintPage() {
  // Global WagmiProvider is supplied via app/layout.tsx -> WalletProvider (RainbowKit+Wagmi)
  return <MintContent />
}
