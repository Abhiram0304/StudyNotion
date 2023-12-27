import React from 'react'
import Button from '../HomePage/Button'

const LogOutModal = ({data}) => {
  
  const modalStyles = {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(3px)'
  };

  return (
    <div className='absolute bg-richblack-100 top-0 left-0 w-[100vw] h-[100%] z-[10] flex justify-center items-center' style={modalStyles} >
      <div className='bg-richblack-800 px-[2rem] py-[2rem] rounded-lg'>
        <div className='flex flex-col gap-[0.3rem]'>
            <h1 className='text-richblack-5 font-semibold font-mono tracking-tighter text-[18px]'>{data?.heading}</h1>
            <p className='text-richblack-300 font-medium text-[14px]'>{data?.subheading}</p>
            <div className='flex mt-[10px] gap-[2rem] items-center justify-center'>
                <button onClick={data?.btn1Handler}><Button active={true}>{data?.b1txt}</Button></button>
                <button onClick={data?.btn2Handler}><Button active={false}>{data?.b2txt}</Button></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LogOutModal