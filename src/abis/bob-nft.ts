export const bobNftAbi = [
  // Payable mint in ETH
  {
    type: "function",
    name: "mint",
    stateMutability: "payable",
    inputs: [{ name: "quantity", type: "uint256" }],
    outputs: [],
  },
  // Token-based mint. Adjust signature to your contract if different.
  {
    type: "function",
    name: "mintWithToken",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "quantity", type: "uint256" },
    ],
    outputs: [],
  },
  // Referrals withdraw. Rename if your method differs (e.g., claimReferralRewards).
  {
    type: "function",
    name: "withdrawReferral",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
] as const
