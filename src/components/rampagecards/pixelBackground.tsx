"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const YELLOW = "#f1c40f" // bright Rampage yellow
const DARK_YELLOW = "#d4ac0d" // darker yellow
const LIGHT_YELLOW = "#f7dc6f" // lighter yellow
const GOLD = "#f39c12" // golden yellow
const BLACK = "#1a1a1a" // rich black
const DARK_GRAY = "#2c2c2c" // dark gray
const LIGHT_GRAY = "#3a3a3a" // lighter gray

// BG
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

export default PixelBackground