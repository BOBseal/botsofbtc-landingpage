'use client'
import React ,{useState}from 'react'
import "../styles/casarol.css";
import Image from '../../node_modules/next/image';
// for now i just have hard coded to show the image 
import { motion , AnimatePresence } from 'framer-motion'
import img1 from '../assets/6.png'
import img2 from '../assets/7.png'
import img3 from '../assets/8.png'
import img4 from '../assets/9.png'
import img5 from '../assets/10.png'
import img6 from '../assets/11.png'
import img7 from '../assets/12.png'
import img8 from '../assets/13.png'
import img9 from '../assets/5.png'
import lArrow from "../assets/leftArrow.png"
import rArrow from "../assets/rightArrow.png"

export default function Casarol() {
    const [act , setAct] = useState(1);
    const [images,setImages] =useState({
        imgCenter:img1,
        imgleft:img2,
        imgRight: img3
    });

    const goLeftM=()=>{
        if(act == 9){
            return
        }
        const x = act ;
        setAct(x +1);
    }
    const goRightM=()=>{
        if(act == 1){
            return
        }
        const x = act ;
        setAct(x -1);
    }
    

    const goLeft =()=>{
        if(images.imgRight == img3){
            setImages({...images, imgleft:img1, imgCenter:img3, imgRight:img4});
        }
        if(images.imgRight == img4){
            setImages({...images, imgleft:img3, imgCenter:img4, imgRight:img5});
        }
        if(images.imgRight == img5){
            setImages({...images, imgleft:img4, imgCenter:img5, imgRight:img6});
        }
        if(images.imgRight == img6){
            setImages({...images, imgleft:img5, imgCenter:img6, imgRight:img7});
        }
        if(images.imgRight == img7){
            setImages({...images, imgleft:img6, imgCenter:img7, imgRight:img8});
        }
        if(images.imgRight == img8){
            setImages({...images, imgleft:img7, imgCenter:img8, imgRight:img9});
        }
    }

    const goRight =()=>{
        if(images.imgRight == img4){
            setImages({...images, imgleft:img2, imgCenter:img1, imgRight:img3});
        }
        if(images.imgRight == img5){
            setImages({...images, imgleft:img1, imgCenter:img3, imgRight:img4});
        }
        if(images.imgRight == img6){
            setImages({...images, imgleft:img3, imgCenter:img4, imgRight:img5});
        }
        if(images.imgRight == img7){
            setImages({...images, imgleft:img4, imgCenter:img5, imgRight:img6});
        }
        if(images.imgRight == img8){
            setImages({...images, imgleft:img5, imgCenter:img6, imgRight:img7});
        }
        if(images.imgRight == img9){
            setImages({...images, imgleft:img6, imgCenter:img7, imgRight:img8});
        }
    }
    
    return (
        <div className='flex justify-center flex-col border-[3px] border-black w-full h-[500px] md:h-[600px] lg:h-[700px] bg-[#140a06f9] to-[#8C1D52]'>
            <div className='flex flex-col md:flex-row justify-center md:justify-between items-center h-[80%]'>
              <button className='hidden md:flex w-[2rem] h-[2rem] ml-[2rem]' onClick={()=>goRight()}>
                <Image height={1000} width={1000} src={lArrow} className="object-cover"/>
              </button>
    
              <div className='flex justify-center md:justify-between w-[75%] items-center gap-3'>
                  <div className='hidden md:flex  rounded-2xl h-[222px] w-[222px] lg:h-[328px] lg:w-[328px] items-center drop-shadow-2xl justify-center'>
                    <div className='object-cover hover:scale-[104%] ease-in'>
                        <Image src={images.imgleft} height={1000} className="rounded-xl border-[2px]" width={1000} alt="BOOBIES"/>
                    </div>
                  </div>
    
                  <div className='rounded-2xl h-[282px] w-[282px] lg:h-[410px] lg:w-[410px] items-center justify-center drop-shadow-2xl'>
                    <div className='object-cover hidden md:flex hover:scale-[104%] ease-in'>
                        <Image src={images.imgCenter} height={1000} width={1000} className="rounded-xl border-[2px]" alt="BOOBIES"/>
                    </div>
                    <div className='object-cover md:hidden'>
                        <Image src={img1} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 1 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img2} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 2 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img3} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 3 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img4} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 4 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img5} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 5 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img6} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 6 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img7} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 7 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img8} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 8 ? "" :"hidden"}`} alt="BOOBIES"/>
                        <Image src={img9} height={1000} width={1000} className={`rounded-xl hover:scale-105 border-[2px] ease-in-out ${act == 9 ? "" :"hidden"}`} alt="BOOBIES"/>
                    </div>
                  </div>
    
                  <div className='hidden md:flex rounded-2xl h-[222px] w-[222px] lg:h-[328px] lg:w-[328px] items-center justify-center drop-shadow-2xl'>
                    <div className='object-cover hover:scale-[104%] ease-in'>
                        <Image src={images.imgRight} height={1000} width={1000} alt="BOOBIES" className="rounded-xl border-[2px]"/>
                    </div>
                  </div>
              </div>
      
              <button className='hidden md:flex w-[2rem] h-[2rem] mr-[2rem]' onClick={()=>goLeft()}>
                <Image height={1000} width={1000} src={rArrow} className="object-cover"/>
              </button>

              <div className='flex mt-[2rem] w-[50%] justify-between md:hidden'>
                <button className=' w-[2rem] h-[1rem] ' onClick={()=>goRightM()}>
                    <Image height={1000} width={1000} src={lArrow} className="object-cover"/>
                </button>
                <button className=' w-[2rem] h-[1rem]' onClick={()=>goLeftM()}>
                    <Image height={1000} width={1000} src={rArrow} className="object-cover"/>
                </button>
              </div>  
            </div>
            
        </div>
    )
}
