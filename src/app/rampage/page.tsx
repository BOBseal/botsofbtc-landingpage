"use client"

import { useCallback, useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Coins, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PixelBackground from "@/components/rampagecards/pixelBackground"
import WelcomeCard from "@/components/rampagecards/welcomeCard"
import StatsPanel from "@/components/rampagecards/statsPanel"
import DailyLoginCard from "@/components/rampagecards/dailyLogin"
import SpiceClaimsCard from "@/components/rampagecards/dailySpice"
import { publicClient, walletClient } from "@/components/providers/wallet-provider"
import EVENT_CORE from "@/utils/ABIS/EventCore.json"
import RampageV1  from "@/utils/ABIS/RAMPAGEv1.json"
import { Address, erc20Abi, erc721Abi,decodeAbiParameters, formatUnits} from "viem"
import { useAccount } from "wagmi"
import { Bytes } from "ethers"
import { CONTRACTS, TOKEN_DECIMALS } from "@/lib/web3-config"

const Contracts = {
  rampage:{
    address:"0xC4f681699CCDfFB26be46f1E109896cBb13cF18F" ,//as `0x${string}`,
    abi:RampageV1.abi //as any[]
  },
  core:{
    address:"0xCA9c5943Dd7d0fE1E6A0Cf12F2eA65d310A3b2AA",
    abi:EVENT_CORE.abi
  }
}

function decodeUsername(encoded: `0x${string}`): string {
  const [username] = decodeAbiParameters(
    [{ type: "string" }],
    encoded as `0x${string}`
  );
  return username;
}

type UserData = {
  username: Bytes;
  points: bigint;
  referalCount: bigint;
  pohVerified: boolean;
  accountInitialized: boolean;
};

type Profile = {
  username: string
  userAddress: Address
  bobsHeld: number
  sobsHeld: number
  bethHeld: number
  referrals: number
  rpBalance: number
  lastDailyAt?: number
  rpDaily: number
}

const YELLOW = "#f1c40f" // bright Rampage yellow
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray

export default function RampagePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [uActive , setUActive] = useState(false);
  const [tab, setTab] = useState<"daily" | "claims">("claims")
  const { address, isConnected } = useAccount()

  async function isActive(params:`0x${string}`) {
    try {
      const add = Contracts.rampage.address as Address
      const active = await publicClient.readContract({
        address:add,
        abi:Contracts.rampage.abi,
        functionName:"userActivated",
        args:[params]
      })
      //console.log(active)
      setUActive(active as boolean);
      return active
    } catch (error) {
      console.log(error)
    }
  }

  async function getRampageData(params:Address) {
    try {
      const RampageAddress = Contracts.core.address as Address
      const RampageAbi = Contracts.core.abi as any[]
      const rpAddr = Contracts.rampage.address as Address
      const results = await publicClient.multicall({
          contracts: [
            {address: RampageAddress, abi: RampageAbi, functionName: "getUser" , args:[params] },
            {address: rpAddr, abi: Contracts.rampage.abi, functionName: "userRpPerDay" , args:[params] },
            {address: rpAddr, abi: Contracts.rampage.abi, functionName: "getUsername" , args:[params] },
            {address: rpAddr, abi: Contracts.rampage.abi, functionName: "getUserLastSignTime" , args:[params] },
            {address: rpAddr, abi: Contracts.rampage.abi, functionName: "userReferals" , args:[params] },
            {address: CONTRACTS.BOB , abi:erc721Abi,functionName:"balanceOf", args:[params]},
            {address: CONTRACTS.SOB , abi:erc721Abi,functionName:"balanceOf", args:[params]},
            {address: CONTRACTS.BETH , abi:erc20Abi,functionName:"balanceOf", args:[params]},
          ],
          allowFailure: false, // throws if any call fails
        })
        const [
          userData,
          rpPerD,
          username,
          lastSigntime,
          tReferals,
          bobBalances,
          sobBalances,
          bethBalances
        ] = results as unknown as [
          UserData,
          bigint,
          string,
          bigint,
          bigint,
          bigint,
          bigint,
          bigint
        ];
        const rpBalances = Number(userData.points);
        const bB = Number(formatUnits(bethBalances,26));
        const BethHeld = parseFloat(bB.toFixed(3));
        setProfile({
          ...profile as Profile,
          username:username as string,
          bobsHeld: Number(bobBalances),
          sobsHeld: Number(sobBalances),
          rpBalance:rpBalances,
          bethHeld: BethHeld,
          lastDailyAt:Number(lastSigntime),
          referrals:Number(tReferals),
          rpDaily:Number(rpPerD),
          userAddress:params
        })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchRampageData = useCallback(async () => {
    const res = await getRampageData(address as Address) // your function
  }, [address])

  useEffect(() => {
    isActive(address as `0x${string}`);
    fetchRampageData()
  }, [address,fetchRampageData])

  const mintProfile = useCallback((username: string) => {
    const now = Date.now()
    const initial: Profile = {
      username,
      userAddress: address as Address,
      bobsHeld: 6,
      bethHeld:0,
      sobsHeld: 19,
      referrals: 0,
      rpBalance: 100000,
      rpDaily:50
    }
    setProfile(initial)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const awardDaily = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, rpBalance: profile.rpBalance + Math.floor(amount), lastDailyAt: Date.now() }
      setProfile(p)
    },
    [profile],
  )

  const claimSpice = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, lastSpiceClaimAt: Date.now() }
      setProfile(p)
      alert(`Claimed ${amount.toFixed(2)} Spice!`)
    },
    [profile],
  )

  const claimBeth = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, lastSpiceClaimAt: Date.now() }
      setProfile(p)
      alert(`Claimed ${amount.toFixed(2)} BETH Spice!`)
    },
    [profile],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      <Navbar />

      <main className="pt-20 md:pt-24 pb-28 relative">
        {/* Enhanced top stripe */}
        <div
          className="fixed top-0 left-0 right-0 h-4 z-40"
          style={{
            background: `linear-gradient(90deg, ${YELLOW}, ${GOLD}, ${DARK_YELLOW}, ${LIGHT_YELLOW})`,
            backgroundSize: "300% 100%",
            animation: "gradient-flow 8s ease-in-out infinite",
          }}
        />

        {!uActive ? (
          <WelcomeCard onMint={mintProfile} />
        ) : (
          <div className="space-y-6 md:space-y-8">
            <div className="text-center space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold"
                style={{
                  color: YELLOW,
                  textShadow: `0 0 30px ${YELLOW}80, 0 0 60px ${YELLOW}40`,
                }}
              >
                RAMPAGE
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xs md:text-sm text-gray-300 px-4 max-w-4xl mx-auto leading-relaxed"
              >
                Rampage is the incentivised phase of launch for BOTS OF BITCOIN. Collect $RP, Fusion S3 Spice & more as
                we launch incentivised services. Complete tasks or use our products to earn platform points.
              </motion.p>
            </div>

            <div className="relative flex items-center justify-center">
              <button
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white transform transition-all duration-200 hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${BLACK}e0, ${DARK_GRAY}c0)`,
                  boxShadow: `0 5px 15px rgba(0,0,0,0.4), 0 0 0 1px ${YELLOW}30 inset`,
                }}
                onClick={() => setTab((t) => (t === "claims" ? "daily" : "claims"))}
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex-1 space-y-6">
                {/* STATS */}
                <StatsPanel profile={profile as Profile} />

                {/* Enhanced Tabs */}
                <div className="w-full max-w-5xl mx-auto px-4">
                  <div className="flex items-center gap-3 justify-center">
                    <Button
                      onClick={() => setTab("daily")}
                      className={`rounded-full font-bold px-6 py-3 transform transition-all duration-200 hover:scale-105 ${
                        tab === "daily" ? "scale-105" : ""
                      }`}
                      style={{
                        background: tab === "daily" ? YELLOW : "rgba(255,255,255,0.1)",
                        color: tab === "daily" ? BLACK : "white",
                        boxShadow: tab === "daily" ? `0 8px 25px ${YELLOW}60` : "0 2px 10px rgba(0,0,0,0.2)",
                        border: tab === "daily" ? "none" : `1px solid ${YELLOW}40`,
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Daily Login
                    </Button>
                    <Button
                      onClick={() => setTab("claims")}
                      className={`rounded-full font-bold px-6 py-3 transform transition-all duration-200 hover:scale-105 ${
                        tab === "claims" ? "scale-105" : ""
                      }`}
                      style={{
                        background: tab === "claims" ? YELLOW : "rgba(255,255,255,0.1)",
                        color: tab === "claims" ? BLACK : "white",
                        boxShadow: tab === "claims" ? `0 8px 25px ${YELLOW}60` : "0 2px 10px rgba(0,0,0,0.2)",
                        border: tab === "claims" ? "none" : `1px solid ${YELLOW}40`,
                      }}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Spice Claims
                    </Button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {tab === "daily" ? (
                    <motion.div
                      key="daily"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DailyLoginCard profile={profile as Profile} onClaim={awardDaily} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="claims"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SpiceClaimsCard profile={profile as Profile} onClaimSpice={claimSpice} onClaimBeth={claimBeth} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white transform transition-all duration-200 hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${BLACK}e0, ${DARK_GRAY}c0)`,
                  boxShadow: `0 5px 15px rgba(0,0,0,0.4), 0 0 0 1px ${YELLOW}30 inset`,
                }}
                onClick={() => setTab((t) => (t === "daily" ? "claims" : "daily"))}
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <PixelBackground />
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}
