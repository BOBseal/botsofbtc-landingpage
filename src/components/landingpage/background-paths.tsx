"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useMemo, useCallback } from "react"

interface SVGPathElement {
  d: string
  fill?: string
  stroke?: string
  strokeWidth?: string
  transform?: string
  id: string
  opacity?: string
  fillRule?: string
  clipPath?: string
}

interface SVGData {
  viewBox: string
  width: string
  height: string
  paths: SVGPathElement[]
}

function useSVGParser(svgUrl: string) {
  const [svgData, setSvgData] = useState<SVGData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parseSVG = async () => {
      try {
        const response = await fetch(svgUrl)
        const svgText = await response.text()

        const parser = new DOMParser()
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml")
        const svgElement = svgDoc.querySelector("svg")

        if (!svgElement) {
          throw new Error("Invalid SVG")
        }

        const viewBox = svgElement.getAttribute("viewBox") || "0 0 100 100"
        const width = svgElement.getAttribute("width") || "100"
        const height = svgElement.getAttribute("height") || "100"

        const paths: SVGPathElement[] = []

        // Simplified extraction for better performance
        const extractElements =(element: Element, parentTransform = "")=> {
          const children = Array.from(element.children)

          children.forEach((child, index) => {
            const transform = child.getAttribute("transform") || ""
            const combinedTransform = `${parentTransform} ${transform}`.trim()
            const tagName = child.tagName.toLowerCase()

            let pathData = ""

            // Only process essential SVG elements for mobile performance
            switch (tagName) {
              case "path":
                pathData = child.getAttribute("d") || ""
                break
              case "circle":
                const cx = Number.parseFloat(child.getAttribute("cx") || "0")
                const cy = Number.parseFloat(child.getAttribute("cy") || "0")
                const r = Number.parseFloat(child.getAttribute("r") || "0")
                if (r > 0) {
                  pathData = `M${cx - r},${cy}A${r},${r} 0 1,0 ${cx + r},${cy}A${r},${r} 0 1,0 ${cx - r},${cy}Z`
                }
                break
              case "rect":
                const x = Number.parseFloat(child.getAttribute("x") || "0")
                const y = Number.parseFloat(child.getAttribute("y") || "0")
                const w = Number.parseFloat(child.getAttribute("width") || "0")
                const h = Number.parseFloat(child.getAttribute("height") || "0")
                if (w > 0 && h > 0) {
                  pathData = `M${x},${y}L${x + w},${y}L${x + w},${y + h}L${x},${y + h}Z`
                }
                break
              case "g":
              case "svg":
                extractElements(child, combinedTransform)
                return
              default:
                return
            }

            if (pathData && pathData.trim()) {
              paths.push({
                d: pathData,
                fill: child.getAttribute("fill") || "none",
                stroke: child.getAttribute("stroke") || "none",
                strokeWidth: child.getAttribute("stroke-width") || "1",
                transform: combinedTransform,
                opacity: child.getAttribute("opacity") || "1",
                fillRule: child.getAttribute("fill-rule") || "nonzero",
                clipPath: child.getAttribute("clip-path") || "",
                id: `${tagName}-${paths.length}`,
              })
            }

            if (child.children.length > 0) {
              extractElements(child, combinedTransform)
            }
          })
        }

        extractElements(svgElement)

        // Limit paths for mobile performance
        const isMobile = window.innerWidth < 768
        const maxPaths = isMobile ? 20 : 50
        const limitedPaths = paths.slice(0, maxPaths)

        setSvgData({ viewBox, width, height, paths: limitedPaths })
      } catch (error) {
        console.error("Error parsing SVG:", error)
      } finally {
        setLoading(false)
      }
    }

    parseSVG()
  }, [svgUrl])

  return { svgData, loading }
}

function TracedSVGPaths({ svgData }: { svgData: SVGData }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Reduce animation complexity on mobile
  const animationConfig = useMemo(
    () => ({
      pathDuration: isMobile ? 2 : 3,
      opacityDuration: isMobile ? 3 : 4,
      delay: isMobile ? 0.05 : 0.03,
      layers: isMobile ? 2 : 3, // Fewer layers on mobile
    }),
    [isMobile],
  )

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox={svgData.viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          filter: isMobile ? "none" : "drop-shadow(0 0 20px rgba(255, 175, 25, 0.4))",
          willChange: "transform",
        }}
      >
        <title>Traced SVG Paths</title>
        {!isMobile && (
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {svgData.paths.map((path, index) => {
          const pathOpacity = Number.parseFloat(path.opacity || "1")

          return (
            <g key={path.id} transform={path.transform}>
              {/* Main animated stroke path */}
              <motion.path
                d={path.d}
                fill="none"
                stroke="#fae9c8"
                strokeWidth={isMobile ? 0.5 : Math.max(Number.parseFloat(path.strokeWidth || "1") * 0.6, 0.3)}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={pathOpacity * (isMobile ? 0.6 : 0.8)}
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: isMobile ? pathOpacity * 0.6 : [0, pathOpacity * 0.9, pathOpacity * 0.7],
                }}
                transition={{
                  pathLength: {
                    duration: animationConfig.pathDuration + Math.random(),
                    delay: index * animationConfig.delay,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: animationConfig.opacityDuration,
                    delay: index * animationConfig.delay,
                    repeat: isMobile ? 0 : Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              />

              {/* Glowing effect path - only on desktop */}
              {!isMobile && animationConfig.layers > 2 && (
                <motion.path
                  d={path.d}
                  fill="none"
                  stroke="#fae9c8"
                  strokeWidth={Math.max(Number.parseFloat(path.strokeWidth || "1") * 0.2, 0.1)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.4, 0.2],
                  }}
                  transition={{
                    pathLength: {
                      duration: animationConfig.pathDuration + 1,
                      delay: index * animationConfig.delay + 0.2,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: animationConfig.opacityDuration + 1,
                      delay: index * animationConfig.delay + 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function BackgroundPaths({
  title = "BOTS OF BITCOIN",
}: {
  title?: string
}) {
  const { svgData, loading } = useSVGParser("/hero-image.svg")
  const words = title.split(" ")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToProject = useCallback(() => {
    document.getElementById("project")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <div className="opacity-50">{!loading && svgData && <TracedSVGPaths svgData={svgData} />}</div>

        {/* Simplified gradients for mobile */}
        {!isMobile && (
          <>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
          </>
        )}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isMobile ? 1 : 2, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 tracking-tighter border-[#ffaf19]">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-2 md:mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: isMobile ? 50 : 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.02 + (isMobile ? 0.5 : 1),
                      type: "spring",
                      stiffness: isMobile ? 100 : 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-[#ffaf19]  bg-clip-text"
                    style={{
                      filter: isMobile ? "none" : "drop-shadow(0 0 10px rgba(255, 175, 25, 0.5))",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="text-xl text-white border border-[#ffaf19] mb-8 max-w-2xl mx-auto font-semibold bg-black/70 rounded-2xl p-[12px]"
          >
            Bots of Bitcoin mashes up NFTs and Bitcoin DeFi in style — tap into BTC-Fi with cutting-edge Yield Vaults, Index Fund Vaults, and smooth Swaps. Collect from 10,000 one-of-a-kind dynamic NFTs that can transform their looks!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 2 : 3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={scrollToProject}
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-[#fae9c8] rounded-full group hover:border-white/50"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-[#ffaf19] group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-[#ffaf19] transition-all duration-300 transform group-hover:translate-x-full ease">
                Explore App
              </span>
              <span className="relative invisible">Explore App</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
