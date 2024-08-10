import MintObj from "./ABIS/MintingABI.json"
import RP from "./ABIS/RPABI.json"
import RAMP from "./ABIS/RAMPAGEv1.json"
import sk from "./ABIS/SKIBBIDIESOFBITCOIN.json"
import cc from "./ABIS/Sp_IcyExecutioner.json"
import JJ from "./ABIS/ERC20.json"
import Lotto from "./ABIS/Lottery.json"
import wrappRp from "./ABIS/WrappedRP.json"
import stake from './ABIS/StakingRP.json'

export const BOB_MAINNET = [
    {
        chainId:"0xed88",
        chainName:"BOB",
        nativeCurrency:{
         name: "Ether",
         symbol:"ETH",
         decimals: 18,   
        },
        rpcUrls:["https://rpc.gobob.xyz"],
        blockExplorerUrls: ["https://explorer.gobob.xyz"],
    }
]

export const IceCream = [
    {contract:"0x882A8478F978579bD495E231C61493af4edb50A6",abi:cc.abi}
]

export const IERC20ABI = JJ.abi

export const IceRouterAddress = "0x698a912F8CA34Df9b46E6Ea4A2B2DB0B7151b083" 

export const MintAbi = MintObj.abi;
export const RpCoreAbi = RP.abi;

export const minter =[
    {
        address:'0xDFf9631fa2446A143dDAa32f7eF4301Ba0588497',
        abi:MintAbi,
    },
    {
        address:'0xaeF1425a798A3205520706ABbfC5FF8Ed6142Bc5',
        abi:MintAbi
    }
]

export const pointCore = [
    {
        address:'0xCA9c5943Dd7d0fE1E6A0Cf12F2eA65d310A3b2AA',
        abi:RpCoreAbi,
    }
]

export const RampageV1 = [
    {address:"0xC4f681699CCDfFB26be46f1E109896cBb13cF18F" , abi:RAMP.abi}
]

export const Lottery = [
    {lotteryValue:3 , address:"0x781045DFE60068B3DE75e9Ba7AB535d2D991E343" , abi:Lotto.abi}
]

export const wrappedRp =[
    {address:"0xc5d16A63ac69591BDC10912ee49aB5FAa3FEC5Ea",abi:wrappRp.abi}
]

export const SkibStake = [
    {address:"0xEa3314DB2A586853bC7c1097f667EbE15CBF658a",abi:stake.abi}
]

export const Skib = [
    {address:"0x3efc90a28685d320f6916b76d8c679da67cc23dc",abi:sk.abi}
]