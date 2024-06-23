import React from 'react'
import SobBanner from "../Banners/SobBanner.jsx"
import Swap from "../Swap.jsx"

const QuickUtilities = ({pageNo}) => {
  return (
    <div className='flex w-full h-full'>
        {pageNo == 0 ? <SobBanner/> :""}
        {pageNo == 1 ? <Swap/> :""}
    </div>
  )
}

export default QuickUtilities