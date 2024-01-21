import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/HomePage/Button'
import {RiAddCircleLine} from 'react-icons/ri';
import  {getInstructorCourses} from '../../services/operations/courseDetailsAPI'
import CourseTable from './CourseTable';
import { useNavigate } from 'react-router-dom';
import './myCourses.css';

const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [courses,setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async() => {
            const coursesList = await dispatch(getInstructorCourses(token));
            setCourses(coursesList);
            setLoading(false);
        }
        getCourses();
    },[]);

    if(loading){
        return (
            <div className='w-[100vw] h-[100vh] bg-richblack-900 flex justify-center items-center'>
               <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className='font-inter flex flex-col gap-[2rem] min-h-[100vh] lg:w-[85%] md:w-[75%] mx-auto md:px-[2rem] px-[1rem] py-[2rem] w-[100%] bg-richblack-900'>
        <div className='w-full flex justify-between'>
            <h1 className='text-[36px] font-semibold font-edu-sa text-richblack-5 '>My Courses</h1>
            
            <div className='flex gap-[0.5rem] justify-center items-center' onClick={() => navigate("/dashboard/addCourse")}>
                <Button active={true}>
                    <RiAddCircleLine />
                    <div>New</div>
                </Button>
            </div>
            
        </div>
        <CourseTable courses={courses} setCourses={setCourses} />
    </div>
  )
}

export default MyCourses