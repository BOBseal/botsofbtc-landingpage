import React from 'react'
import SobBanner from "../Banners/SobBanner.jsx"
import Swap from "../Swap.jsx"
import SkibStake from "../SkibStake.jsx"

const QuickUtilities = ({pageNo}) => {
  return (
    <div className='flex w-full h-full'>
        {pageNo == 0 ? <SobBanner/> :""}
        {pageNo == 1 ? <Swap/> :""}
        {pageNo == 2 ? <SkibStake/>:""}
    </div>
  )
}

export default QuickUtilities