{/* eslint-disable react/no-unescaped-entities */}
import React from 'react'

export default function Tokenomic() {
  return (
    <>
     <div className="p-[50px] bg-[#FF8500] border-[3px] border-black flex h-full">
        <div className='flex flex-col rounded-2xl bg-[#E8C430] border-black border-[2px] drop-shadow-2xl p-[20px] md:p-[50px] h-full'>
          <h2 className='font-nunito font-[600] text-[30px] md:text-[60px] pt-[15px] pb-[15px] md:pb-[30px] md:pt-[30px]'>TOKENOMICS</h2>
          <p className='pt-[20px] pb-[20px] text-[20px]'>The BOTS OF BITCOIN Ecosystem Have two Primary Tokens , they are :</p>
          <div className='flex flex-col gap-[5px] md:gap-[6px]'>
          <li>BOTS OF BITCOIN PFPs : ERC721</li>
          <li>$BOTS Token : ERC20</li>
          </div>
          <p className='text-[20px] pt-[20px] pb-[20px]'>$BOTS is the Primary token within the Platform with a Max Supply of 690 Million, although it is not used for Fees it serves the following uses:</p>
          <div className='flex flex-col gap-[5px] md:gap-[6px]'>
          <li>Governance : Along with the PFPs , $BOTS will enable that all users who missed the PFPs have the option to participate in Governance of the BOTS OF BITCOIN Platform.</li> 
          <li>Reward Token : $BOTS also acts as the Reward token for the Platform where users can Stake their PFPs to Earn Platform Revenue in $BOTS Token. Users can also Stake $BOTS itself to earn 20% of all Platform Revenue as Yield.</li>
          </div>
          <p className='text-[20px] pt-[20px] pb-[20px]'>Upto a total of 50% of all Revenue Generated in the Plaform (in BTC) is used to Buy-Back $BOTS and Distributed back to Ecosystem Contributors such as Stakers. Ecosystem Allocation is Utilized for Liquidity , Partnerships , Future Events and it's Utilization will be decided by Community through Voting. </p>
          <p className='font-nunito font-semibold text-[1.25rem] pt-[20px] pb-[20px]'>The Distribution of $BOTS will look like this :</p>
          <div className='flex flex-col gap-[5px] md:gap-[6px]'>
          <li>NFT Holders : 5% of Total Supply.</li>
          <li>Community & Incentives: 10% of Total Supply.</li>
          <li>Ecosystem & Liquidity: 50% of Total Supply.</li>
          <li>Presales : 15% of Total Supply.</li>
          <li>Public Sales : 10% of Total Supply.</li>
          <li>Team : 10% of Total Supply. (Vested - Cliff)</li>
          </div>
        </div>
     </div>
    </>
  )
}
