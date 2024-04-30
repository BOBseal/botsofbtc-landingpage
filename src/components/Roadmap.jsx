{/* eslint-disable react/no-unescaped-entities */}
import React from 'react'
import "../styles/roadmap.css"

const Roadmap = () => {
  return (
    <div className='roadContainer flex p-[2.5rem] flex-col justify-center gap-[1rem] md:gap-[2rem] text-black'>
      <div className='flex gap-[0.5rem]'>
        <h2 className='text-[24px] pb-[1rem] md:text-[60px] font-[700] md:ml-[3rem] font-nunito'>ROADMAP</h2>
      </div>
      <div className='flex flex-col gap-[1rem] md:gap-[2rem] md:ml-[4rem]'>
          <p>We do not have a fixed timeline for roadmap products as we believe a fixed List of Shipments , over fixed Points of Time do not adequtely reflects the needs for an Ever-Evolving and Dynamic Crypto Market. Thus we have only pointed out the Initial Products Planned in Chronological Order and is Open to Community-Voted changes accomodating to the requirements of IRL Market Conditions.</p>
          <div className='flex flex-col gap-[1rem]'>
          <li>Genesis Mint of BOB Collection.</li>
          <li>Launch Of Oil-Pots.</li>
          <li>Launch of Casino.</li>
          <li>Token Presales & Activities.</li>
          <li>$BOTS TGE & Airdrop.</li>
          <li>Expansion as needed ...</li>
          </div>
      </div>
    </div>
  )
}
export default Roadmap