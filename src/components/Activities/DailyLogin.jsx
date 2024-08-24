import React from 'react'

const DailyLogin = ({data,dailyMine,loaders}) => {
  //const {user , dailyMine} = useContext(AppContext);
  return (
    <div className='w-full flex h-[25rem] items-center justify-center'>
        <div className='w-[90%] md:w-[70%] lg:w-[35%] bg-[#E5BD19] gap-[15px] h-[90%] border-black border-[2px] rounded-2xl flex flex-col items-center'>
          <div className='flex justify-center items-center w-full pt-[1rem]'>
            <h1 className='text-[25px] md:text-[35px] font-fredoka'>Daily Login</h1>
          </div>
          <div className='p-[10px] md:text-[22px] font-fredoka text-[15px]'>Task Desc: On-Chain Daily Log-In & Get Bonus RP</div>
          <div className='w-[90%] text-[18px] md:text-[22px] h-full font-nunito flex flex-col gap-[10px]'>
            <div>Eligible RP/Day : {data.pointPerDay ? <>{data.pointPerDay}</>:"0"} RP</div>
            <div>Next Sign-In On : {data.nextTime ? <>{data.nextTime}</>:"Loading"}</div>
          </div>
          <div className='w-[90%] h-full flex flex-col items-center'>
            <button onClick={()=>dailyMine()} className={`${!loaders.dailyLogin ? "bg-black text-[#E5BD19]" : "text-gray-600 bg-[#cda916] border-black"} px-[20px] py-[5px] drop-shadow hover:drop-shadow-xl rounded-2xl border cursor-pointer transition duration-500 ease-linear transform hover:scale-105 hover:border-red-500 border-[#E5BD19] text-[25px] font-fredoka font-[700]`}>
              {loaders.dailyLogin ? "Loading...": `Mine Daily RP`}
            </button>
          </div>
        </div>
    </div>
  )
}

export default DailyLogin