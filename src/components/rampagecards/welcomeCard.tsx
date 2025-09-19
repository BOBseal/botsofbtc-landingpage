"use client"

import {useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ChevronLeft, ChevronRight, Zap, Trophy, Coins, Users, Clock, Target } from "lucide-react"


const YELLOW = "#f1c40f" // bright Rampage yellow
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray
const LIGHT_GRAY = "#3a3a3a" // lighter gray

// Register Card
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

export default WelcomeCard