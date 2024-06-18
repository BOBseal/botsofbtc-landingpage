import MintObj from "./ABIS/MintingABI.json"
import RP from "./ABIS/RPABI.json"
import RAMP from "./ABIS/RAMPAGEv1.json"
import sk from "./ABIS/SKIBBIDIESOFBITCOIN.json"
import cc from "./ABIS/Sp_IcyExecutioner.json"
import JJ from "./ABIS/ERC20.json"

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
    {contract:"0x67dd20e8BAc825a7B982F54f325bD221581c040F",abi:cc.abi}
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

export const Skib = [
    {address:"",abi:sk.abi}
]