import type { Address } from "viem"

export const NETWORK = {
  chainId: 1, // 1 mainnet, 11155111 sepolia
}

export const CONTRACTS = {
  // Replace these with your real deployed addresses
  BOB_NFT: "0x0000000000000000000000000000000000000000" as Address,
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" as Address, // WBTC Mainnet
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as Address, // USDT Mainnet
}

// Token decimals (adjust if you’re not on mainnet)
export const TOKEN_DECIMALS: Record<string, number> = {
  ETH: 18,
  WBTC: 8,
  USDT: 6,
}
