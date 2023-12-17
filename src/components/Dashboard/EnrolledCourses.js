import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrolledCourses } from '../../services/operations/profileAPI'
import ProgressBar from "react-progressbar"

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);

    const [loading,setLoading] = useState(true);
    const [enrolledCoursesList,setEnrolledCourseList] = useState([]);

    const dispatch = useDispatch();

    const getEnrolledCourses = async() => {
        try{
            const res = await dispatch(enrolledCourses(token));
            console.log("res : ",res);
            setEnrolledCourseList(res);
        }catch(e){
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        getEnrolledCourses();
    },[]);

  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] bg-richblack-900'>
        {
            loading ? 
            (<div className='w-full h-full flex justify-center items-center'>
                <div className='text-[45px] font-semibold text-richblack-5'>Loading...</div>
            </div>) : 
            (
                <div className='px-[2rem] py-[1rem]'>
                    <h1 className='font-semibold text-[36px] text-richblack-5 font-edu-sa'>Enrolled Courses</h1>
                    {/* ADD THE TOGGLE HERE */}
                    {
                        enrolledCoursesList.length === 0 ? (<div className='font-medium text-[26px] text-richblack-5 mt-[4rem]'>You are Not Enrolled in any Courses...</div>) : 
                        (
                            <div>
                                <div>
                                    <div>Course Name</div>
                                    <div>Duration</div>
                                    <div>Progress</div>
                                </div>
                                
                                {
                                    enrolledCoursesList.map((course,index) => {
                                        return (
                                            <div key={index}>
                                                <div>
                                                    <img src={course.thumbnail} className='w-[50px] h-[50px]' alt='thumbnail' />
                                                    <div>
                                                        <div>{course.courseName}</div>
                                                        <div>{course.courseDescription}</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    Course Duration
                                                </div>
                                                <div>
                                                <p>Progress: {course.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height="8px"
                                                isLabelVisible={false}
                                                />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses