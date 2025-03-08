"use client";
import React, { useState, useEffect, useContext, useRef} from "react";
import Navbar from "@/components/NAVBAR";
import Footer from "@/components/Footer";
import Swap from "@/components/Swap";
//const web3 = new Web3(`https://rpc.gobob.xyz`);
import Image from "next/image";
import { partnerInfo } from "@/configs/config";

const Page = () => {
    
    return (
    <>
      <Navbar />
      <div className="flex w-full h-full min-h-[49rem] md:min-h-[53rem] gap-[1rem] md:gap-[3rem] justify-center pt-[3rem] border-b-[3px] border-[#E5BD19] pb-[2rem] items-center bg-[#231F20] bg-cover flex-col p-[1rem] md:p-[4rem] md:pt-[3rem]">
        <Swap/>
        <div className="text-[15px] w-[95%] md:w-auto font-fredoka flex items-center bg-black text-white p-[5px] rounded-2xl ">
          Powered By{" "}
          <Image src={partnerInfo[1].logo} height={100} width={200} alt="powered" />{" "}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;