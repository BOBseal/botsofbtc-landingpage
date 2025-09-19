import type { Address } from "viem"

export const NETWORK = {
  chainId: 60808, // 1 mainnet, 11155111 sepolia
}

export const CONTRACTS = {
  // Replace these with your real deployed addresses
  BOB_NFT: "0x98e3B6b4918248fBba7Cbcd85EEf4d89E3C5fA2E" as Address,
  WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599" as Address, // WBTC Mainnet
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7" as Address, // USDT Mainnet
  BOB:"0x2e8af9c5922623058aa92a183b391e62cb6b2d12" as Address,
  SOB:"0x3efc90a28685d320f6916b76d8c679da67cc23dc" as Address,
  BETH:"0x64034F856Ccc783a2E3A5421A09353BDE47340fE"  as Address
}

// Token decimals (adjust if you’re not on mainnet)
export const TOKEN_DECIMALS: Record<string, number> = {
  ETH: 18,
  WBTC: 8,
  USDT: 6,
}
