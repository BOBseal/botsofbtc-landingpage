import React from "react";
import { ethers } from "ethers";
import { minter,pointCore , RampageV1, Skib , Lottery,SkibStake , wrappedRp, BOBMinter,BOBNFT } from "./constants";
import { IceCream, BOB_MAINNET , IERC20ABI } from "./constants";


export const changeNetwork =async(chainId)=>{
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params:[{chainId}]
        });
        return null;
    } catch (error) {
        console.log(error);
    }
}

export const addNetwork =async(networkConfig)=>{
    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: networkConfig[0]
        });
    } catch (error) {
        console.log(error);
        if(error.code === 4902 || error.code === -32602){
            changeNetwork(networkConfig[0].chainId);
        }
    }
}


export const getIceContract =async(addr)=>{
    try {
        const ca = connectContract(IceCream[0].contract ,IceCream[0].abi, addr);
        return ca;
    } catch (error) {
        console.log(error);
    }
}

export const getSwapData = async(amount,path,_from)=>{
    try {
        const baseLink = 'https://aggregator.icecreamswap.com/60808'
        const from = path[0]
        const to = path[1]
        
        const data  = await fetch(`${baseLink}?src=${from}&dst=${to}&amount=${amount}&from=${_from}`);
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getErc20Decimals=async(token, user)=>{
    try {
        const ca = await connectContract(token, IERC20ABI, user);
        const tx = await ca.decimals();
        return tx;
    } catch (error) {
        console.log(error)
    }
}

export const getErc20CA=async(token, user)=>{
    try {
        const ca = await connectContract(token, IERC20ABI, user);
        return ca;
    } catch (error) {
        console.log(error)
    }
}

export const getErc20Balances=async(address ,user)=>{
    try {
        const ca = await getErc20CA(address , user);
        const d = await ca.decimals();
        const decimals = parseInt(Number(d));
        const balance = await ca.balanceOf(user);
        const parseBalance = ethers.utils.formatUnits(balance,decimals);
        return parseBalance
    } catch (error) {
        console.log(error);
    }
}

export const getMinterContract = async(account)=>{
    try {
        const addr = minter[1].address;
        const abi = minter[1].abi;
        const contract = connectContract(addr,abi,account);
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const formatNumber =(numStr)=> {
    // Parse the string to a number
    let num = parseFloat(numStr);
    
    // Check if the parsed number is valid
    if (isNaN(num)) {
        return 'Invalid number';
    }

    if (num < 1000) {
        return num.toString();
    } else if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K';
    } else if (num >= 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else {
        return (num / 1000000000).toFixed(1) + 'B';
    }
}

export const getNFTCa = async(account)=>{
    try {
        const nftAddr = "0x3efc90a28685d320f6916b76d8c679da67cc23dc"
        const nftAbi = Skib[0].abi;
        const ca = connectContract(nftAddr,nftAbi,account);
        return ca
    } catch (error) {
        console.log(error)
    }
}

export const getRpCoreContract = async(account)=>{
    try {
        const addr = pointCore[0].address;
        const abi = pointCore[0].abi;
        const contract = connectContract(addr,abi,account);
        //console.log(`RP CORE Ca = ${addr}, OBJ = ${contract}`);
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const getBobMinterCa=async(account)=>{
    try {
        const addr = BOBMinter[0].address;
        const abi = BOBMinter[0].abi;
        const contract = connectContract(addr,abi,account);
        return contract
    } catch (error) {
        console.log(error)
    }
}

export const getBobNftCa=async(account)=>{
    try {
        const addr = BOBNFT[0].address;
        const abi = BOBNFT[0].abi;
        const contract = connectContract(addr,abi,account);
        return contract
    } catch (error) {
        console.log(error);
    }
}

export const getLotteryContract = async(account)=>{
    try {
        const address = Lottery[0].address;
        const abi = Lottery[0].abi;
        const ca = connectContract(address,abi,account)
        return ca;
    } catch (error) {
        console.log(error)
    }
}

export const getWrappedRPContract = async(account)=>{
    try {
        const address = wrappedRp[0].address;
        const abi = wrappedRp[0].abi;
        const ca = connectContract(address,abi,account)
        return ca;
    } catch (error) {
        console.log(error)
    }
}

export const getStakingContract = async(account)=>{
    try {
        const address = SkibStake[0].address;
        const abi = SkibStake[0].abi;
        const ca = connectContract(address,abi,account)
        return ca;
    } catch (error) {
        console.log(error)
    }
}

export const getRampageCa = async(account)=>{
    try {
        const ca = connectContract(RampageV1[0].address,RampageV1[0].abi,account);
        return ca
    } catch (error) {
        console.log(error)
    }
}

export const connectContract = async (address, abi, account) => {
    try {

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new Web3 provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);

        // Connect to the contract
        const contract = new ethers.Contract(address, abi, signer);
        return contract;
    } catch (error) {
        console.error("Failed to connect to contract:", error);
        return null;
    }
};

export const connectRPCCa = async(address , abi , account , rpc)=>{
    try {

        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create a new Web3 provider and signer
        const provider = new ethers.providers.JsonRpcProvider(rpc);
        const signer = provider.getSigner(account);

        // Connect to the contract
        const contract = new ethers.Contract(address, abi, signer);
        return contract;
    } catch (error) {
        console.error("Failed to connect to contract:", error);
        return null;
    }
}

export const connectMetamask = async()=>{
    try {
        if(window.ethereum){
            const array = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            let object = {wallet:array[0], accounts: array};
            return object;
        } else return null       
    } catch (error) {
        console.log(error)
    }
}

export const getChainId = async()=>{
    try {
        if(window.ethereum){
            const chainId = await window.ethereum.request({ method: "eth_chainId" });
            return chainId;
        }
        else return false;
    } catch (error) {
        console.log(error)     
    }
}

export const getEthBalance=async(account)=>{
    try {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(account);
            const balanceInEth = ethers.utils.formatEther(balance);
//            console.log(balanceInEth);
            return balanceInEth
        }
    } catch (error) {
        console.log(error)
    }
}

export const getHolderData = async()=>{
    try {
        const res = await fetch(`https://api.botsofbtc.com/holderList`);
        //console.log(res)
        if(res.ok){
        const data = res.json();
        //console.log(data)
        return data;
        } else return null
    } catch (error) {
        console.log(error)
    }
}

export const walletSign = async(message , from)=>{
    try {
        const msg = `0x${Buffer.from(message, "utf8").toString("hex")}`;
        const sign = await window.ethereum.request({
            method: "personal_sign",
            params: [msg, from],
        });
        return sign;
    } catch (error) {
        console.log(error);
        alert("Sign In failed");
    }
}

export function unixToGeneralTime(seconds)

{
    // Save the time in Human
    // readable format
    let ans = "";

    // Number of days in month
    // in normal year
    let daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                          31, 31, 30, 31, 30, 31 ];

    let currYear, daysTillNow, extraTime,
        extraDays, index, date, month, hours,
        minutes, secondss, flag = 0;

    // Calculate total days unix time T
    daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
    extraTime = seconds % (24 * 60 * 60);
    currYear = 1970;

    // Calculating current year
    while (true) {
    if (currYear % 400 == 0
        || (currYear % 4 == 0 && currYear % 100 != 0)) {
        if (daysTillNow < 366) {
            break;
        }
        daysTillNow -= 366;
    }
    else {
        if (daysTillNow < 365) {
            break;
        }
        daysTillNow -= 365;
    }
    currYear += 1;
}

    // Updating extradays because it
    // will give days till previous day
    // and we have include current day
    extraDays = daysTillNow + 1;

    if (currYear % 400 == 0 ||
       (currYear % 4 == 0 &&
        currYear % 100 != 0))
        flag = 1;

    // Calculating MONTH and DATE
    month = 0; index = 0;
    if (flag == 1)
    {
        while (true)
        {
            if (index == 1)
            {
                if (extraDays - 29 < 0)
                    break;

                month += 1;
                extraDays -= 29;
            }
            else
            {
                if (extraDays -
                    daysOfMonth[index] < 0)
                {
                    break;
                }
                month += 1;
                extraDays -= daysOfMonth[index];
            }
            index += 1;
        }
    }
    else
    {
        while (true)
        {
            if (extraDays - daysOfMonth[index] < 0)
            {
                break;
            }
            month += 1;
            extraDays -= daysOfMonth[index];
            index += 1;
        }
    }

    // Current Month
    if (extraDays > 0)
    {
        month += 1;
        date = extraDays;
    }
    else
    {
        if (month == 2 && flag == 1)
            date = 29;
        else
        {
            date = daysOfMonth[month - 1];
        }
    }

    // Calculating HH:MM:YYYY
    hours = parseInt(extraTime / 3600, 10);
    minutes = parseInt((extraTime % 3600) / 60, 10);
    secondss = parseInt((extraTime % 3600) % 60, 10);

    ans += date.toString();
    ans += "/";
    ans += month.toString();
    ans += "/";
    ans += currYear.toString();
    ans += " ";
    ans += hours.toString();
    ans += ":";
    ans += minutes.toString();
    ans += ":";
    ans += secondss.toString();

    // Return the time
    return ans;
}

