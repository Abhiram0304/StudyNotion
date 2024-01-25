import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from "react-icons/io5";
import Button from '../../components/HomePage/Button';
import { FaChevronUp } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { ImCross } from 'react-icons/im';
import { HiMenuAlt2 } from "react-icons/hi";
import './videoSideBar.css';
import { getStudentCourseRatingAndReview } from '../../services/operations/courseDetailsAPI';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const VideoSidebar = ({setReviewModalOpen,setValue,setReviewEditMode}) => {

    const {token} = useSelector((state) => state.auth);

    const [activeStatus,setActiveStatus] = useState("");
    const [videoBarActive,setVideoBarActive] = useState("");
    const [menuOpen,setMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {sectionId,subSectionId} = useParams();
    const {completedLectures,courseData,courseSectionData,totalNoOfLectures} = useSelector((state) => state.courseDetails);
    console.log("Completed ectures :",completedLectures);
    const findCurrentState = () => {
        if(courseSectionData.length == 0){
            return;
        }

        const currentSectionIndex = courseSectionData.findIndex((item) => item._id==sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((item) => item._id===subSectionId);
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id;

        setActiveStatus(currentSectionIndex);
        setVideoBarActive(activeSubSectionId);
    }

    const handleReviewModal = async () => {
        const toastId = toast.loading("Please wait...");
        const response = await dispatch(getStudentCourseRatingAndReview(courseData._id,token));
        console.log("response",response);
        if(response){
            setValue("rating",response?.data?.rating);
            setValue("review",response?.data?.review);
            setReviewEditMode(true);
        }else{
            setValue("rating","");
            setValue("review","");
            setReviewEditMode(false);
        }
        toast.dismiss(toastId);
        setReviewModalOpen(true);
    }

    useEffect(() => {
        findCurrentState();
    },[courseData,courseSectionData,location.pathname]);

  return (
    <>
        <div onClick={() => setMenuOpen(true)} className='absolute mt-[1rem] ml-[1rem] text-[2rem] text-richblack-5'><HiMenuAlt2 /></div>
        <div className={`md:relative absolute lg:w-[25%] md:w-[40%] md:z-[0] z-[20] overflow-hidden ${menuOpen ? "w-[75%]" : "w-[0]"} transition-all duration-200 flex flex-col py-[1rem] min-h-[100vh] bg-richblack-800 border-r-[2px] border-richblack-700`}>
            <div className='w-full border-b-[2px] px-[1rem] flex flex-col gap-[1rem] border-richblack-600 pb-[1rem]'>
                <div className='flex justify-between items-center text-[32px] text-richblack-300 cursor-pointer'>
                    <IoArrowBackOutline onClick={() => navigate('/dashboard/enrolledCourses')} />
                    <div className='md:hidden flex' onClick={() => setMenuOpen(false)}><ImCross /></div>
                </div>
                <p className='text-[24px] text-richblack-5'>Learn {courseData?.courseName}</p>
                <div className='flex gap-[0.5rem] justify-start items-center'>
                    <p className='text-[20px] text-richblack-100 font-bold'>Progress : </p>
                    <p className='text-[20px] text-caribbeangreen-100 font-bold'>{completedLectures.length ? completedLectures.length : 0} / {totalNoOfLectures}</p>
                </div>
                <div className='w-full justify-center items-center' onClick={handleReviewModal}><Button active={true}>Submit Review</Button></div>
            </div>
            <div className='w-full flex flex-col my-[1rem]'>
                {
                    courseSectionData?.map((section,index) => (
                        <div key={index} className='w-full flex flex-col'>
                            <div onClick={() => setActiveStatus(index)} className='w-full cursor-pointer border-[1px] border-b-richblack-500 px-[1rem] py-[1rem] bg-richblack-700 flex justify-between items-center'>
                                <div className='text-[16px] text-richblack-5 tracking-wide'>{section?.sectionName}</div>
                                <div className='text-[16px] flex gap-[1rem] justify-center items-center text-richblack-25 tracking-wide'>
                                    <p>51min</p>
                                    {
                                        <FaChevronUp className={`${index===activeStatus ? ("rotate-0") : ("rotate-180")} transition-all duration-200`} />
                                    }
                                </div>
                            </div>
                            <div className={`transition-all duration-200 overflow-hidden flex-col`} style={{visibility: activeStatus === index ? 'visible' : 'hidden',maxHeight: activeStatus === index ? '1000px' : 0, paddingTop : activeStatus===index ? '1rem' : '0',paddingBottom : activeStatus===index ? '1rem' : '0'}}>
                                {
                                    section?.subSection.map((subSection, subIndex) => (
                                        <div onClick={() => {navigate(`/viewCourse/${courseData?._id}/section/${section?._id}/subSection/${subSection?._id}`); setVideoBarActive(subSection?._id); setMenuOpen(false)}} key={subIndex} className={`w-full cursor-pointer px-[1rem] flex text-[20px] py-[0.25rem] ${videoBarActive===subSection?._id ? ("bg-yellow-700 text-yellow-50 border-l-[3px] border-yellow-50") : ("bg-transparent border-0 hover:scale-105")} transition-all duration-300 gap-[1rem] justify-start items-center`}>
                                            <input
                                                checked={completedLectures?.includes(subSection?._id)}
                                                disabled={true}
                                                type='checkbox'
                                                size={90}
                                                className="w-6 h-6 appearance-none border-2 border-richblack-300 rounded-md cursor-not-allowed checked:bg-blue-500 checked:border-blue-600"
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                            <p className='text-richblack-25'>{subSection?.title}</p>
                                            <FaDisplay className='text-richblack-300' />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
        </div>
        </div>
    </>
  )
}

export default VideoSidebar