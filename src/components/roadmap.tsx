"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle,
  Clock,
  Zap,
  Rocket,
  Shield,
  Coins,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  Target,
  Star,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const roadmapData = [
  {
    phase: "Phase 1",
    title: "Foundation & Launch",
    status: "completed",
    quarter: "Q4 2024",
    items: [
      {
        title: "Community Building & V1 Website",
        description: "Launch of V1 website and all other socials",
        icon: Shield,
        completed: true,
      },
      {
        title: "SOB Collection Genesis",
        description: "Launch of 3456 SOB NFTs inspired from Skibidi Toilet Meme",
        icon: Sparkles,
        completed: true,
      },
      {
        title: "Launch Of BOTS OF BITCOIN NFTs",
        description: "Genesis mints for BOTS OF BITCOIN NFT Collection",
        icon: Coins,
        completed: true,
      },
      {
        title: "Vaults V1 Development",
        description: "Start development and research for Tokenized Vaults",
        icon: Users,
        completed: true,
      },
    ],
  },
  {
    phase: "Phase 2",
    title: "DeFi Launch",
    status: "in-progress",
    quarter: "Q1 2025",
    items: [
      {
        title: "AAVE Vaults BETA Launch",
        description: "Launch BETA version of AAVE based Yield Vaults on Testnet",
        icon: TrendingUp,
        completed: true,
      },
      {
        title: "Index Fund Vault - BETH",
        description: "Hybrid Vault acting as Index Fund for Bitcoin & Ethereum",
        icon: Target,
        completed: true,
      },
      {
        title: "AAVE Vaults Mainnet Launch",
        description: "Launch Mainnet Vaults for AAVE supported assets",
        icon: Zap,
        completed: false,
      },
      {
        title: "BOB Staking V1",
        description: "Staking for BOB NFTs with Vault tokens as rewards",
        icon: Star,
        completed: false,
      },
    ],
  },
  {
    phase: "Phase 3",
    title: "Utility Expansion",
    status: "upcoming",
    quarter: "Q1 2026",
    items: [
      {
        title: "Chain Expansions",
        description: "Deployments of Existing Products on MultiChain",
        icon: Globe,
        completed: false,
      },
      {
        title: "Dynamic NFT Evolution",
        description: "NFTs that change appearance based on market conditions along with a NFT Marketplace",
        icon: Sparkles,
        completed: false,
      },
      {
        title: "Unified Protocol Access",
        description: "Access to Multiple Defi Applications via a unified Interface",
        icon: Users,
        completed: false,
      },
      {
        title: "DAO V1",
        description: "Release and Testing of Decentralized Governance",
        icon: Rocket,
        completed: false,
      },
    ],
  },
  {
    phase: "Phase 4",
    title: "DePIN + RWA Expansion",
    status: "planned",
    quarter: "Q4 2024",
    items: [
      {
        title: "...",
        description: "...",
        icon: Shield,
        completed: false,
      },
      {
        title: "...",
        description: "...",
        icon: Zap,
        completed: false,
      },
      {
        title: "...",
        description: "...",
        icon: Coins,
        completed: false,
      },
      {
        title: "...",
        description: "...",
        icon: Globe,
        completed: false,
      },
    ],
  },
]

const statusConfig = {
  completed: {
    color: "#fae9c8",
    bgColor: "bg-[#fae9c8]/20",
    borderColor: "border-[#fae9c8]/40",
    icon: CheckCircle,
    label: "Completed",
  },
  "in-progress": {
    color: "#fae9c8",
    bgColor: "bg-[#fae9c8]/10",
    borderColor: "border-[#fae9c8]/30",
    icon: Clock,
    label: "In Progress",
  },
  upcoming: {
    color: "#fae9c8",
    bgColor: "bg-gray-800/50",
    borderColor: "border-gray-600/30",
    icon: Rocket,
    label: "Upcoming",
  },
  planned: {
    color: "#fae9c8",
    bgColor: "bg-gray-900/50",
    borderColor: "border-gray-700/20",
    icon: Target,
    label: "Planned",
  },
}

function RoadmapItem({
  item,
  index,
  phaseStatus,
}: {
  item: any
  index: number
  phaseStatus: keyof typeof statusConfig
}) {
  const [isMobile, setIsMobile] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-black/30 border border-[#fae9c8]/10 hover:border-[#fae9c8]/20 transition-all duration-300 group"
    >
      <div className={`p-2 rounded-lg ${item.completed ? "bg-[#fae9c8]/20" : "bg-gray-800/50"} flex-shrink-0`}>
        <item.icon className={`w-4 h-4 md:w-5 md:h-5 ${item.completed ? "text-[#fae9c8]" : "text-gray-400"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className={`font-semibold text-sm md:text-base mb-1 ${
            item.completed ? "text-[#fae9c8]" : "text-white"
          } group-hover:text-[#fae9c8] transition-colors`}
        >
          {item.title}
        </h4>
        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.description}</p>
      </div>
      {item.completed && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="flex-shrink-0">
          <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#fae9c8]" />
        </motion.div>
      )}
    </motion.div>
  )
}

function RoadmapPhase({ phase, index }: { phase: any; index: number }) {
  const config = statusConfig[phase.status as keyof typeof statusConfig]
  const StatusIcon = config.icon
  const [isMobile, setIsMobile] = useState(false)

  const completedItems = phase.items.filter((item: any) => item.completed).length
  const totalItems = phase.items.length
  const progressPercentage = (completedItems / totalItems) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <Card
        className={`${config.bgColor} ${config.borderColor} border-2 backdrop-blur-sm hover:border-[#fae9c8]/40 transition-all duration-300 group overflow-hidden`}
      >
        <CardContent className="p-4 md:p-6 lg:p-8">
          {/* Phase Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.bgColor} border ${config.borderColor}`}>
                  <StatusIcon className="w-5 h-5 md:w-6 md:h-6" style={{ color: config.color }} />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#fae9c8] group-hover:text-white transition-colors">
                    {phase.phase}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300">{phase.title}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <span className="text-xs md:text-sm font-medium text-[#fae9c8] bg-[#fae9c8]/10 px-3 py-1 rounded-full border border-[#fae9c8]/20">
                {phase.quarter}
              </span>
              <span className="text-xs text-gray-400">
                {completedItems}/{totalItems} completed
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-medium text-[#fae9c8]">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#fae9c8] to-[#fae9c8]/80 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Phase Items */}
          <div className="space-y-3 md:space-y-4">
            {phase.items.map((item: any, itemIndex: number) => (
              <RoadmapItem key={itemIndex} item={item} index={itemIndex} phaseStatus={phase.status} />
            ))}
          </div>

          {/* Status Badge */}
          <div className="mt-6 pt-4 border-t border-[#fae9c8]/10">
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.borderColor} border`}
              >
                <StatusIcon className="w-3 h-3" style={{ color: config.color }} />
                {config.label}
              </span>
              {phase.status === "in-progress" && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#fae9c8] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Active Development</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#fae9c8]/5 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:from-[#fae9c8]/10 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#fae9c8]/5 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:from-[#fae9c8]/10 transition-all duration-500" />
      </Card>

      {/* Connecting Line */}
      {index < roadmapData.length - 1 && (
        <div className="hidden lg:block absolute left-1/2 -bottom-8 w-0.5 h-16 bg-gradient-to-b from-[#fae9c8]/40 to-transparent transform -translate-x-0.5" />
      )}
    </motion.div>
  )
}

export default function Roadmap() {
  const [isMobile, setIsMobile] = useState(false)

  return (
    <section id="roadmap" className="py-12 md:py-20 px-4 md:px-6 bg-black border-t border-[#fae9c8]/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-16"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 md:space-y-6"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fae9c8] to-[#fae9c8]">
              Development Roadmap
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our journey to revolutionize Bitcoin DeFi and NFTs. Track our progress as we build the future of
              decentralized finance on Bitcoin.
            </p>
          </motion.div>

          {/* Roadmap Timeline */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {roadmapData.map((phase, index) => (
                <RoadmapPhase key={index} phase={phase} index={index} />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center space-y-4 md:space-y-6 pt-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">Stay Updated on Our Progress</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Join our community to get real-time updates on development milestones, feature releases, and exclusive
              previews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"https://discord.gg/m7MFmG6gKP"}>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#fae9c8] hover:bg-[#fae9c8]/90 text-black font-semibold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#fae9c8]/20"
              >
                <Users className="w-4 h-4" />
                Join Community
              </motion.button>
              </Link>
              <Link href={"https://botsofbtc.notion.site/BOTS-OF-BITCOIN-27ab822513f5459d861d07a6f11271ba"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 border border-[#fae9c8] text-[#fae9c8] hover:bg-[#fae9c8] hover:text-black px-6 md:px-8 py-3 rounded-lg transition-all duration-300 bg-transparent"
              >
                <Globe className="w-4 h-4" />
                View Documentation
              </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
