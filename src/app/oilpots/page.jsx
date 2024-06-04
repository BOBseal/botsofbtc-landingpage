import React from 'react'
import Navbar from '@/components/NAVBAR'
import Footer from "@/components/Footer"
import LotteryCard from "@/components/CARDS/LotteryCard"
const Page = () => {
    const style = {
        main:`flex-col flex border-b py-[2rem] text-white bg-[#231F20] h-full w-screen items-center justify-between`,
        a:`flex flex-col h-[20rem] md:h-[25rem] w-full justify-between items-center`,
        b:`flex flex-col h-full w-full pt-[2rem] w-full items-center border-t-[3px] border-[#E5BD19]`
    }

    const mockData = {
        ticketsLeft:50,
        userTickets:[
            "0xABiohefiuihrgaiheroihoighoiahreoighoeroignikhnikhij",
            "0xABiohefiuihrgaiheroihoighoiahreoighoeroignikhnikhijC",
            
            "0xABiohefiuihrgaiheroihoighoiahreoighoeroignikhnjoijC",
        ],
        finishedRounds:[
            {
                roundNo:12, 
                winningTickets:[
                    "0xABC",
                    "0xDEF",
                    "0xGHI" 
                ]
            },
            {
                roundNo:13, 
                winningTickets:[
                    "0xABC",
                    "0xDEF",
                    "0xGHI" 
                ]
            },
            {
                roundNo:14, 
                winningTickets:[
                    "0xABC",
                    "0xDEF",
                    "0xGHI" 
                ]
            },
        ],
    }

  return (
    <>
    <Navbar/>

        <div className={`${style.main}`}>
            <div className={`${style.a}`}>
                <div className={`flex justify-center h-[30%]`}>      
                    <h1 className={`md:text-[76px] text-[50px] font-[800] drop-shadow-2xl font-fredoka text-[#E5BD19]`}>OIL POTS</h1>
                </div>
                <div className={`flex w-[90%] md:w-[70%] lg:w-[50%] items-center justify-evenly flex-col h-[60%] bg-[#E5BD19] rounded-t-xl`}>
                    <div className='w-[90%] md:w-[70%] lg:w-[50%] justify-evenly h-full items-center flex flex-col'>
                        <div className=''>
                            <p className='text-[35px] font-[600] md:text-[42px] text-black font-fredoka'>OIL POT #123</p>
                        </div>
                        <div className='text-[18px] font-[600] flex flex-col text-black font-fredoka gap-[6px]'>
                            <p>Price/Ticket : 0.001 ETH</p>
                            <p>Winners/Pot : 3</p>
                            <p>Entries Left : {mockData.ticketsLeft}/100</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${style.b}`}>
                <LotteryCard data={mockData}/>
            </div>

            <div className='pt-[2rem] h-full'>
                Get your last win details
            </div>
        </div>

    <Footer/>
    </>
  )
}

export default Page