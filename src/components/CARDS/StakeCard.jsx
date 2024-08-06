'use client'
import React, {useState} from 'react'

const StakeCard = ({data,stake,approve}) => {
  const [states , setStates] = useState({
    timeframe:604800,
    state:"",
    loading:false
  })

  const handleSelect =(e)=>{
    try {
      const value = e.target.value;
      console.log(value);
      setStates({...states,timeframe:value});
    } catch (error) {
      console.log(error)
    }
  }

  const stakeHandle = async(id)=>{
    try {
      console.log(states)
      const rr = await stake(id,states.timeframe);
      return rr
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {data.userNfts.ownedIds.map((d)=>(
                    <div key={d} className='flex font-fredoka min-h-[11.5rem] md:min-h-[15rem] md:min-w-[18rem] flex-col w-full border-b border-[#E5BD19] border-r justify-evenly items-center rounded-2xl'>
                      <h2 className='font-bold text-[22px]'>Skibbidies Of Bitcoin #{d}</h2>
                      <div>
                      Timeframe :
                      <select className='bg-transparent' onChange={(e)=>handleSelect(e)} onSelect={(e)=>handleSelect(e)} name="Select Time" id="time">
                        <option value={604800} className='text-black'>7 Days</option>
                        <option value={1296000} className='text-black'>15 Days</option>
                        <option value={2592000} className='text-black'>30 Days</option>
                      </select>
                      </div>
                      <p>RP/Day : {data.perDay} RP</p>
                      {!data.isApproved?
                      <button onClick={()=>approve()} className='bg-[#E5BD19] text-black font-nunito p-[15px] text-[22px] py-[4px] hover:scale-105 rounded-2xl'>APPROVE</button>
                      :
                      <button onClick={()=>stakeHandle(d)} className='bg-[#E5BD19] text-black font-nunito p-[15px] text-[22px] py-[4px] hover:scale-105 rounded-2xl'>STAKE</button>
                      }
                    </div>
        ))}
    </>
  )
}

export default StakeCard