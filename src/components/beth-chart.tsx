"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"

export type OhlcPoint = {
  time: number | string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

interface BethChartProps {
  timeframe: string
  ohlc?: OhlcPoint[]
  showVolume?: boolean
  defaultSeries?: "open" | "high" | "low" | "close"
}

// Fallback mock OHLC generator to keep the page functional without live data
function generateMockOHLC(timeframe: string): OhlcPoint[] {
  const points = timeframe === "1d" ? 24 : timeframe === "7d" ? 168 : timeframe === "30d" ? 720 : 2160
  const base = 0.315106
  const out: OhlcPoint[] = []
  let lastClose = base

  for (let i = 0; i < points; i++) {
    const drift = (Math.sin(i / 20) + Math.cos(i / 35)) * 0.001
    const noise = (Math.random() - 0.5) * 0.01
    const open = lastClose
    const close = Math.max(0.05, open * (1 + drift + noise))
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const volume = 500 + Math.random() * 1500

    out.push({ time: i, open, high, low, close, volume })
    lastClose = close
  }
  return out
}

export default function BethChart({
  timeframe = "1d",
  ohlc,
  showVolume = true,
  defaultSeries = "close",
}: BethChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [series, setSeries] = useState<"open" | "high" | "low" | "close">(defaultSeries)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const data: OhlcPoint[] = useMemo(() => {
    if (ohlc && ohlc.length > 1) return ohlc
    return generateMockOHLC(timeframe)
  }, [ohlc, timeframe])

  // Price extents use low/high across candles to keep y-scale stable across series
  const priceExtents = useMemo(() => {
    if (data.length === 0) return { min: 0, max: 1 }
    let min = Number.POSITIVE_INFINITY
    let max = Number.NEGATIVE_INFINITY
    for (const d of data) {
      if (d.low < min) min = d.low
      if (d.high > max) max = d.high
    }
    if (min === max) {
      min = min * 0.95
      max = max * 1.05
    }
    return { min, max }
  }, [data])

  const volumeExtents = useMemo(() => {
    if (!showVolume) return { max: 0 }
    let max = 0
    for (const d of data) {
      if ((d.volume ?? 0) > max) max = d.volume ?? 0
    }
    return { max }
  }, [data, showVolume])

  // SMA(20) of selected series
  const sma20 = useMemo(() => {
    const period = 20
    if (data.length < period) return [] as { x: number; y: number }[]
    const out: { x: number; y: number }[] = []
    for (let i = period - 1; i < data.length; i++) {
      let sum = 0
      for (let j = i - period + 1; j <= i; j++) sum += data[j][series]
      out.push({ x: i, y: sum / period })
    }
    return out
  }, [data, series])

  const svgWidth = isMobile ? 320 : 800
  const priceHeight = isMobile ? 220 : 320
  const volumeHeight = showVolume ? (isMobile ? 60 : 90) : 0
  const svgHeight = priceHeight + (showVolume ? volumeHeight + 40 : 0)
  const padding = { top: 20, right: 20, bottom: 30, left: 60 }
  const chartWidth = svgWidth - padding.left - padding.right
  const chartHeight = priceHeight - padding.top - 10
  const volumeTop = priceHeight + 10

  const priceToY = (price: number) => {
    const { min, max } = priceExtents
    const ratio = (max - price) / (max - min)
    return padding.top + ratio * chartHeight
  }
  const indexToX = (i: number) => padding.left + (i / Math.max(1, data.length - 1)) * chartWidth

  // Build main line path for selected series
  const linePath = useMemo(() => {
    if (data.length === 0) return ""
    return data
      .map((d, i) => {
        const x = indexToX(i)
        const y = priceToY(d[series])
        return `${i === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }, [data, series])

  // Build SMA path
  const smaPath = useMemo(() => {
    if (sma20.length === 0) return ""
    return sma20
      .map((p, idx) => {
        const x = indexToX(p.x)
        const y = priceToY(p.y)
        return `${idx === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")
  }, [sma20])

  // Change calculation on selected series
  const last = data[data.length - 1]
  const first = data[0]
  const priceChange = last[series] - first[series]
  const priceChangePercent = (priceChange / first[series]) * 100
  const positive = priceChangePercent >= 0

  // Hover
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const clampedX = Math.max(padding.left, Math.min(padding.left + chartWidth, x))
    const ratio = (clampedX - padding.left) / chartWidth
    const idx = Math.round(ratio * (data.length - 1))
    setHoverIndex(idx)
  }
  const clearHover = () => setHoverIndex(null)

  const hovered = hoverIndex !== null ? data[hoverIndex] : null
  const hoverX = hoverIndex !== null ? indexToX(hoverIndex) : null
  const hoverY = hoverIndex !== null ? priceToY(data[hoverIndex][series]) : null

  const gridLines = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="space-y-4">
      {/* Header numbers and series toggle */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl font-bold text-white">
              ${hovered ? hovered[series].toFixed(6) : last[series].toFixed(6)}
            </span>
            <div className={`flex items-center gap-1 ${positive ? "text-green-400" : "text-red-400"}`}>
              {positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-medium">
                {positive ? "+" : ""}
                {priceChangePercent.toFixed(2)}%
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            {positive ? "+" : ""}${priceChange.toFixed(6)} ({timeframe}) • {series.toUpperCase()}
          </p>
        </div>

        {/* Series selector */}
        <div className="flex gap-2">
          {(["open", "high", "low", "close"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setSeries(key)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                series === key
                  ? "bg-[#fae9c8] text-black"
                  : "border border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
              }`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative bg-black/30 rounded-lg p-2 overflow-hidden">
        <svg
          width={svgWidth}
          height={svgHeight}
          className="w-full h-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={clearHover}
        >
          {/* Price panel */}
          {gridLines.map((r) => (
            <line
              key={`g-${r}`}
              x1={padding.left}
              y1={padding.top + r * chartHeight}
              x2={padding.left + chartWidth}
              y2={padding.top + r * chartHeight}
              stroke="#374151"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Y labels */}
          {[priceExtents.max, (priceExtents.max + priceExtents.min) / 2, priceExtents.min].map((p, i) => (
            <text
              key={`y-${i}`}
              x={padding.left - 10}
              y={padding.top + (i * chartHeight) / 2 + 5}
              textAnchor="end"
              className="fill-gray-400 text-xs"
            >
              ${p.toFixed(6)}
            </text>
          ))}

          {/* Main line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#fae9c8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* SMA(20) overlay */}
          {smaPath && (
            <path
              d={smaPath}
              fill="none"
              stroke={positive ? "#10b981" : "#ef4444"}
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.9"
            />
          )}

          {/* Crosshair and hover dot */}
          {hoverX !== null && hoverY !== null && (
            <>
              <line
                x1={hoverX}
                y1={padding.top}
                x2={hoverX}
                y2={padding.top + chartHeight}
                stroke="#9ca3af"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <circle cx={hoverX} cy={hoverY} r="4" fill="#fae9c8" />
            </>
          )}

          {/* Volume panel */}
          {showVolume && (
            <>
              <text x={padding.left} y={volumeTop + 14} className="fill-gray-400 text-xs">
                Volume
              </text>

              {data.map((d, i) => {
                const x = indexToX(i)
                const volMax = Math.max(1, volumeExtents.max)
                const h = ((d.volume ?? 0) / volMax) * (volumeHeight - 20)
                const y = volumeTop + volumeHeight - h
                const up = d.close >= d.open
                const color = up ? "#10b981" : "#ef4444"
                const barWidth = Math.max(1, (chartWidth / Math.max(1, data.length - 1)) * (isMobile ? 0.3 : 0.25))

                return (
                  <rect
                    key={`v-${i}`}
                    x={x - barWidth / 2}
                    y={y}
                    width={barWidth}
                    height={Math.max(1, h)}
                    fill={color}
                    opacity="0.5"
                  />
                )
              })}

              {/* X-axis labels */}
              {!isMobile &&
                [0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => (
                  <text
                    key={`x-${idx}`}
                    x={padding.left + ratio * chartWidth}
                    y={svgHeight - 10}
                    textAnchor="middle"
                    className="fill-gray-400 text-xs"
                  >
                    {typeof data[Math.round(ratio * (data.length - 1))].time === "number"
                      ? `${Math.round(ratio * (timeframe === "1d" ? 24 : timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90))}${timeframe === "1d" ? "h" : "d"}`
                      : String(data[Math.round(ratio * (data.length - 1))].time)}
                  </text>
                ))}
            </>
          )}
        </svg>

        {/* Hover tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute bg-black/90 border border-[#fae9c8]/20 rounded-lg p-2 pointer-events-none z-10 text-xs"
            style={{
              left: `${(((hoverIndex / (data.length - 1)) * chartWidth + padding.left) / svgWidth) * 100}%`,
              top: "10px",
              transform: "translateX(-50%)",
            }}
          >
            <div className="grid grid-cols-5 gap-3">
              <div className="text-gray-400">
                O: <span className="text-white">{data[hoverIndex].open.toFixed(6)}</span>
              </div>
              <div className="text-gray-400">
                H: <span className="text-white">{data[hoverIndex].high.toFixed(6)}</span>
              </div>
              <div className="text-gray-400">
                L: <span className="text-white">{data[hoverIndex].low.toFixed(6)}</span>
              </div>
              <div className="text-gray-400">
                C: <span className="text-white">{data[hoverIndex].close.toFixed(6)}</span>
              </div>
              <div className="text-gray-400">
                V: <span className="text-white">{(data[hoverIndex].volume ?? 0).toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
