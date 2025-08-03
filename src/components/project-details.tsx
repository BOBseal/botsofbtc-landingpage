"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Zap, Layers, Globe, Smartphone, Github, CheckCircle, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const technologies = [
  { name: "Next.js 15", description: "React framework with App Router", icon: Code },
  { name: "TypeScript", description: "Type-safe JavaScript development", icon: Code },
  { name: "Framer Motion", description: "Advanced animations and interactions", icon: Zap },
  { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: Palette },
  { name: "SVG Processing", description: "Advanced vector graphics parsing", icon: Layers },
  { name: "Responsive Design", description: "Mobile-first approach", icon: Smartphone },
]

const features = [
  "Advanced SVG path tracing with real-time animations",
  "Comprehensive vector graphics parsing and rendering",
  "Responsive design with mobile-first approach",
  "Custom color theming with #ffaf19 accent",
  "Smooth scrolling navigation and transitions",
  "Performance-optimized rendering pipeline",
  "Cross-browser compatibility and accessibility",
  "Modular component architecture",
]

export default function ProjectDetails() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <section id="project" className="min-h-screen bg-black py-12 md:py-20 px-4 md:px-6">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffaf19] to-[#ff8c00]">
              Project Overview
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              An innovative SVG path tracing application that transforms static vector graphics into dynamic, animated
              experiences through advanced parsing algorithms and real-time rendering techniques.
            </p>
          </motion.div>

          {/* Purpose Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 md:space-y-8"
          >
            <Card className="bg-black/50 border-[#ffaf19]/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-[#ffaf19] flex items-center gap-3">
                  <Globe className="w-5 h-5 md:w-6 md:h-6" />
                  Project Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-3 md:space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  This project demonstrates the intersection of modern web technologies and creative visual design. By
                  implementing sophisticated SVG parsing and path tracing algorithms, we create immersive experiences
                  that bring static graphics to life.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  The application serves as both a technical showcase and a practical tool for understanding how vector
                  graphics can be dynamically manipulated and animated in real-time web environments.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#ffaf19] text-center">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-black/30 border border-[#ffaf19]/10 hover:border-[#ffaf19]/30 transition-colors duration-200"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#ffaf19] mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-[#ffaf19] text-center">Technologies Used</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={isMobile ? {} : { scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-black/50 border-[#ffaf19]/20 hover:border-[#ffaf19]/40 transition-all duration-200 h-full">
                    <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-[#ffaf19]/10 group-hover:bg-[#ffaf19]/20 transition-colors duration-200">
                          <tech.icon className="w-4 h-4 md:w-6 md:h-6 text-[#ffaf19]" />
                        </div>
                        <h4 className="text-base md:text-lg font-semibold text-white">{tech.name}</h4>
                      </div>
                      <p className="text-gray-400 text-xs md:text-sm">{tech.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-4 md:space-y-6"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white">Ready to Explore?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Dive deeper into the technical implementation or start building your own SVG path tracing applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-[#ffaf19] hover:bg-[#ff8c00] text-black font-semibold px-6 md:px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="border-[#ffaf19] text-[#ffaf19] hover:bg-[#ffaf19] hover:text-black px-6 md:px-8 py-3 rounded-lg transition-all duration-300 bg-transparent"
              >
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
