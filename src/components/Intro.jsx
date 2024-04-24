'use client'
import React from 'react'
import '../styles/intro.css'
import imgA from '../assets/1.png'
import imgB from '../assets/2.png'
import imgC from '../assets/3.png'
import imgD from '../assets/4.png'
import imgE from '../assets/5.png'
import Image from '../../node_modules/next/image'


export default function Intro() {
  return (
    <><div className="intro-cointainer">
        <div className="intro-left">
            <h1>BOOBS OF BITCOIN</h1>
            <p>BOOBS OF BITCOIN is a 10k Collection of Captivating BOOB Revenue Sharing NFTs that also enjoys a Range of Utilities and Benifits within the Boobs Of Bitcoin Ecosystem. Enabling Meme-Fi through Bitcoin , EVM and NFTs. Each NFT Has Guaranteed Token Allocation for the Ecosystem Token <span className=''> $BOOBIES </span> . Mint One NOW and Enjoy 6.9% Royalties from sales of your minted PFPs forever.</p>
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
