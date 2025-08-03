"use client"

import { motion } from "framer-motion"
import { Twitter, MessageCircle, Send, HelpCircle, Github, Mail, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/kokonutui",
    description: "Follow us for updates",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "https://discord.gg/kokonutui",
    description: "Join our community",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/kokonutui",
    description: "Get instant updates",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/kokonutui",
    description: "View source code",
  },
]

const quickLinks = [
  {
    name: "FAQ",
    icon: HelpCircle,
    href: "#faq",
    description: "Frequently asked questions",
  },
  {
    name: "Documentation",
    icon: ExternalLink,
    href: "#docs",
    description: "Technical documentation",
  },
  {
    name: "Contact",
    icon: Mail,
    href: "#contact",
    description: "Get in touch with us",
  },
]

export default function Footer() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-black border-t border-[#ffaf19]/20">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#ffaf19] to-[#ff8c00] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-base md:text-lg">B</span>
                </div>
                <span className="text-[#ffaf19] font-bold text-xl md:text-2xl">BOTS OF BITCOIN</span>
              </div>
              <p className="text-gray-300 leading-relaxed max-w-md text-sm md:text-base">
                 Bots of Bitcoin mashes up NFTs and Bitcoin DeFi in style — tap into BTC-Fi with cutting-edge Yield Vaults, Index Fund Vaults, and smooth Swaps. Collect from 10,000 one-of-a-kind dynamic NFTs that can transform their looks!
              </p>
              
            </motion.div>

            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 md:space-y-6"
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#ffaf19] mb-4 md:mb-6">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={isMobile ? {} : { scale: 1.02, y: -1 }}
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <div className="bg-black/50 border border-[#ffaf19]/20 rounded-lg md:rounded-xl p-3 md:p-4 hover:border-[#ffaf19]/40 hover:bg-black/70 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-[#ffaf19]/10">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                          <social.icon className="w-4 h-4 md:w-5 md:h-5 text-[#ffaf19] group-hover:text-[#ff8c00] transition-colors" />
                          <span className="text-white font-medium text-xs md:text-sm group-hover:text-[#ffaf19] transition-colors">
                            {social.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {social.description}
                        </p>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 md:space-y-6"
            >
              <h3 className="text-lg md:text-xl font-semibold text-[#ffaf19] mb-4 md:mb-6">Quick Links</h3>
              <div className="space-y-2 md:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={isMobile ? {} : { x: 2 }}
                    className="group cursor-pointer"
                    onClick={() => scrollToSection(link.href)}
                  >
                    <div className="flex items-center gap-3 p-2 md:p-3 rounded-lg hover:bg-black/50 transition-all duration-200">
                      <div className="p-1.5 md:p-2 rounded-lg bg-[#ffaf19]/10 group-hover:bg-[#ffaf19]/20 transition-colors">
                        <link.icon className="w-3 h-3 md:w-4 md:h-4 text-[#ffaf19]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-xs md:text-sm group-hover:text-[#ffaf19] transition-colors">
                          {link.name}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                          {link.description}
                        </div>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-[#ffaf19] transition-colors" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-between pt-6 md:pt-8 border-t border-[#ffaf19]/10 space-y-3 md:space-y-0"
          >
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
              <span>© 2024 Kokonut UI. All rights reserved.</span>
              <div className="flex items-center gap-3 md:gap-4">
                <button onClick={() => scrollToSection("#privacy")} className="hover:text-[#ffaf19] transition-colors">
                  Privacy Policy
                </button>
                <span className="text-gray-600">•</span>
                <button onClick={() => scrollToSection("#terms")} className="hover:text-[#ffaf19] transition-colors">
                  Terms of Service
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-xs md:text-sm text-gray-400">Made with</span>
              <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-[#ffaf19] to-[#ff8c00] rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm text-gray-400">by developers</span>
            </div>
          </motion.div>

          {/* Back to Top Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center pt-4 md:pt-8"
          >
            <button
              onClick={scrollToTop}
              className="border-[#ffaf19]/30 text-[#ffaf19] hover:bg-[#ffaf19] hover:text-black transition-all duration-300 rounded-full px-6 md:px-8 py-2 bg-transparent text-sm md:text-base"
            >
              Back to Top ↑
            </button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
