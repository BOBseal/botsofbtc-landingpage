import React from 'react'

const LotteryCard = ({data}) => {
  return (
    <div className={`flex w-full h-full justify-center`}>
        <div className='flex p-[1rem] flex-col h-[15rem] font-fredoka md:h-[17rem] lg:h-[20rem] border-[3px] border-[#E5BD19] justify-evenly rounded-xl w-[90%] md:w-[70%] lg:w-[50%]'>
            
            <div className='text-[20px] md:text-[30px]'>
                <p>Your Tickets: <span className='text-[#E5BD19]'>{data.userTickets.length}/10 Tickets </span></p>
            </div>
            <div className='flex h-[6rem] items-center text-[20px] md:text-[25px] gap-[1em]'>
                <p>Amount :</p>
                <input type={'number'} min={1} max={10} className='w-[3rem] text-[#E5BD19] md:w-[20rem] bg-transparent h-[3rem]' defaultValue={1}/>
            </div>
            
            <div className='flex justify-center text-[20px] md:text-[30px]'>
                <div className='bg-[#E5BD19] text-black font-fredoka font-bold cursor-pointer rounded-lg p-[10px]'>BUY TICKETS</div>
            </div>
        </div>
    </div>
  )
}

export default LotteryCard