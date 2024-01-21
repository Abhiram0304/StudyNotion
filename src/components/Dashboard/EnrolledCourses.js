import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrolledCourses } from '../../services/operations/profileAPI'
import ProgressBar from '@ramonak/react-progress-bar'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);

    const [loading,setLoading] = useState(false);
    const [enrolledCoursesList,setEnrolledCourseList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getEnrolledCourses = async() => {
        setLoading(true);
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
        console.log("Enrolled List",enrolledCoursesList);
    },[]);

  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] bg-richblack-900'>
        {
            loading ? 
            (<div className='w-full h-full flex justify-center items-center'>
                <div className='text-[45px] font-semibold text-richblack-5'>Loading...</div>
            </div>) : 
            (
                <div className='px-[2rem] flex flex-col gap-[1.5rem] py-[1rem]'>
                    <h1 className='font-semibold lg:text-[36px] md:text-[32px] text-[26px] text-richblack-5 font-edu-sa'>Enrolled Courses</h1>
                    {
                        enrolledCoursesList.length === 0 ? (<div className='font-medium text-[26px] text-richblack-5 mt-[4rem]'>You are Not Enrolled in any Courses...</div>) : 
                            (
                                    <Table className="w-[full] font-inter flex gap-[1rem] flex-col rounded-xl overflow-hidden border-[2px] border-richblack-800">
                                        <Thead className="w-full md:bg-richblack-700 md:px-[1rem] md:py-[0.5rem]">
                                            <Tr className="w-full flex flex-row justify-between items-center">
                                                <Th className="text-richblack-50 font-medium md:text-[18px] md:w-[45%] text-[14px] leading-[22px]">Course Name</Th>
                                                <Th className="text-richblack-50 font-medium md:text-[18px] text-[14px]">Duration</Th>
                                                <Th className="text-richblack-50 font-medium md:text-[18px] text-[14px]">Progress</Th>
                                            </Tr>
                                        </Thead>
                                        
                                        <Tbody className="w-full flex flex-col gap-[1.25rem] px-[1rem] py-[0.5rem]">
                                            {
                                                enrolledCoursesList.map((course,index) => {
                                                    return (
                                                        <Tr onClick={() => navigate(`/viewCourse/${course._id}/section/${course?.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`)} className="w-full gap-[0.5rem] cursor-pointer flex flex-row justify-between items-center" key={index}>
                                                            <Td className="flex justify-start items-center md:w-[45%] gap-[1rem]">
                                                                <img src={course?.thumbnail} className='md:w-[50px] md:h-[50px] w-full rounded-lg object-cover' alt='thumbnail' />
                                                                <div className='flex flex-col h-full justify-between items-start'>
                                                                    <div className='md:text-[18px] text-[16px] text-richblack-5 font-medium'>{course.courseName}</div>
                                                                    <div className='md:text-[16px] text-[14px] text-richblack-300'>{course.courseDescription.slice(0,50)}...</div>
                                                                </div>
                                                            </Td>
                                                            <Td className="text-richblack-50 text-center flex justify-center md:text-[18px] text-[14px] items-center">
                                                                2h 30min
                                                            </Td>
                                                            <Td className="text-richblack-100 flex flex-col gap-[0.5rem] md:text-[18px] text-[14px]">
                                                                <p className='text-richblack-50 text-[14px]'>Progress: {65 || 0}%</p>
                                                                <ProgressBar
                                                                    completed={65}
                                                                    height='10px'
                                                                    bgColor='#47A5C5'
                                                                    baseBgColor='#2C333F'
                                                                    isLabelVisible={false}

                                                                />
                                                            </Td>
                                                        </Tr>
                                                    )
                                                })
                                            }
                                        </Tbody>
                                    </Table>
                            )
                    }
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses