import React from 'react'

const Statistics = () => {
  return (
    <div className='w-full bg-richblack-700 flex items-center justify-center py-[2rem]'>
        <div className='flex justify-between items-center lg:w-3/5 md:w-3/4 w-4/5'>
            <div className='flex flex-col justify-between items-center md:gap-[1rem] gap-[0.5rem]'>
                <h1 className='font-semibold lg:text-[30px] md:text-[26px] text-[23px] text-richblack-5'>5K</h1>
                <p className='lg:text-[16px] md:text-[15px] text-[13px] font-semibold text-richblack-300'>Active Students</p>
            </div>
            <div className='flex flex-col justify-between items-center md:gap-[1rem] gap-[0.5rem]'>
                <h1 className='font-semibold lg:text-[30px] md:text-[26px] text-[23px] text-richblack-5'>10+</h1>
                <p className='lg:text-[16px] md:text-[15px] text-[13px] font-semibold text-richblack-300'>Mentors</p>
            </div>
            <div className='flex flex-col justify-between items-center md:gap-[1rem] gap-[0.5rem]'>
                <h1 className='font-semibold lg:text-[30px] md:text-[26px] text-[23px] text-richblack-5'>50+</h1>
                <p className='lg:text-[16px] md:text-[15px] text-[13px] font-semibold text-richblack-300'>Courses</p>
            </div>
            <div className='flex flex-col justify-between items-center md:gap-[1rem] gap-[0.5rem]'>
                <h1 className='font-semibold lg:text-[30px] md:text-[26px] text-[23px] text-richblack-5'>200+</h1>
                <p className='lg:text-[16px] md:text-[15px] text-[13px] font-semibold text-richblack-300'>Awards</p>
            </div>
        </div>
    </div>
  )
}

export default Statistics