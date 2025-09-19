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
  rpDaily: number
}

const YELLOW = "#f1c40f" // bright Rampage yellow
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray
const LIGHT_GRAY = "#3a3a3a" // lighter gray

// Daily Login Panel
function DailyLoginCard({ profile, onClaim }: { profile: Profile; onClaim: (amount: number) => void }) {
  const now = Date.now()
  const eligible = profile.rpDaily;
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

export default DailyLoginCard