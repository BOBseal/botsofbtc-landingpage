"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, PieChart, TrendingUp, DollarSign, Users, Activity, Target, Zap, Shield, Clock } from "lucide-react"
import { motion } from "framer-motion"

// Mock analytics data
const analyticsData = {
  performance: {
    apy: 12.5,
    sharpeRatio: 1.8,
    maxDrawdown: -8.2,
    volatility: 15.3,
    beta: 0.85,
  },
  composition: {
    btc: 60,
    eth: 40,
  },
  metrics: {
    totalDepositors: 1247,
    avgDepositSize: 2400,
    totalTransactions: 8934,
    avgHoldingPeriod: 45,
  },
  fees: {
    managementFee: 0.25,
    performanceFee: 0,
    slippageFee: 0.1,
    totalFeesCollected: 1250,
  },
  risk: {
    riskScore: 6.5,
    liquidityRisk: "Medium",
    smartContractRisk: "Low",
    marketRisk: "High",
  },
}

export default function BethAnalytics() {
  const [activeTab, setActiveTab] = useState("performance")

  const tabs = [
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "composition", label: "Composition", icon: PieChart },
    { id: "metrics", label: "Metrics", icon: BarChart3 },
    { id: "risk", label: "Risk", icon: Shield },
  ]

  return (
    <Card className="bg-black/50 border-[#fae9c8]/20">
      <CardHeader>
        <CardTitle className="text-[#fae9c8]">Analytics Dashboard</CardTitle>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={
                activeTab === tab.id
                  ? "bg-[#fae9c8] text-black"
                  : "border-[#fae9c8]/30 text-[#fae9c8] hover:bg-[#fae9c8]/10"
              }
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "performance" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Annual Percentage Yield</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-400">{analyticsData.performance.apy}%</div>
                  <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Sharpe Ratio</span>
                    <Target className="w-4 h-4 text-[#fae9c8]" />
                  </div>
                  <div className="text-2xl font-bold text-white">{analyticsData.performance.sharpeRatio}</div>
                  <div className="text-xs text-gray-500 mt-1">Risk-adjusted returns</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Max Drawdown</span>
                    <Activity className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-red-400">{analyticsData.performance.maxDrawdown}%</div>
                  <div className="text-xs text-gray-500 mt-1">Worst decline</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Volatility</span>
                    <Zap className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{analyticsData.performance.volatility}%</div>
                  <div className="text-xs text-gray-500 mt-1">Price fluctuation</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "composition" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
                <div className="relative w-48 h-48 mx-auto">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="20"
                      strokeDasharray={`${(analyticsData.composition.btc / 100) * 502.65} 502.65`}
                      strokeDashoffset="125.66"
                      className="rotate-[-90deg] origin-center"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray={`${(analyticsData.composition.eth / 100) * 502.65} 502.65`}
                      strokeDashoffset={`${125.66 - (analyticsData.composition.btc / 100) * 502.65}`}
                      className="rotate-[-90deg] origin-center"
                    />
                    <text x="100" y="105" textAnchor="middle" className="fill-white text-lg font-bold">
                      BETH
                    </text>
                  </svg>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-2xl font-bold text-white">{analyticsData.composition.btc}%</div>
                  <div className="text-sm text-gray-400">Bitcoin (BTC)</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-2xl font-bold text-white">{analyticsData.composition.eth}%</div>
                  <div className="text-sm text-gray-400">Ethereum (ETH)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Depositors</span>
                  <Users className="w-4 h-4 text-[#fae9c8]" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.metrics.totalDepositors.toLocaleString()}
                </div>
                <div className="text-xs text-green-400 mt-1">+12% this month</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Avg Deposit Size</span>
                  <DollarSign className="w-4 h-4 text-[#fae9c8]" />
                </div>
                <div className="text-2xl font-bold text-white">
                  ${analyticsData.metrics.avgDepositSize.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">Per depositor</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Total Transactions</span>
                  <Activity className="w-4 h-4 text-[#fae9c8]" />
                </div>
                <div className="text-2xl font-bold text-white">
                  {analyticsData.metrics.totalTransactions.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">All time</div>
              </div>
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Avg Holding Period</span>
                  <Clock className="w-4 h-4 text-[#fae9c8]" />
                </div>
                <div className="text-2xl font-bold text-white">{analyticsData.metrics.avgHoldingPeriod} days</div>
                <div className="text-xs text-gray-400 mt-1">User retention</div>
              </div>
            </div>
          )}

          {activeTab === "risk" && (
            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Overall Risk Score</span>
                  <Badge
                    variant="outline"
                    className={`${
                      analyticsData.risk.riskScore <= 3
                        ? "border-green-500 text-green-400"
                        : analyticsData.risk.riskScore <= 7
                          ? "border-yellow-500 text-yellow-400"
                          : "border-red-500 text-red-400"
                    }`}
                  >
                    {analyticsData.risk.riskScore}/10
                  </Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      analyticsData.risk.riskScore <= 3
                        ? "bg-green-500"
                        : analyticsData.risk.riskScore <= 7
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${(analyticsData.risk.riskScore / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-2">Liquidity Risk</div>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                    {analyticsData.risk.liquidityRisk}
                  </Badge>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-2">Smart Contract Risk</div>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {analyticsData.risk.smartContractRisk}
                  </Badge>
                </div>
                <div className="bg-black/30 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-400 mb-2">Market Risk</div>
                  <Badge variant="outline" className="border-red-500 text-red-400">
                    {analyticsData.risk.marketRisk}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}
