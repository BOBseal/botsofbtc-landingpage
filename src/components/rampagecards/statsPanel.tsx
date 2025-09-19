"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ChevronLeft, ChevronRight, Zap, Trophy, Coins, Users, Clock, Target } from "lucide-react"
import { Address } from "viem"


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
const LIGHT_GRAY = "#3a3a3a" // lighter gray

//Top Panel/Stats
function StatsPanel({ profile }: { profile: Profile }) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://example.com"
  const referral = `${baseUrl}/rampage?ref=${encodeURIComponent(profile.userAddress)}`

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
    { label: "BETH Held", value: `${profile.bethHeld} $BETH`, icon: Coins },
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

export default StatsPanel