"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import imageHolder from "../../assets/lala.gif"
import { useSearchParams } from "next/navigation"
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
import { parseEther, parseUnits, type Address , zeroAddress, isAddress, formatEther} from "viem"
import { CONTRACTS, TOKEN_DECIMALS } from "@/lib/web3-config"
import MinterABI from "@/utils/ABIS/NFTMinter.json"
import { publicClient,walletClient } from "@/components/providers/wallet-provider"
import { readContract } from "viem/actions"

const minterAbi = [{"inputs":[{"internalType":"address","name":"_nftAddress","type":"address"},{"internalType":"address","name":"_rpAdd","type":"address"},{"internalType":"uint256","name":"_nextId","type":"uint256"},{"internalType":"uint256","name":"_mCost","type":"uint256"},{"internalType":"uint256","name":"_toId","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"_execute","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"_nextIdToMint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bob","outputs":[{"internalType":"contract BOTSOFBITCOIN","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"address","name":"token","type":"address"}],"name":"getMinterBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getMinterData","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxMintPerWallet","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mintCost","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"minterData","outputs":[{"internalType":"uint256","name":"totalMints","type":"uint256"},{"internalType":"address","name":"referer","type":"address"},{"internalType":"uint256","name":"totalReferals","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"ref","type":"address"}],"name":"pubMint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"referalBonus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rpBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rpCore","outputs":[{"internalType":"contract EventCore","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_toId","type":"uint256"},{"internalType":"uint256","name":"_mCost","type":"uint256"},{"internalType":"uint256","name":"_maxPerWallet","type":"uint256"},{"internalType":"uint256","name":"_rpBase","type":"uint256"},{"internalType":"uint256","name":"_nextIdToMint_","type":"uint256"}],"name":"setStates","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawEther","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawRaised","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawUserBalances","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const utilities = [
  { name: "Dynamic PFPs", icon: Sparkles, description: "NFTs that evolve based on market conditions" },
  { name: "Governance", icon: Shield, description: "Vote on protocol decisions and upgrades" },
  {name:"Exclusive Pass" , icon: Zap, description:" Priority access to  all Services , Products &  Events by Bots Of Bitcoin"},
  { name: "Discounts & Bonuses", icon: Zap, description: " Discounts on Platform Service Fees and Bonuses on many Events and Products" },
  { name: "Platform Revenue", icon: Sparkles, description: "Percent of Platform Revenue through staking." },
]

const mintDetails = [
  "Mints Allowed Current Round : 300",
  "Public Mint Amount: 15",
  "Mint Price: 0.005 ETH (or equivalent in WBTC/USDT)",
  "Earn 5% of mint cost from referral mints",
  "Earn Royalties on your mint's Secondary Sales"
]

function MintContent() {
  const { address, isConnected } = useAccount()
  const [mintQuantity, setMintQuantity] = useState(1)
  const [contractData , setContractData] = useState({
    mintPriceETH: 0.005, // base price per NFT in ETH
    pfpLimit: 10000,
    totalSupplyPerHolder: 15,
    mintLimitPerWallet: 15,
    roundLimit: 300,
    totalMinted: 0,
    mintStatus: "Live",
  })
  const [asset, setAsset] = useState<"ETH" | "WBTC" | "USDT">("ETH")
  const rf= useSearchParams().get("ref")
  const isRefAddress = isAddress(rf!);
  const referer = isRefAddress ? rf :zeroAddress
  //console.log(referer)
  // Mock FX rates (replace with oracle/price feed)
  const [rates] = useState({ ETH_USD: 3000, BTC_USD: 60000 })

  // Referrals state (replace with contract reads)
  const [refTotals, setRefTotals] = useState({
    totalReferrals: 0,
    totalReferredUsers: 0,
    totalEarnedEth: 0.00,
    withdrawableEth: 0.00
  })

  const { writeContractAsync, data: pendingHash, isPending: isWriting } = useWriteContract()
  const { isLoading: txLoading, isSuccess: txSuccess } = useWaitForTransactionReceipt({
    hash: pendingHash,
  })

  async function getAllContractReads(userAddress: `0x${string}`) {
  const CONTRACT_ADDRESS = CONTRACTS.BOB_NFT

  const results = await publicClient.multicall({
    contracts: [
      { address: CONTRACT_ADDRESS, abi: minterAbi, functionName: "_nextIdToMint" },
      { address: CONTRACT_ADDRESS, abi: minterAbi, functionName: "mintCost" },
      { address: CONTRACT_ADDRESS, abi: minterAbi, functionName: "getRaised" },
      { address: CONTRACT_ADDRESS, abi: minterAbi, functionName: "getMinterData", args: [userAddress] },
      { address: CONTRACT_ADDRESS, abi: minterAbi, functionName: "getMinterBalances", args: [userAddress, "0x0000000000000000000000000000000000000000"] },
    ],
    allowFailure: false, // throws if any call fails
  })

  const [nextId, mintCost, raised, minterData, minterBalanceRaw] = results as [
    bigint,                 // _nextIdToMint
    bigint,                 // mintCost
    bigint,                 // raised
    [bigint, bigint, `0x${string}`], // getMinterData return tuple (adjust if ABI has more fields)
    bigint                  // getMinterBalances
  ]
   setContractData({
    ...contractData,
    mintPriceETH: Number(formatEther(mintCost as bigint)),
    totalMinted: 2550 - Number(nextId) +1,
    totalSupplyPerHolder:Number(minterData[0])
  })
  setRefTotals({
    ...refTotals,
    totalReferrals:Number(minterData[1]),
    withdrawableEth:Number(formatEther(minterBalanceRaw as bigint))
  })
  return {
    nextId: Number(nextId),
    mintCost: formatEther(mintCost as bigint),
    raised: formatEther(raised as bigint),
    minterData, // depends on how contract returns it (tuple/struct)
    minterBalance: formatEther(minterBalanceRaw as bigint),
  }
}
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
      abi: minterAbi,
      functionName: "pubMint",
      args: [referer],
      value: totalCostBigInt(),
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
        abi: minterAbi,
        functionName: "withdrawUserBalances",
        args: [zeroAddress,parseEther(refTotals.withdrawableEth.toString())],
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
    const link = `${window.location.origin}/mint?ref=${ref}`
    navigator.clipboard.writeText(link)
  }

 useEffect(() => {
  if (!address) return
  ;(async () => {
    const data = await getAllContractReads(address as `0x${string}`)
    console.log("Contract Reads:", data)
  })()
}, [address, txSuccess])

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
                      <span className="text-gray-400">Mint Limit/Wallet:</span>
                      <div className="text-white font-bold">{contractData.mintLimitPerWallet}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Mints This Round:</span>
                      <div className="text-white font-bold">{contractData.roundLimit} </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Mints Left:</span>
                      <div className="text-white font-bold">{contractData.totalMinted}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Your Total Mints:</span>
                      <div className="text-white font-bold">{contractData.totalSupplyPerHolder}</div>
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
                      <Image
                        src={imageHolder}
                        alt="BOB NFT Preview"
                        className="w-full h-full object-contain bg-gradient-to-br from-pink-500 via-purple-600 to-pink-700"
                      />
                    </div>
                    
                  </div>

                  {/* Asset selector */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300 font-medium">Pay With</div>
                    <div className="flex flex-wrap gap-2">
                      {(["ETH"] as const).map((a) => (
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
                        value={`${window.location.origin}/mint?ref=${address || "0x..."}`}
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
                      Share this link. You earn 5% from mints by your referrals.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-black/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Total Referrals</span>
                        <span className="text-white font-semibold">
                          {refTotals.totalReferrals}
                        </span>
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
