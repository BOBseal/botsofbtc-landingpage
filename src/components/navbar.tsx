"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import WalletConnection from "@/components/wallet-connection"
import logo from "../assets/dp.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isMobile, setIsMobile] = useState(false)

  const onBethClick =()=>{
    alert("Undergoing Upgrades & Modifications");
  }
  const navItems = [
    { name: "Mint", href: "/mint", id: "mint", route: "/mint" },
    { name: "Rampage", href: "/rampage", id: "rampage", route: "/rampage" },
    { name: "Swap", href: "#home", id: "home", route: "/swap" },
    { name: "BTC-ETH", href: "/", id: "products" , onClick:true },
    { name: "Docs", href: "#docs", id: "docs", route: "https://botsofbtc.notion.site/BOTS-OF-BITCOIN-27ab822513f5459d861d07a6f11271ba?pvs=4" },
  ]

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(
    throttle(() => {
      if (isMobile) return // Skip on mobile for performance

      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }, 100),
    [isMobile, navItems],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#fae9c8]/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#fae9c8]/20 to-[#fae9c8]/10 border border-[#fae9c8]/30">
              <Image
                src={logo}
                alt="Bots of Bitcoin Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-[#fae9c8] font-bold text-lg md:text-xl">Bots of Bitcoin</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (item.route && item.route !== "/") {
                    window.location.href = item.route
                  } if(item.onClick && !item.route){
                      onBethClick()
                  } 
                  else {
                    scrollToSection(item.href)
                  }
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className={`text-white hover:text-[#fae9c8] transition-colors duration-200 font-medium relative group text-sm lg:text-base ${
                  activeSection === item.id ? "text-[#fae9c8]" : ""
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#fae9c8] transition-all duration-200 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </motion.button>
            ))}
            <WalletConnection onConnectionChange={() => {}} />
          </div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#fae9c8] hover:bg-[#fae9c8]/10 p-2"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-3 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  if (item.route && item.route !== "/") {
                    window.location.href = item.route
                  } 
                  if(item.onClick && !item.route){
                      onBethClick()
                  } 
                  else {
                    scrollToSection(item.href)
                  }
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className={`block text-left w-full text-white hover:text-[#fae9c8] transition-colors duration-200 font-medium py-2 px-2 rounded text-sm ${
                  activeSection === item.id ? "text-[#fae9c8] bg-[#fae9c8]/10" : ""
                }`}
              >
                {item.name}
              </motion.button>
            ))}
            <div className="pt-4 border-t border-[#fae9c8]/20">
              <WalletConnection onConnectionChange={() => {}} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

// Utility functions for performance optimization
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }) as T
}

function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }) as T
}
