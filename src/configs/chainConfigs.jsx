import { defineChain } from 'viem'
 
export const BOBMainnet = defineChain({
  id: 60808,
  name: 'BOB',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.gobob.xyz'],
      webSocket: ['wss://rpc.gobob.xyz'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.gobob.xyz' },
  },
})