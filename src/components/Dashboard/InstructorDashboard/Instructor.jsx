import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorData } from '../../../services/operations/profileAPI';
import './instructor.css';
import CourseSlider from '../../Commons/CourseSlider';
import PieChart from './PieChart';

const Instructor = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(true);
    const [instructorData,setInstructorData] = useState(null);
    const dispatch = useDispatch();
    const [activeTab,setActiveTab] = useState(1);

    const fetchData = async () => {
      const response = await dispatch(getInstructorData(token));
      console.log("Response  : ",response);
      setInstructorData(response);
      setLoading(false);
    }

    useEffect(() => {
      fetchData();
    },[]);

    const totalAmount = instructorData?.reduce((acc,curr) => acc += curr?.totalIncome,0);
    const totalEnrolledStudents = instructorData?.reduce((acc,curr) => acc += curr?.totalEnrolledStudent,0);

    if(loading){
      return(
        <div className='w-[100vw] h-[100vh] bg-richblack-900 flex justify-center items-center'>
          <div className='spinner'></div>
        </div>
      )
    }

  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] w-[100%] bg-richblack-900'>
        <div className='md:py-[5rem] py-[2rem] flex flex-col gap-[1rem] md:w-4/5 w-[95%] mx-auto' >
          <div className='flex flex-col gap-[0.25rem]'>
            <h1 className='text-richblack-5 font-edu-sa font-semibold text-[36px]'>Hi {user?.firstName} 👋</h1>
            <p className='text-[16px] text-richblack-200 tracking-wide'>Let's start something new</p>
          </div>

          <div className='w-full flex lg:flex-row flex-col justify-between gap-[1rem] items-stretch'>
            <div className='bg-richblack-800 lg:w-[75%] w-full rounded-lg px-[1rem] py-[1rem] flex flex-col justify-start items-start'>
              <p className='text-richblack-5 text-[24px] font-semibold tracking-wide'>Visualise</p> 
              {
                totalAmount===0 || totalEnrolledStudents===0 ? (
                  <div className='text-[20px] text-richblack-25'>Not Enough Data to Visualise</div>
                ) : (
                  <>
                    <div className='flex gap-[0.5rem] justify-start items-center'>
                      <div onClick={() => setActiveTab(1)} className={`px-[0.5rem] py-[0.5rem] cursor-pointer rounded-xl tracking-wide font-semibold transition-all duration-300 ${activeTab === 1 ? 'text-yellow-25 bg-richblack-700' : 'text-yellow-200 bg-transparent'}`} >Students</div>
                      <div onClick={() => setActiveTab(2)} className={`px-[0.5rem] py-[0.5rem] cursor-pointer rounded-xl tracking-wide font-semibold transition-all duration-300 ${activeTab === 2 ? 'text-yellow-25 bg-richblack-700' : 'text-yellow-400 bg-transparent'}`}>Income</div>
                    </div>
                    <PieChart data={instructorData} activeTab={activeTab} /> 
                  </>
                )
              }
            </div>
            <div className='bg-richblack-800 lg:w-[25%] w-full gap-[0.5rem] px-[1rem] py-[1rem] rounded-lg flex flex-col justify-start items-start'>
              <p className='text-[24px] text-richblack-5 font-bold tracking-wider'>Statistics</p>
              <div className='flex lg:flex-col justify-between lg:justify-start gap-[1rem] flex-wrap'>
                <div className='flex w-[120px] flex-col justify-start items-start gap-[0.1rem]'>
                  <p className='text-[16px] text-richblack-300'>Total Courses</p>
                  <p className='font-edu-sa text-[22px] font-bold text-richblack-5'>{instructorData?.length}</p>
                </div>
                <div className='flex w-[120px] flex-col justify-start items-start gap-[0.1rem]'>
                  <p className='text-[16px] text-richblack-300'>Total Students</p>
                  <p className='font-edu-sa text-[22px] font-bold text-richblack-5'>{totalEnrolledStudents}</p>
                </div>
                <div className='flex w-[120px] flex-col justify-start items-start gap-[0.1rem]'>
                  <p className='text-[16px] text-richblack-300'>Total Income</p>
                  <p className='font-edu-sa text-[22px] font-bold text-richblack-5'>{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-richblack-800 px-[1rem] py-[1rem] flex flex-col gap-[0.5rem] w-full rounded-lg'>
            <p className='text-richblack-5 text-[24px] font-semibold tracking-wide'>Your Courses</p>
            <CourseSlider courses={instructorData}  />
          </div>
        </div>
    </div>
  )
}

export default Instructor