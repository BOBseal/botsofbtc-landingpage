{/* eslint-disable react/no-unescaped-entities */}

import React from 'react'
import '../styles/milk.css'

export default function Milk() {
  return (
    <>
       <div className="milk-container border-[3px] border-black">
        <div className="milk-inner-container border-[2px] border-black shadow-lg">
        <div className="ab-milk-inner-container ">
            <h2 className=' text-[24px] pb-[1rem] md:text-[60px] font-nunito'>Oil Pots (Coming Soon)</h2>
            <p>Oil Pots are a Simple Raffles where there are Pots (or Rounds ) on which each 
Pot consists of Varying Capacity for Oil Drops (or Tickets) and Users can Pour one drop at a time into the 
Current Pot. Each Drop has a Unique Bytes12 Id and an Owner value representing it making 
each Drop unique Tickets.</p>

<h2 className=' text-[19px] md:text-[30px] font-[600] font-nunito'>About the Game</h2>
<p>Each User can pour upto max 10 drops into a Pot , each Oil Drop costing from 1$ - 100$. When 
the Pot is filled , i.e. reaches 500 Drops 10 Random Drops(Tickets) are selected 
as Winners and the 85% of the Pot is equally distributed among the Owners of the 10 
Winning Drops. After this The next Pot (Round) gets activated and User can Claim his 
Winning Shares. The Rest 15% Of the Pot goes to Platform Revenue.</p>

<h3 className='text-[19px] md:text-[30px] font-[600] font-nunito'>Brief:</h3>
<p>1: Rounds of the Lottery are called "Pots" & Tickers as Oil Drops.</p>
<p>2: Each Pot can Hold Varying Quantities of Drops.</p>
<p>3: There can be Varying Number of Winners depending on Pot type (risk different based on max entries, max winners ).</p>
<p>4: The System of Starting Ticket Buy , Starting Draw and Transfer of Win Amounts are all Automatic and Admin have no control over funds except fee accrued.</p>
<p>5: Till TGE 30% of All Fee Generated through Raffles would be Reserved towards Strengthening Token Liquidity.</p>
        </div>
        </div>
       </div>
    </>
  )
}
