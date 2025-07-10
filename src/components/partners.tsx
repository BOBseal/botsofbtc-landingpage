"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

// Sample partner data - replace with actual partnerInfo data
import {partnerInfo} from "../configs/config"
 
// Responsive image sizing data
const imgSizeData = {
  sm: { width: 80, height: 40 },
  md: { width: 120, height: 60 },
  lg: { width: 160, height: 80 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const firstRowPartners = partnerInfo.slice(0, Math.ceil(partnerInfo.length / 2))
const secondRowPartners = partnerInfo.slice(Math.ceil(partnerInfo.length / 2))


function PartnerLogo({ partner, size }: { partner: (typeof partnerInfo)[0]; size: keyof typeof imgSizeData }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <div className="relative bg-black/30 border border-[#ffaf19]/20 rounded-xl p-4 md:p-6 lg:p-8 hover:border-[#ffaf19]/40 hover:bg-black/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#ffaf19]/10 mx-3 md:mx-4">
          {/* Logo Container */}
          <div className="flex items-center justify-center h-12 md:h-16 lg:h-20 mb-3 md:mb-4">
            <div className="relative">
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.id} logo`}
                width={imgSizeData[size].width}
                height={imgSizeData[size].height}
                className="object-contain filter opacity-70 group-hover:opacity-100 transition-opacity duration-200"
                style={{ filter: "" }}
              />
            </div>
          </div>

          {/* External Link Icon */}
          <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-[#ffaf19]" />
          </div>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ffaf19]/5 to-[#ff8c00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </a>
    </motion.div>
  )
}

function AnimatedPartnerRow({
  partners,
  direction = "right",
  speed = 50,
}: {
  partners: typeof partnerInfo
  direction?: "left" | "right"
  speed?: number
}) {
  const [screenSize, setScreenSize] = useState<keyof typeof imgSizeData>("md")

  useEffect(() => {
    const updateScreenSize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("sm")
      } else if (window.innerWidth < 1024) {
        setScreenSize("md")
      } else {
        setScreenSize("lg")
      }
    }

    updateScreenSize()
    window.addEventListener("resize", updateScreenSize)
    return () => window.removeEventListener("resize", updateScreenSize)
  }, [])

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  // Responsive speed adjustment
  const responsiveSpeed = screenSize === "sm" ? speed * 0.7 : screenSize === "md" ? speed * 0.85 : speed

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: direction === "right" ? [0, -100 * partners.length] : [0, 100 * partners.length],
        }}
        transition={{
          duration: responsiveSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          width: `${duplicatedPartners.length * (screenSize === "sm" ? 200 : screenSize === "md" ? 280 : 360)}px`,
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <PartnerLogo key={`${partner.id}-${index}`} partner={partner} size={screenSize} />
        ))}
      </motion.div>
    </div>
  )
}

export default function PartnersIntegrations() {
  const [isPaused, setIsPaused] = useState(false)

  // Split partners into two rows for alternating animation
  return (
    <section className="py-20 px-4 md:px-6 bg-black border-t border-[#ffaf19]/10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffaf19] to-[#ff8c00]">
              Partners & Integrations
            </h2>
          </motion.div>

          {/* Animated Partners Carousel */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 md:space-y-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* First Row - Right to Left */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <motion.div
                animate={{ animationPlayState: isPaused ? "paused" : "running" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedPartnerRow partners={firstRowPartners} direction="right" speed={40} />
              </motion.div>
            </div>

            {/* Second Row - Left to Right */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

              <motion.div
                animate={{ animationPlayState: isPaused ? "paused" : "running" }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedPartnerRow partners={secondRowPartners} direction="left" speed={45} />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Section */}

         
        </motion.div>
      </div>
    </section>
  )
}
