import React from 'react'
import SobBanner from "../Banners/SobBanner.jsx"
import Swap from "../Swap.jsx"
import SkibStake from "../SkibStake.jsx"
import LotterySelectZone from '../Activities/LotterySelectZone.jsx'

const QuickUtilities = ({pageNo}) => {
  return (
    <div className='flex w-full h-full pt-[1rem]'>
        {pageNo == 0 ? <SobBanner/> :""}
        {pageNo == 1 ? <Swap/> :""}
        {pageNo == 3 ?<LotterySelectZone/>:""}
        {pageNo == 2 ? <SkibStake/>:""}
      
    </div>
  )
}

export default QuickUtilities