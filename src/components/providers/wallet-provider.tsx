"use client"

import type React from "react"
import { WagmiProvider } from "wagmi"
import { mainnet, sepolia , bob } from "wagmi/chains"
import { http, createConfig } from "wagmi"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useAccount, useDisconnect } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { createWalletClient, custom , createPublicClient } from "viem"
// Important: Do NOT import "@rainbow-me/rainbowkit/styles.css" in this preview runtime.
// It can trigger a MIME-type load error for CSS as JS. The ConnectButton will remain unstyled here.

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

const config = createConfig({
  chains: [bob],
  transports: {
    [bob.id]: http()
  },
  // RainbowKit's default connectors are auto-added when used with RainbowKitProvider.
  ssr: true,
  // If needed, you can pass connectors from @rainbow-me/rainbowkit/getDefaultConfig instead.
})

const queryClient = new QueryClient()

export default function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: "#fae9c8" })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()

  const connect = async () => {
    if (openConnectModal) openConnectModal()
  }

  return {
    isConnected: !!isConnected,
    address: address ?? null,
    connect,
    disconnect: () => disconnect(),
  }
}


export const walletClient = createWalletClient({
  chain:bob,
  transport:custom(window.ethereum)
})

export const publicClient = createPublicClient({
  chain:bob,
  transport:custom(window.ethereum)
})