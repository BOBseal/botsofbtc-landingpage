"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ChevronLeft, ChevronRight, Zap, Trophy, Coins, Users, Clock, Target } from "lucide-react"


type Profile = {
  username: string
  bobsHeld: number
  sobsHeld: number
  bethHeld: number
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

// Spice claim
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
  const last = profile.lastSpiceClaimAt
  const days = Math.max(0, (now) / (24 * 60 * 60 * 1000))

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

export default SpiceClaimsCard