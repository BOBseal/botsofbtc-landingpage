import React from 'react'
import SobBanner from "../Banners/SobBanner.jsx"
import Swap from "../Swap.jsx"
import SkibStake from "../SkibStake.jsx"
import LotterySelectZone from '../Activities/LotterySelectZone.jsx'
import Beth from '../Vaults/BethVault.jsx'


const QuickUtilities = ({pageNo}) => {
  return (
    <div className='flex w-full h-full pt-[1rem] items-center justify-center'>
        {pageNo == 1 ? <SobBanner/> :""}
        {pageNo == 2 ? <Swap/> :""}
        {pageNo == 0 ? <Beth/>:""}
        {pageNo == 4 ?<LotterySelectZone/>:""}
        {pageNo == 3 ? <SkibStake/>:""}
      
    </div>
  )
}

export default QuickUtilities