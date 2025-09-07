"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ChevronLeft, ChevronRight, Zap, Trophy, Coins, Users, Clock, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Profile = {
  username: string
  mintedAt: number
  bobsHeld: number
  sobsHeld: number
  referrals: number
  rpBalance: number
  lastDailyAt?: number
  lastSpiceClaimAt?: number
}

const YELLOW = "#f1c40f" // bright Rampage yellow
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray
const LIGHT_GRAY = "#3a3a3a" // lighter gray

// Utility to read/write local storage
function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("rampage_profile")
  if (!raw) return null
  try {
    return JSON.parse(raw) as Profile
  } catch {
    return null
  }
}
function saveProfile(p: Profile) {
  if (typeof window !== "undefined") {
    localStorage.setItem("rampage_profile", JSON.stringify(p))
  }
}

function PixelBackground() {
  // Enhanced "falling blocks" with yellow/gold theme
  const [w, setW] = useState(0)
  useEffect(() => {
    const onR = () => setW(window.innerWidth)
    onR()
    window.addEventListener("resize", onR)
    return () => window.removeEventListener("resize", onR)
  }, [])

  const blocks = useMemo(() => {
    const count = Math.max(15, Math.floor(w / 80))
    const colors = [YELLOW, DARK_YELLOW, GOLD, LIGHT_YELLOW]
    return new Array(count).fill(0).map((_, i) => ({
      left: (i / count) * 100,
      size: 8 + ((i * 17) % 5) * 8,
      delay: (i % 7) * 0.3,
      color: colors[i % colors.length],
      opacity: 0.6 + (i % 3) * 0.2,
    }))
  }, [w])

  return (
    <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-transparent" />
      {blocks.map((b, i) => (
        <motion.div
          key={i}
          initial={{ y: 100, opacity: 0, rotate: 0 }}
          animate={{
            y: [100, -20, 10, -20],
            opacity: [0, b.opacity, b.opacity * 0.8, b.opacity],
            rotate: [0, 45, -15, 45],
          }}
          transition={{
            duration: 8 + (i % 4),
            repeat: Number.POSITIVE_INFINITY,
            delay: b.delay,
            ease: "easeInOut",
          }}
          className="absolute bottom-0"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            backgroundColor: b.color,
            boxShadow: `0 0 0 2px rgba(0,0,0,0.3) inset, 0 0 20px ${b.color}60`,
            borderRadius: "2px",
          }}
        />
      ))}
      {/* Gradient base band */}
      <div
        className="absolute inset-x-0 bottom-0 h-6 md:h-8"
        style={{
          background: `linear-gradient(90deg, ${YELLOW}, ${GOLD}, ${DARK_YELLOW}, ${LIGHT_YELLOW}, ${YELLOW})`,
          backgroundSize: "200% 100%",
          animation: "gradient-shift 10s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  )
}

function WelcomeCard({ onMint }: { onMint: (username: string) => void }) {
  const [name, setName] = useState("")
  const canMint = name.trim().length >= 3

  return (
    <div className="w-full flex items-center justify-center py-16 md:py-24">
      <div className="w-full max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${YELLOW}f0, ${GOLD}e0, ${DARK_YELLOW}d0)`,
            boxShadow: `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px ${YELLOW}30 inset`,
          }}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, ${BLACK} 2px, transparent 2px), radial-gradient(circle at 75% 75%, ${DARK_GRAY} 2px, transparent 2px)`,
                backgroundSize: "50px 50px",
                animation: "float 20s ease-in-out infinite",
              }}
            />
          </div>

          <div className="relative p-6 md:p-10 text-black">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-center mb-6 md:mb-8 tracking-wide"
              style={{
                textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
                color: BLACK,
              }}
            >
              WELCOME TO
              <br />
              RAMPAGE
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <div
                className="rounded-2xl px-6 py-4 font-extrabold text-center text-sm md:text-base shadow-lg"
                style={{
                  background: BLACK,
                  color: YELLOW,
                  boxShadow: `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}40`,
                }}
              >
                {"TO PARTICIPATE IN RAMPAGE\nCHOOSE USERNAME & MINT ID"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center justify-center gap-3 md:gap-4 mb-8"
            >
              <span className="font-semibold text-lg" style={{ color: BLACK }}>
                Set Name:
              </span>
              <Input
                placeholder="Enter username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-56 md:w-72 rounded-xl bg-black/20 border-black/30 focus-visible:ring-black/40 backdrop-blur-sm text-black placeholder:text-black/60 font-medium"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center"
            >
              <Button
                onClick={() => canMint && onMint(name.trim())}
                disabled={!canMint}
                className="rounded-full font-extrabold px-8 md:px-12 py-6 text-sm md:text-base shadow-lg transform transition-all duration-200 hover:scale-105"
                style={{
                  background: canMint ? BLACK : "rgba(0,0,0,0.4)",
                  color: canMint ? YELLOW : "rgba(241,196,15,0.5)",
                  boxShadow: canMint
                    ? `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}40`
                    : "0 5px 15px rgba(0,0,0,0.2)",
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                MINT PROFILE
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StatsPanel({ profile }: { profile: Profile }) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://example.com"
  const referral = `${baseUrl}/rampage?ref=${encodeURIComponent(profile.username)}`

  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(referral)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {}
  }

  const stats = [
    { label: "Username", value: profile.username, icon: Users },
    { label: "BOBs Held", value: `${profile.bobsHeld} BOB`, icon: Coins },
    { label: "SOBs Held", value: `${profile.sobsHeld} SOB`, icon: Trophy },
    { label: "RP Balances", value: `${profile.rpBalance.toLocaleString()} $RP`, icon: Zap },
    { label: "RP Per Referral", value: "20 RP", icon: Target },
    { label: "Your Total Referrals", value: `${profile.referrals} Users`, icon: Users },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${YELLOW}f5, ${GOLD}f0, ${DARK_YELLOW}e5)`,
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px ${YELLOW}40 inset`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl p-4 text-white transform transition-all duration-200 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${BLACK}f0, ${DARK_GRAY}e0)`,
                  boxShadow: `0 8px 25px rgba(0,0,0,0.4), 0 0 0 1px ${YELLOW}20 inset`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: YELLOW, color: BLACK }}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs opacity-80 font-medium text-gray-300">{stat.label}</div>
                    <div className="text-sm font-extrabold" style={{ color: YELLOW }}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="text-right font-semibold" style={{ color: BLACK }}>
              Your Referral Link :
            </div>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={referral}
                className="bg-black/30 border-black/40 text-black font-mono text-xs md:text-sm backdrop-blur-sm"
              />
              <Button
                variant="outline"
                className="border-black/40 bg-black/20 hover:bg-black/30 backdrop-blur-sm text-black hover:text-yellow-600"
                onClick={copy}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function DailyLoginCard({ profile, onClaim }: { profile: Profile; onClaim: (amount: number) => void }) {
  const now = Date.now()
  const eligible = useMemo(() => {
    const base = 50
    return Math.max(10, Math.floor(base + profile.bobsHeld * 5 + profile.sobsHeld * 2 + profile.referrals * 1))
  }, [profile])

  const nextTime = profile.lastDailyAt ? profile.lastDailyAt + 24 * 60 * 60 * 1000 : 0
  const canMine = !profile.lastDailyAt || now >= nextTime

  const nextStr = useMemo(() => {
    if (canMine) return "Now"
    const d = new Date(nextTime)
    return d.toLocaleString()
  }, [canMine, nextTime])

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${BLACK}f5, ${DARK_GRAY}f0)`,
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px ${YELLOW}30 inset`,
        }}
      >
        {/* Header */}
        <div className="p-0 border-b" style={{ borderColor: `${YELLOW}40` }}>
          <div className="px-6 py-4 relative" style={{ background: `linear-gradient(135deg, ${YELLOW}20, ${GOLD}15)` }}>
            <h3
              className="text-xl md:text-2xl font-extrabold text-center flex items-center justify-center gap-3"
              style={{ color: YELLOW }}
            >
              <Clock className="w-6 h-6" />
              Daily Login
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <p className="text-center text-sm md:text-base font-medium" style={{ color: LIGHT_YELLOW }}>
            Task Desc: On-Chain Daily Log-In & Get Bonus RP
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-4 text-white transform transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${YELLOW}30, ${GOLD}20)`,
                boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px ${YELLOW}40 inset`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" style={{ color: YELLOW }} />
                  <span className="font-medium text-white">Eligible RP/Day :</span>
                </div>
                <Badge className="font-bold" style={{ backgroundColor: YELLOW, color: BLACK }}>
                  {eligible} RP
                </Badge>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-4 text-white transform transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${DARK_YELLOW}30, ${YELLOW}20)`,
                boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px ${YELLOW}40 inset`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" style={{ color: YELLOW }} />
                  <span className="font-medium text-white">Next Sign-In On :</span>
                </div>
                <span className="font-bold text-sm" style={{ color: LIGHT_YELLOW }}>
                  {nextStr}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={!canMine}
              onClick={() => onClaim(eligible)}
              className="rounded-full font-extrabold px-8 md:px-12 py-6 text-sm md:text-base transform transition-all duration-200 hover:scale-105"
              style={{
                background: canMine ? YELLOW : "rgba(241,196,15,0.3)",
                color: canMine ? BLACK : "rgba(0,0,0,0.5)",
                boxShadow: canMine ? `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}50` : "0 5px 15px rgba(0,0,0,0.2)",
              }}
            >
              <Zap className="w-5 h-5 mr-2" />
              Mine Daily RP
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function SpiceClaimsCard({
  profile,
  onClaimSpice,
  onClaimBeth,
}: {
  profile: Profile
  onClaimSpice: (amount: number) => void
  onClaimBeth: (amount: number) => void
}) {
  const perBOB = 500
  const perSOB = 100
  const perRP = 0.075
  const perBETH = 26.8

  const now = Date.now()
  const last = profile.lastSpiceClaimAt ?? profile.mintedAt
  const days = Math.max(0, (now - last) / (24 * 60 * 60 * 1000))

  const claimableBOBSpice = profile.bobsHeld * perBOB * days
  const claimableSOBSpice = profile.sobsHeld * perSOB * days
  const claimableRPSpice = profile.rpBalance * perRP * days
  const totalSpice = claimableBOBSpice + claimableSOBSpice + claimableRPSpice

  const bethDerived = perBETH * days

  const spiceData = [
    {
      label: "Spice Per BOB/day",
      value: `${perBOB} Spice`,
      held: `${profile.bobsHeld} BOB`,
      icon: Coins,
    },
    {
      label: "Spice Per SOB/day",
      value: `${perSOB} Spice`,
      held: `${profile.sobsHeld} SOB`,
      icon: Trophy,
    },
    {
      label: "Spice Per RP/day",
      value: `${perRP} Spice`,
      held: `${profile.rpBalance.toLocaleString()} $RP`,
      icon: Zap,
    },
    {
      label: "Spice Per $BETH/day",
      value: `${perBETH} Spice`,
      held: `${bethDerived.toFixed(2)} Spice`,
      icon: Target,
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: `linear-gradient(135deg, ${BLACK}f5, ${DARK_GRAY}f0)`,
          boxShadow: `0 25px 50px -12px rgba(0,0,0,0.6), 0 0 0 1px ${YELLOW}30 inset`,
        }}
      >
        {/* Header */}
        <div className="p-0 border-b" style={{ borderColor: `${YELLOW}40` }}>
          <div className="px-6 py-4 relative" style={{ background: `linear-gradient(135deg, ${YELLOW}20, ${GOLD}15)` }}>
            <h3
              className="text-xl md:text-2xl font-extrabold text-center flex items-center justify-center gap-3"
              style={{ color: YELLOW }}
            >
              <Coins className="w-6 h-6" />
              SPICE CLAIMS
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spiceData.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl p-4 text-white transform transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${YELLOW}25, ${GOLD}15)`,
                  boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px ${YELLOW}40 inset`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl mt-1" style={{ backgroundColor: BLACK, color: YELLOW }}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold mb-1 text-white">{item.label}</div>
                    <div className="text-xs mb-1" style={{ color: LIGHT_YELLOW }}>
                      {item.value}
                    </div>
                    <div className="text-xs opacity-80 text-gray-300">{item.held}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="rounded-2xl p-4 text-center transform transition-all duration-200 hover:scale-102"
            style={{
              background: `linear-gradient(135deg, ${YELLOW}30, ${GOLD}20)`,
              boxShadow: `0 8px 25px rgba(0,0,0,0.3), 0 0 0 1px ${YELLOW}50 inset`,
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <Trophy className="w-5 h-5" style={{ color: BLACK }} />
              <span className="text-lg font-bold" style={{ color: BLACK }}>
                Claimable Spice: {totalSpice.toFixed(2)} Spice
              </span>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              onClick={() => onClaimBeth(bethDerived)}
              className="rounded-full font-extrabold px-6 md:px-8 py-4 transform transition-all duration-200 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${DARK_YELLOW}, ${GOLD})`,
                color: BLACK,
                boxShadow: `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}40`,
              }}
            >
              <Target className="w-4 h-4 mr-2" />
              BETH Claim
            </Button>
            <Button
              onClick={() => onClaimSpice(totalSpice)}
              className="rounded-full font-extrabold px-6 md:px-8 py-4 transform transition-all duration-200 hover:scale-105"
              style={{
                background: YELLOW,
                color: BLACK,
                boxShadow: `0 10px 25px rgba(0,0,0,0.4), 0 0 20px ${YELLOW}50`,
              }}
            >
              <Coins className="w-4 h-4 mr-2" />
              Claim Spice
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function RampagePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [tab, setTab] = useState<"daily" | "claims">("daily")

  useEffect(() => {
    const p = loadProfile()
    setProfile(p)
  }, [])

  const mintProfile = useCallback((username: string) => {
    const now = Date.now()
    const initial: Profile = {
      username,
      mintedAt: now,
      bobsHeld: 6,
      sobsHeld: 19,
      referrals: 0,
      rpBalance: 100000,
    }
    saveProfile(initial)
    setProfile(initial)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const awardDaily = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, rpBalance: profile.rpBalance + Math.floor(amount), lastDailyAt: Date.now() }
      saveProfile(p)
      setProfile(p)
    },
    [profile],
  )

  const claimSpice = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, lastSpiceClaimAt: Date.now() }
      saveProfile(p)
      setProfile(p)
      alert(`Claimed ${amount.toFixed(2)} Spice!`)
    },
    [profile],
  )

  const claimBeth = useCallback(
    (amount: number) => {
      if (!profile) return
      const p = { ...profile, lastSpiceClaimAt: Date.now() }
      saveProfile(p)
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

        {!profile ? (
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
                <StatsPanel profile={profile} />

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
                      <DailyLoginCard profile={profile} onClaim={awardDaily} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="claims"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <SpiceClaimsCard profile={profile} onClaimSpice={claimSpice} onClaimBeth={claimBeth} />
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
