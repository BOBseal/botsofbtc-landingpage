import React from 'react'
import Navbar from "../../components/NAVBAR"
import Footer from "../../components/Footer"


const Page = () => {
    const styles ={
        screen:`flex flex-col items-center h-full min-h-[50rem] bg-[#231F20] border-b-[2px] border-[#E5BD19]`
    }

    return (
    <>
    <Navbar/>
        <div className={styles.screen}>
            
        </div>
    <Footer/>
    </>
  )
}

export default Page