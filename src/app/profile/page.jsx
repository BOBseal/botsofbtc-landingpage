'use client'
import React,{useContext , useEffect, useState} from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import { AppContext } from '@/context/AppContext'
import UserCard from "@/components/CARDS/UserCard.jsx"
import Image from '../../../node_modules/next/image'
import img from "../../assets/lotterypage.png"
import NetworkError from '@/components/CARDS/NetworkError.jsx'
import WalletError from "@/components/CARDS/WalletError.jsx"
const Page = () => {
  const {connectWallet , user} = useContext(AppContext)

  useEffect(() => {
    if(!user.wallet){
      connectWallet();
    }
  }, [user.wallet])

  return (
    <div>
      <Navbar/>
        <div>
          {user.wallet ? 
          <div>
          {
          user.correctChain ? 
          <UserCard user={user ? user:null}/> : <NetworkError/>  
          }
          </div>
          :
          <WalletError/>
          }
        </div>
      <Footer/>
    </div>
  )
}

export default Page