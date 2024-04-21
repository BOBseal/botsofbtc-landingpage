import React from 'react'
import {Swiper ,SwiperSlide, useSwiper} from 'swiper/react'
// import { EffectCoverflow , Pagination, Navigation}  from 'swiper'
import '../styles/casarol.css'
import { sliderSettings } from '../utils/common'


import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// for now i just have hard coded to show the image 

import img from '../assets/6.png'
import img2 from '../assets/7.png'
import img3 from '../assets/8.png'
import img4 from '../assets/9.png'
import img5 from '../assets/10.png'
import img6 from '../assets/11.png'
import img7 from '../assets/12.png'
import img8 from '../assets/13.png'

export default function Casarol() {
  return (
    <>
    <div className="s-container">
       <Swiper
           loop={true}
           
           {...sliderSettings}
       >
           <SwiperSlide>
               <img className='slides' src={img}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img2}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img3}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img4}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img5}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img6}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img7}alt="" />
           </SwiperSlide>
           <SwiperSlide>
               <img className='slides' src={img8}alt="" />
           </SwiperSlide>
           <SliderBtn/>
       </Swiper>
    </div>
  </>
  )
}

const SliderBtn = () => {
    const swiper = useSwiper()
    return(
        <div className='r-btn'>
           <div className='btn' onClick={() => swiper.slidePrev() }>
                 &lt;
           </div>
           <div className='btn'  onClick={() => swiper.slideNext() }>
               &gt;
           </div>
        </div>
    )
}
