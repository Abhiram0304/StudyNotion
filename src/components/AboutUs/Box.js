import React from 'react'

const Box = ({color,title,description}) => {
  return (
    <div className={`w-[265px] h-[265px] ${color===1 ? "bg-richblack-700" : "bg-richblack-800"} flex flex-col py-[2rem] px-[2rem] items-baseline jus text-left gap-[32px]`}>
        <h1 className='text-richblack-5 font-semibold h-[45px] text-[16px] leading-[26px]'>{title}</h1>
        <p className='text-richblack-100 font-normal text-[14px] leading-[22px]'>{description}</p>
    </div>
  )
}

export default Box