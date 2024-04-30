'use client'
import React from 'react'
import '../styles/intro.css'
import imgA from '../assets/15.png'
import imgB from '../assets/16.png'
import imgC from '../assets/22.png'
import imgD from '../assets/26.png'
import imgE from '../assets/19.png'
import Image from '../../node_modules/next/image'


export default function Intro() {
  return (
    <><div className="intro-cointainer ">
        <div className="intro-left ">
            <h1 className=' font-nunito text-black'>BOTS OF BITCOIN</h1>
            <p className='text-black'>BOTS OF BITCOIN is a Collection of 10k Unique Revenue Sharing ROBOT PFPs with Utility on BOB. Mint one and Earn 6.9% Royalties on your Minted PFPs Forever and a Bonus Airdrop of Platform Tokens! </p>
        </div>
        <div className="intro-right">
          <div className="imgbox-a">
            <Image className='boobies-img' id='img-l-t' src={imgA} alt="" />
            <Image className='boobies-img' id='img-l-b' src={imgB} alt="" />
          </div>
          <div className="imgbox-b">
            <Image className='boobies-img' id='img-r-t' src={imgC} alt="" />
            <Image className='boobies-img' id='img-r-m' src={imgD} alt="" />
            <Image className='boobies-img' id='img-r-b' src={imgE} alt="" />
          </div>
        </div>
        </div></>
  )
}
