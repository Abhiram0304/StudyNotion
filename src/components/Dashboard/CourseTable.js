import React, { useEffect, useState } from 'react'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { MdEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import DeleteModal from './AddCourse/DeleteModal';
import {deleteCourse, fetchCourseDetails, getFullDetailsOfCourse} from '../../services/operations/courseDetailsAPI'
import { DateFormat } from '../../utilities/DateFormat';
import { FaCheckCircle } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStage } from '../../reducer/slices/courseSlice';
import { useNavigate } from 'react-router-dom';

const CourseTable = ({courses,setCourses}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);

    const [deleteCourseModalData, setDeleteCourseModalData] = useState(null);
    const deleteCourseHandler = async(courseId) => {
        const courses = await dispatch(deleteCourse(courseId,token));
        setCourses(courses);
        setDeleteCourseModalData(null);
    }
    
    const editCourseHandler = async(courseId) => {
        const response = await fetchCourseDetails(courseId);
        response.instructions = JSON.parse(response.instructions[0]);
        response.tags = JSON.parse(response.tags);
        await dispatch(setCourse(response));
        await dispatch(setEditCourse(true));
        await dispatch(setStage(1));
        navigate('/dashboard/addCourse');
    }

  return (
        <>
            <Table className="w-[full] font-inter flex gap-[1rem] flex-col rounded-xl border-[2px] border-richblack-800 md:px-[1rem] py-[1rem]">
                <Thead className="w-full">
                    <Tr className="w-full flex flex-row justify-between items-center">
                        <Td className="text-richblack-100 text-left font-medium md:text-[18px] text-[14px] leading-[22px] md:w-[70%]">Courses</Td>
                        <Td className="text-richblack-100 font-medium md:text-[18px] text-[14px]">Duration</Td>
                        <Td className="text-richblack-100 font-medium md:text-[18px] text-[14px]">Price</Td>
                        <Td className="text-richblack-100 font-medium md:text-[18px] text-[14px]">Actions</Td>
                    </Tr>
                </Thead>
                <Tbody className="w-full flex flex-col gap-[1.25rem]">
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td>No Courses Found!</Td>
                            </Tr>
                        ) : (
                            courses.map((course,index) => (
                                <Tr className="w-full gap-[0.5rem] flex flex-row justify-between items-center" key={index}>
                                    <Td className="relative flex justify-start items-start md:w-[70%] gap-[1rem]">
                                        <img src={course?.thumbnail} loading='lazy' className='relative rounded-lg lg:w-[300px] w-[150px]' />
                                        <div className='flex flex-col gap-[0.5rem] py-[0.25rem] h-full justify-center items-start'>
                                            <div className='lg:text-[20px] text-[16px] text-richblack-5 font-semibold leading-[28px]'>{course?.courseName}</div>
                                            <div className='lg:text-[14px] text-[12px] lg:leading-[22px] leading-[14px] text-richblack-100'>{course?.courseDescription.length > 120 ? (course?.courseDescription.slice(0,120) + "...") : (course?.courseDescription) }</div>
                                            <div className='lg:text-[14px] text-[14px] text-richblack-5'>Created : {DateFormat(course?.createdAt)}</div>
                                            {
                                                course?.status=="Draft" ? 
                                                    (
                                                        <div className='px-[0.5rem] py-[0.125rem] text-[16px] rounded-[200px] bg-richblack-700 flex gap-[6px] items-center justify-center'>
                                                            <HiClock className='text-pink-50' />
                                                            <p className='text-pink-100 tracking-wide'>Drafted</p>
                                                        </div>
                                                    ) : 
                                                    (
                                                        <div className='px-[0.5rem] py-[0.125rem] text-[16px] rounded-[200px] bg-richblack-700 flex gap-[6px] items-center justify-center'>
                                                            <FaCheckCircle className='text-yellow-50' />
                                                            <p className='text-yellow-100 tracking-wide'>Published</p>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </Td>
                                    <Td className="text-richblack-100 flex text-center justify-center text-[16px] items-center">2h 30min</Td>
                                    <Td className="text-richblack-100 flex justify-center text-[16px] items-center">₹ {course?.price}</Td>
                                    <Td className="text-richblack-50 flex gap-[1rem] text-[22px] md:justify-center justify-center items-start md:items-center">
                                        <div className='flex items-center justify-center w-[30px] h-[30px] bg-richblack-700 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer' onClick={() => editCourseHandler(course._id)}><MdEdit /></div>
                                        <div 
                                            className='flex items-center justify-center w-[30px] h-[30px] bg-richblack-700 rounded-full hover:scale-105 transition-all duration-200 cursor-pointer' 
                                            onClick={() => setDeleteCourseModalData({
                                                heading : "Are you Sure?",
                                                subHeading : "This Course Will be would be deleted Permanently!",
                                                b1txt : "Delete",
                                                b2txt : "Cancel",
                                                b1Handler : () => deleteCourseHandler(course._id),
                                                b2Handler : () => setDeleteCourseModalData(null),
                                            })}><MdOutlineDelete /></div>
                                    </Td>
                                </Tr>
                            ))
                        ) 
                    }
                </Tbody>
            </Table>
            {
                deleteCourseModalData && <DeleteModal data={deleteCourseModalData} />
            }
        </>
  )
}

export default CourseTable