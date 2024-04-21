import React from 'react'
import '../styles/footer.css'

import dis from '../assets/Vector.svg'
import twit from '../assets/Vector (1).svg'

export default function Footer() {
  return (
    <>
      <div className="f-container">
         <div className="f-upper">
            <div className="f-right">
              {/*  CAN USE ROUTER TO NAVIGATE THROUGH DIFFERNT PAGES IN FUTURE */}
            <div className='f-list-items'>Home</div>
            <div className='f-list-items'>About</div>
            <div className='f-list-items'>Tokenomic</div>
            <div className='f-list-items'>Whitepaper</div>



            </div>
            
            <div className="f-left">
            <div className='f-list-items'>Shop</div>
            <div className='f-list-items'>Mint</div>
            <div className='f-list-items'>Community</div>


            </div>
         </div>
         <div className="f-lower">
            
            <div className="f-img"> <img  src={dis} alt="" /></div>
            <div className="f-img"> <img src= {twit} alt="" /></div>

         </div>


      </div>
    </>
  )
}
