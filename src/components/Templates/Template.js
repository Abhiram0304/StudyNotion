import React from 'react'
import Frame from '../../assets/Images/frame.png'
import LoginForm from '../Forms/Login'
import SignupForm from '../Forms/Signup'
import {FcGoogle} from 'react-icons/fc'

const Template = ({title,desc1,desc2,image,form,setLoggedIn}) => {
  return (
    <div className='flex lg:flex-row mb-[2rem] flex-col-reverse place-content-between lg:gap-[7rem] gap-[4rem] overflow-y-hidden overflow-x-hidden justify-center relative items-center lg:w-3/5 w-4/5 pt-[7rem] mx-auto py-[5rem]'>
        <div className='flex flex-col lg:gap-[20px] gap:[10px] lg:w-[45%] w-full'>
            <div className='flex flex-col'>
                <h1 className='font-semibold lg:mb-[2rem] mb-[1rem] text-[30px] text-white leading-[1.2] tracking-wide'>{title}</h1>
                <span className='text-richblack-100 text-[18px] leading-[1] tracking-wide'>{desc1}</span>
                <span className='text-blue-100 text-[16px] font-edu-sa font-bold'>{desc2}</span>
            </div>
            <div className='w-full'>
                {form === "signup" ? (<SignupForm setLoggedIn={setLoggedIn} />) : (<LoginForm setLoggedIn={setLoggedIn} />)}
            </div>
        </div>

        <div className='relative lg:mt-12 mt-1 h-full lg:w-[50%]'>
            <img className='relative w-full' src={Frame} alt='frame'/>
            <img className='absolute w-full h-full top-4 left-4 aspect-square' src={image} alt='image'/>
        </div>
    </div>
  )
}

export default Template