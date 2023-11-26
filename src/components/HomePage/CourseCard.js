import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'

const CourseCard = ({course,currentCard}) => {

    return (
    <div className='relative'>
        <div className={`${currentCard ? "bg-[white]" : "bg-richblack-800"} relative text-black w-[280px] h-[280px] flex flex-col px-[1rem] py-[1rem] justify-between z-[2]`}>
            <div className='flex flex-col items-center justify-center'>
                <h2 className={`${currentCard ? "text-richblack-800" : "text-white"} font-semibold text-[20px]`}>{course.heading}</h2>
                <p className='text-richblack-600 text-[16px] font-semibold mt-[1rem]'>{course.description}</p>
            </div>
            <div className={`flex w-full justify-between ${currentCard ? "text-blue-500" : "text-richblack-500"}`}>
                <div className='flex items-center font-semibold gap-[8px]'>
                    <HiUsers />
                    <p>{course.level}</p>
                </div>
                <div className='flex items-center font-semibold gap-[8px]'>
                    <ImTree />
                    <p>{course.lessionNumber}</p>
                </div>
            </div>
        </div>
        <div className={`${currentCard ? "w-[280px] h-[280px] bg-yellow-50 z-[1] absolute top-3 left-3" : "hidden" }`}></div>
    </div>
  )
}

export default CourseCard