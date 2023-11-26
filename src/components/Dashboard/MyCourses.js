import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/HomePage/Button'
import {RiAddCircleLine} from 'react-icons/ri';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const [courses,setCourses] = useState([]);

  return (
    <div className='w-full min-h-[100vh] py-[1rem] px-[2rem] bg-richblack-900'>
        <div className='flex justify-between pr-[3rem]'>
            <h1 className='text-[36px] font-semibold font-edu-sa text-richblack-5 '>My Courses</h1>
            <Button active={true}>
                <div className='flex gap-[0.5rem] justify-center items-center'>
                    <RiAddCircleLine />
                    <div>New</div>
                </div>
            </Button>
        </div>
        <div>
            {
                
            }
        </div>
    </div>
  )
}

export default MyCourses