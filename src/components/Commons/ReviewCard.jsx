import React from 'react'
import RatingStars from './RatingStars';

const ReviewCard = ({data}) => {
    console.log("data",data);
  return (
    <div className='px-[1rem] py-[1rem] flex flex-col gap-[1.5rem] rounded-lg bg-richblack-800'>
        <div className='flex gap-[2rem]'>
            <img className='w-[56px] h-[56px] rounded-full object-cover' src={data?.user?.image} />
            <div className='flex flex-col h-full justify-start items-between'>
                <h1 className='text-[20px] text-richblack-5 font-medium'>{data?.user?.firstName} {data?.user?.lastName}</h1>
                <p className='text-[16px] text-richblack-400'>{data?.user?.email}</p>
            </div>
        </div>
        <div className='flex flex-col gap-[0.5rem]'>
            <h1 className='text-richblack-50 text-[18px]'>{data?.course?.courseName}</h1>
            <p className='text-richblack-100 text-[16px]'>{data?.review}</p>
            <RatingStars reviewCount={data?.rating} />
        </div>
    </div>
  )
}

export default ReviewCard