import MintObj from "./ABIS/MintingABI.json"
import RP from "./ABIS/RPABI.json"
import RAMP from "./ABIS/RAMPAGEv1.json"
import sk from "./ABIS/SKIBBIDIESOFBITCOIN.json"
import cc from "./ABIS/Sp_IcyExecutioner.json"
import JJ from "./ABIS/ERC20.json"
import Lotto from "./ABIS/Lottery.json"
import wrappRp from "./ABIS/WrappedRP.json"
import stake from './ABIS/StakingRP.json'
import BOBNFTJSON from "./ABIS/BOTSOFBITCOIN.json";
import BOBMINTERJSON from "./ABIS/NFTMinter.json";

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

export const BOBNFT =[
    {
        address:"0x2E8aF9C5922623058aa92A183b391E62cb6b2d12",
        abi:BOBNFTJSON.abi
    }
]

export const BOBMinter = [
    {
        address:"0x024789f444BED5b8D9D3e8B13845a83CA5aa120D",
        abi:BOBMINTERJSON.abi
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

export const Lottery = {
    "0x236f8c0a61dA474dB21B693fB2ea7AAB0c803894":{address:"0x4A0E0dfc66c8995708c3499559374a0A2e260a1e" , abi:Lotto.abi},
    "0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3":{address:"0x5393B1d1bA6058Ceb42E012036161E30ACD0825c" , abi:Lotto.abi},
    "0xe75D0fB2C24A55cA1e3F96781a2bCC7bdba058F0":{address:"0xF617A31A61E3d02CcEF4eC11202d377eDB2b84D7" , abi:Lotto.abi},
    "0x4200000000000000000000000000000000000006":{address:"0x228D6B4c1DA545422B05b2d8cC21a608E4619c93" , abi:Lotto.abi},
    "0xc5d16A63ac69591BDC10912ee49aB5FAa3FEC5Ea":{address:"0x6e921afBEdf8CAcC77e3Ae4Ab144B972550B6BD8" , abi:Lotto.abi},
}

export const wrappedRp =[
    {address:"0xc5d16A63ac69591BDC10912ee49aB5FAa3FEC5Ea",abi:wrappRp.abi}
]

export const SkibStake = [
    {address:"0xEa3314DB2A586853bC7c1097f667EbE15CBF658a",abi:stake.abi}
]

export const Skib = [
    {address:"0x3efc90a28685d320f6916b76d8c679da67cc23dc",abi:sk.abi}
]