{/* eslint-disable react/no-unescaped-entities */}
import React from 'react'
import '../styles/tokenomic.css'

export default function Tokenomic() {
  return (
    <>
     <div className="token-container border-[3px] border-black">
        <h2 className='font-nunito'>TOKENOMICS</h2>
          <p>The BOTS OF BITCOIN Ecosystem Have two Primary Tokens , they are :</p>
          
          <li>BOTS OF BITCOIN PFPs : ERC721</li>
          <li>$BOTS Token : ERC20</li>
          
          <p>$BOTS is the Primary token within the Platform with a Max Supply of 690 Million, although it is not used for Fees it serves the following uses:</p>

          <li>Governance : Along with the PFPs , $BOTS will enable that all users who missed the PFPs have the option to participate in Governance of the BOTS OF BITCOIN Platform.</li> 
          <li>Reward Token : $BOTS also acts as the Reward token for the Platform where users can Stake their PFPs to Earn Platform Revenue in $BOTS Token. Users can also Stake $BOTS itself to earn 20% of all Platform Revenue as Yield.</li>
          <p>Upto a total of 50% of all Revenue Generated in the Plaform (in BTC) is used to Buy-Back $BOTS and Distributed back to Ecosystem Contributors such as Stakers. Ecosystem Allocation is Utilized for Liquidity , Partnerships , Future Events and it's Utilization will be decided by Community through Voting. </p>
          <div className='font-nunito font-semibold text-[1.25rem]'>The Distribution of $BOTS will look like this :</div>
          <li>NFT Holders : 5% of Total Supply.</li>
          <li>Community & Incentives: 10% of Total Supply.</li>
          <li>Ecosystem & Liquidity: 50% of Total Supply.</li>
          <li>Presales : 15% of Total Supply.</li>
          <li>Public Sales : 10% of Total Supply.</li>
          <li>Team : 10% of Total Supply. (Vested - Cliff)</li>
     </div>
    </>
  )
}
