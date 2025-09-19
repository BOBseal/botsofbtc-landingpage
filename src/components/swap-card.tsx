"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, ChevronDown, Settings, Zap, AlertTriangle, Loader2 } from "lucide-react"
import { useWallet } from "@/components/providers/wallet-provider"
import {YELLOW} from "@/utils/constants";
import {ethers} from "ethers"
import {getSwapData} from "@/utils/hooks"
//import ERC20_ABI from "@/utils/ABIS/ERC20.json"
import {getContract,http, erc20Abi , parseUnits } from "viem"
import { bob } from "viem/chains";
import { walletClient,publicClient } from "@/components/providers/wallet-provider"

export let tokens = [
    {name:"WRAPPED ETHER" , symbol:"WETH", address:"0x4200000000000000000000000000000000000006", logo:null , decimals:18, balance:0},
    {name:"ETHEREUM" , symbol:"ETH", address:"0x0000000000000000000000000000000000000000", logo:null , decimals:18 , balance:0},
    {name:"WRAPPED BTC" , symbol:"WBTC", address:"0x0555e30da8f98308edb960aa94c0db47230d2b9c", logo:null, decimals:8,balance:0},
    {name:"USDT" , symbol:"USDT", address:"0x1217bfe6c773eec6cc4a38b5dc45b92292b6e189", logo:null, decimals:6,balance:0},
    {name:"USDC" , symbol:"USDC", address:"0xe75D0fB2C24A55cA1e3F96781a2bCC7bdba058F0", logo:null, decimals:6,balance:0},
    //{name:"SOVRYN" , symbol:"SOV", address:"0xba20a5e63eeEFfFA6fD365E7e540628F8fC61474", img:null, decimals:18, balance:0},
    {name:"DAI" , symbol:"DAI", address:"0x6c851F501a3F24E29A8E39a29591cddf09369080", img:null, decimals:18, balance:0},
    {name:"STAKE STONE" , symbol:"STONE", address:"0x96147A9Ae9a42d7Da551fD2322ca15B71032F342", img:null, decimals:18, balance:0},
    {name:"SOLV BTC" , symbol:"SolvBTC", address:"0x541fd749419ca806a8bc7da8ac23d346f2df8b77", img:null, decimals:18, balance:0},
    {name:"Universal BTC" , symbol:"uniBTC", address:"0x236f8c0a61dA474dB21B693fB2ea7AAB0c803894", img:null, decimals:18, balance:0},
]


async function fetchAndUpdateBalances(provider: ethers.providers.Provider, account: string) {
  await Promise.all(
    tokens.map(async (token) => {
      try {
        
        if (token.symbol === "ETH") {
          const bal = await provider.getBalance(account)
          token.balance = parseFloat(ethers.utils.formatUnits(bal, token.decimals))
        } else {
          const contract = new ethers.Contract(token.address, erc20Abi, provider)
          const bal = await contract.balanceOf(account)
          token.balance = parseFloat(ethers.utils.formatUnits(bal, token.decimals))
          console.log(`${token.symbol} balance: ${token.balance}`)
        }
      } catch (err) {
        console.error(`Failed fetching ${token.symbol} balance:`, err)
        token.balance = 0
      }
    })
  )
}


interface SwapCardProps {
  isEmbedded?: boolean
  className?: string
}

export default function SwapCard({ isEmbedded = false, className = "" }: SwapCardProps) {
  const { isConnected , address } = useWallet()
  //const publicClient = usePublicClient();
  const [fromToken, setFromToken] = useState("WETH")
  const [toToken, setToToken] = useState("USDT")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isSwapping, setIsSwapping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState("0.5")
  const [loadingQuote, setLoadingQuote] = useState(false)
  const quoteCache = useMemo<Record<string, string>>(() => ({}), []) // simple in-memory cache
  const [txData , setTxData] = useState<any>();
  // wrap viem transport into ethers provider

  useEffect(() => {
  const loadBalances = async () => {
    if (!isConnected || !address || !publicClient) return
    const provider = new ethers.providers.Web3Provider(publicClient.transport)
    await fetchAndUpdateBalances(provider, address)
  }

  loadBalances()
}, [isConnected, address, publicClient])

  const fromTokenData = tokens.find((t) => t.symbol === fromToken)
  const toTokenData = tokens.find((t) => t.symbol === toToken)
  //const balanceData = 
  
  const updateQuote = async (input: string, type: "from" | "to") => {
    if (!fromTokenData || !toTokenData || !address) return
    if (!input || Number(input) <= 0) {
      type === "from" ? setToAmount("") : setFromAmount("")
      return
    }

    setLoadingQuote(true)
    try {
      const key = `${type}-${fromToken}-${toToken}-${input}`
      if (quoteCache[key]) {
        type === "from" ? setToAmount(quoteCache[key]) : setFromAmount(quoteCache[key])
        setLoadingQuote(false)
        return
      }

      const inputAmount = type === "from"
        ? ethers.utils.parseUnits(input, fromTokenData.decimals)
        : ethers.utils.parseUnits(input, toTokenData.decimals)

      const path = type === "from"
        ? [fromTokenData.address, toTokenData.address]
        : [toTokenData.address, fromTokenData.address]

      const res = await getSwapData(inputAmount, path, address)
      // Convert smallest unit to human-readable
      const decimals = type === "from" ? toTokenData.decimals : fromTokenData.decimals
      const formatted = (Number(ethers.utils.formatUnits(res.toAmount.toString(), decimals))).toFixed(decimals)

      type === "from" ? setToAmount(formatted) : setFromAmount(formatted)
      setTxData(res.tx)
      console.log(res)
      quoteCache[key] = formatted
    } catch (err) {
      console.error(err)
      type === "from" ? setToAmount("ERROR") : setFromAmount("ERROR")
    } finally {
      setLoadingQuote(false)
    }
  }

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromAmount(e.target.value)
    updateQuote(e.target.value, "from")
  }

  const swapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount("0")
    setToAmount("0")
  }

  const handleSwap = async () => {
    if (!isConnected || !fromAmount || Number(fromAmount) <= 0) return

    setIsSwapping(true)
    try {
      if(fromToken === "ETH"){
        const hash = await walletClient.sendTransaction({
        account:address,
        to:txData?.to,
        data:txData?.data,
        value:BigInt(txData?.value||"0")
      })
      publicClient.waitForTransactionReceipt({hash}).then(async(r)=>{
        const provider = new ethers.providers.Web3Provider(publicClient.transport)
        setTxData(undefined)
        await fetchAndUpdateBalances(provider, address!)
      })} else {
        const approveHash = await walletClient.writeContract({
          account: address,
          address: fromTokenData?.address as `0x${string}`,
          abi: erc20Abi,
          functionName: "approve",
          args: [txData?.to as `0x${string}`, parseUnits(fromAmount, fromTokenData!.decimals)],
        })
          const hash = await walletClient.sendTransaction({
          account:address,
          to:txData?.to,
          data:txData?.data,
          value:BigInt(txData?.value||"0")
        })
        publicClient.waitForTransactionReceipt({hash}).then(async(r)=>{
          const provider = new ethers.providers.Web3Provider(publicClient.transport)
          setTxData(undefined)
          await fetchAndUpdateBalances(provider, address!)
        })
      }
    } catch (error) {
      console.log(error)
      setIsSwapping(false)
    }
    setIsSwapping(false)

    // Reset form
    setFromAmount("")
    setToAmount("")
  }

  const handleMax =(amounts:string)=>{
    setFromAmount(amounts);
    updateQuote(amounts,"from")
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
                      setFromAmount("")
                      setToAmount("")
                      setTxData(undefined)
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#f1c40f]/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-lg">{token.logo}</span>
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-gray-400 text-xs">{token.name}</div>
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
              Balance: {fromTokenData?.balance.toFixed(8)} {fromToken}
            </span>
          </div>
          <div className="bg-black/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <TokenSelector selectedToken={fromToken} onSelect={setFromToken} label="FROM" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleMax(fromTokenData?.balance.toString() || "0") 
                }
                className="text-[#f1c40f] hover:bg-[#f1c40f]/10 text-xs"
              >
                MAX
              </Button>
            </div>
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e)=>handleFromChange(e)}
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
              Balance: {toTokenData?.balance.toFixed(8)} {toToken}
            </span>
          </div>
          <div className="bg-black/50 rounded-lg p-4 space-y-3">
            <TokenSelector selectedToken={toToken} onSelect={setToToken} label="TO" />
            <div className="text-2xl font-bold text-white">{loadingQuote ? "getting quote": <>{toAmount || "0.0"}</>}</div>
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
                {fromAmount} {fromToken} = {toAmount} {toToken}
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
                  Always verify token amounts before confirming swaps. Slippage may occur during high
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
