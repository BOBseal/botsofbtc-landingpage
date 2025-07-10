"use client"

import { motion } from "framer-motion"
//import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

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

        // Function to recursively extract all drawable elements
        const extractElements = (
          element: Element,
          parentTransform = "",
          parentFill = "",
          parentStroke = "",
          parentOpacity = "1",
        )   => {
          const children = Array.from(element.children)

          children.forEach((child, index) => {
            const transform = child.getAttribute("transform") || ""
            const combinedTransform = `${parentTransform} ${transform}`.trim()
            const fill = child.getAttribute("fill") || parentFill || "none"
            const stroke = child.getAttribute("stroke") || parentStroke || "none"
            const opacity = child.getAttribute("opacity") || parentOpacity
            const fillRule = child.getAttribute("fill-rule") || "nonzero"
            const clipPath = child.getAttribute("clip-path") || ""

            let pathData = ""
            const tagName = child.tagName.toLowerCase()

            // Convert all SVG shapes to path data
            switch (tagName) {
              case "path":
                pathData = child.getAttribute("d") || ""
                break

              case "line":
                const x1 = child.getAttribute("x1") || "0"
                const y1 = child.getAttribute("y1") || "0"
                const x2 = child.getAttribute("x2") || "0"
                const y2 = child.getAttribute("y2") || "0"
                pathData = `M${x1},${y1}L${x2},${y2}`
                break

              case "circle":
                const cx = Number.parseFloat(child.getAttribute("cx") || "0")
                const cy = Number.parseFloat(child.getAttribute("cy") || "0")
                const r = Number.parseFloat(child.getAttribute("r") || "0")
                if (r > 0) {
                  pathData = `M${cx - r},${cy}A${r},${r} 0 1,0 ${cx + r},${cy}A${r},${r} 0 1,0 ${cx - r},${cy}Z`
                }
                break

              case "ellipse":
                const ecx = Number.parseFloat(child.getAttribute("cx") || "0")
                const ecy = Number.parseFloat(child.getAttribute("cy") || "0")
                const rx = Number.parseFloat(child.getAttribute("rx") || "0")
                const ry = Number.parseFloat(child.getAttribute("ry") || "0")
                if (rx > 0 && ry > 0) {
                  pathData = `M${ecx - rx},${ecy}A${rx},${ry} 0 1,0 ${ecx + rx},${ecy}A${rx},${ry} 0 1,0 ${ecx - rx},${ecy}Z`
                }
                break

              case "rect":
                const x = Number.parseFloat(child.getAttribute("x") || "0")
                const y = Number.parseFloat(child.getAttribute("y") || "0")
                const w = Number.parseFloat(child.getAttribute("width") || "0")
                const h = Number.parseFloat(child.getAttribute("height") || "0")
                const rectRx = Number.parseFloat(child.getAttribute("rx") || "0")
                const rectRy = Number.parseFloat(child.getAttribute("ry") || "0")

                if (w > 0 && h > 0) {
                  if (rectRx > 0 || rectRy > 0) {
                    const effectiveRx = Math.min(rectRx || rectRy, w / 2)
                    const effectiveRy = Math.min(rectRy || rectRx, h / 2)
                    pathData = `M${x + effectiveRx},${y}L${x + w - effectiveRx},${y}A${effectiveRx},${effectiveRy} 0 0,1 ${x + w},${y + effectiveRy}L${x + w},${y + h - effectiveRy}A${effectiveRx},${effectiveRy} 0 0,1 ${x + w - effectiveRx},${y + h}L${x + effectiveRx},${y + h}A${effectiveRx},${effectiveRy} 0 0,1 ${x},${y + h - effectiveRy}L${x},${y + effectiveRy}A${effectiveRx},${effectiveRy} 0 0,1 ${x + effectiveRx},${y}Z`
                  } else {
                    pathData = `M${x},${y}L${x + w},${y}L${x + w},${y + h}L${x},${y + h}Z`
                  }
                }
                break

              case "polygon":
                const points = child.getAttribute("points") || ""
                const coords = points
                  .trim()
                  .split(/[\s,]+/)
                  .filter(Boolean)
                if (coords.length >= 4 && coords.length % 2 === 0) {
                  pathData = `M${coords[0]},${coords[1]}`
                  for (let i = 2; i < coords.length; i += 2) {
                    pathData += `L${coords[i]},${coords[i + 1]}`
                  }
                  pathData += "Z"
                }
                break

              case "polyline":
                const polyPoints = child.getAttribute("points") || ""
                const polyCoords = polyPoints
                  .trim()
                  .split(/[\s,]+/)
                  .filter(Boolean)
                if (polyCoords.length >= 4 && polyCoords.length % 2 === 0) {
                  pathData = `M${polyCoords[0]},${polyCoords[1]}`
                  for (let i = 2; i < polyCoords.length; i += 2) {
                    pathData += `L${polyCoords[i]},${polyCoords[i + 1]}`
                  }
                }
                break

              case "g":
              case "svg":
              case "defs":
              case "clipPath":
              case "mask":
              case "symbol":
              case "marker":
                // Recursively process container elements
                extractElements(child, combinedTransform, fill, stroke, opacity)
                return

              case "use":
                // Handle <use> elements by finding the referenced element
                const href = child.getAttribute("href") || child.getAttribute("xlink:href")
                if (href && href.startsWith("#")) {
                  const referencedElement = svgDoc.querySelector(href)
                  if (referencedElement) {
                    const useX = Number.parseFloat(child.getAttribute("x") || "0")
                    const useY = Number.parseFloat(child.getAttribute("y") || "0")
                    const useTransform = useX !== 0 || useY !== 0 ? `translate(${useX},${useY})` : ""
                    const finalTransform = `${combinedTransform} ${useTransform}`.trim()
                    extractElements(referencedElement, finalTransform, fill, stroke, opacity)
                  }
                }
                return

              default:
                // Skip unknown elements
                return
            }

            // Add path if we have valid path data
            if (pathData && pathData.trim()) {
              paths.push({
                d: pathData,
                fill: fill,
                stroke: stroke,
                strokeWidth: child.getAttribute("stroke-width") || "1",
                transform: combinedTransform,
                opacity: opacity,
                fillRule: fillRule,
                clipPath: clipPath,
                id: `${tagName}-${paths.length}`,
              })
            }

            // Process nested elements
            if (child.children.length > 0) {
              extractElements(child, combinedTransform, fill, stroke, opacity)
            }
          })
        }

        // Start extraction from the root SVG element
        extractElements(svgElement)

        // Remove duplicate paths and empty paths
        const uniquePaths = paths.filter((path, index, self) => {
          return path.d.trim() && self.findIndex((p) => p.d === path.d && p.transform === path.transform) === index
        })

        setSvgData({ viewBox, width, height, paths: uniquePaths })
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
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox={svgData.viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "drop-shadow(0 0 20px rgba(255, 175, 25, 0.4))" }}
      >
        <title>Traced SVG Paths</title>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {svgData.paths.map((path, index) => {
          const hasStroke = path.stroke && path.stroke !== "none"
          const hasFill = path.fill && path.fill !== "none"
          const pathOpacity = Number.parseFloat(path.opacity || "1")

          return (
            <g key={path.id} transform={path.transform}>
              {/* Background fill with subtle opacity */}
              {hasFill && (
                <motion.path
                  d={path.d}
                  fill={path.fill === "#000000" || path.fill === "black" ? "#fae9c8" : "#fae9c8"}
                  fillRule={path.fillRule as any}
                  opacity={pathOpacity * 0.08}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: pathOpacity * 0.08, scale: 1 }}
                  transition={{
                    delay: index * 0.02,
                    duration: 2,
                    ease: "easeOut",
                  }}
                />
              )}

              {/* Main animated stroke path */}
              <motion.path
                d={path.d}
                fill="none"
                stroke="#fae9c8"
                strokeWidth={Math.max(Number.parseFloat(path.strokeWidth || "1") * 0.6, 0.3)}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={pathOpacity}
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: [0, pathOpacity * 0.9, pathOpacity * 0.7],
                }}
                transition={{
                  pathLength: {
                    duration: 3 + Math.random() * 2,
                    delay: index * 0.03,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 4 + Math.random() * 2,
                    delay: index * 0.03,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              />

              {/* Glowing effect path */}
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
                  opacity: [0, 0.6, 0.3],
                }}
                transition={{
                  pathLength: {
                    duration: 3.5 + Math.random() * 2,
                    delay: index * 0.03 + 0.2,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 5 + Math.random() * 2,
                    delay: index * 0.03 + 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              />

              {/* Inner highlight path */}
              <motion.path
                d={path.d}
                fill="none"
                stroke="#fff"
                strokeWidth={Math.max(Number.parseFloat(path.strokeWidth || "1") * 0.05, 0.05)}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.3}
                filter="url(#innerGlow)"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.3, 0.1],
                }}
                transition={{
                  pathLength: {
                    duration: 4 + Math.random() * 2,
                    delay: index * 0.03 + 0.4,
                    ease: "easeInOut",
                  },
                  opacity: {
                    duration: 6 + Math.random() * 2,
                    delay: index * 0.03 + 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  },
                }}
              />
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

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        {!loading && svgData && <TracedSVGPaths svgData={svgData} />}

        {/* Subtle radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />

        {/* Ambient lighting effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03 + 1,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-[#ffaf19] to-[#ff8c00]"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(255, 175, 25, 0.5))",
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
            className="text-xl text-white border border-[#ffaf19] mb-8 max-w-2xl mx-auto font-semibold bg-black/40 rounded-2xl p-[12px]"
          >
            Bots of Bitcoin mashes up NFTs and Bitcoin DeFi in style — tap into BTC-Fi with cutting-edge Yield Vaults, Index Fund Vaults, and smooth Swaps. Collect from 10,000 one-of-a-kind dynamic NFTs that can transform their looks!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            className="inline-block group relative bg-gradient-to-b from-[#ffaf19]/20 to-[#ff8c00]/20 
                        p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl 
                        transition-shadow duration-300 border border-[#ffaf19]/30 hover:border-[#ffaf19]/40
                        hover:shadow-lg hover:shadow-[#ffaf19]/20"
          >
            <button
              //variant="ghost"
              className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                            bg-black/80 hover:bg-black/90 text-[#ffaf19] transition-all duration-300 
                            group-hover:-translate-y-0.5 border border-[#ffaf19]/20 hover:border-[#ffaf19]/40
                            hover:shadow-lg hover:shadow-[#ffaf19]/20"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity">Explore App</span>
              <span
                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
              >
                →
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
