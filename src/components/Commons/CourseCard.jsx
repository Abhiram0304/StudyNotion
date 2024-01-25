import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';
import GetAvgRating from '../../utilities/getAvgRating';

const CourseCard = ({course,height}) => {

    const [avgRating,setAvgRating] = useState(1);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgRating(count);
    },[course]);

  return (
    <>
        <Link to={`/courses/${course?._id}`}>
            <div className='flex gap-[0.5rem] flex-col'>
                <div className='rounded-lg'>
                    <img src={course?.thumbnail} alt='thumbnail' loading='lazy' className={`${height} w-full rounded-lg object-cover`} />
                </div>
                <div className='flex flex-col gap-[0.25rem]'>
                    <h1 className='text-[18px] text-richblack-5 font-medium'>{course?.courseName}</h1>
                    <div className='flex w-full gap-[0.5rem] justify-start items-center'>
                        <p className='text-[16px] font-medium text-richblack-25'>Instructor : </p>
                        <div className='flex justify-center flex-row-reverse items-center gap-[0.5rem]'>
                            <img src={course?.instructor?.image} alt='instructor image' loading='lazy' className='w-[2rem] h-[2rem] rounded-full object-cover' />
                            <p className='text-[16px] font-medium text-richblack-25'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        </div>
                    </div>
                    <div className='flex gap-[1rem] text-richblack-100 justify-start items-center'>
                        <RatingStars reviewCount={avgRating} />
                        <p className='text-richblack-100'>({course?.ratingAndReviews?.length || 0}) Ratings</p>
                    </div>
                    <div className='text-richblack-5 text-[20px] font-semibold font-edu-sa'>Rs.{course?.price}</div>
                </div>
            </div>
        </Link>
    </>
  )
}

export default CourseCard