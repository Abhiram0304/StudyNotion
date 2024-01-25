import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import VideoSidebar from './VideoSidebar';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';
import { setCourseSectionData, setCompleteLectures, setCourseDetails, setTotalNoOfLectures } from '../../reducer/slices/courseDetailsSlice';
import ReviewModal from './ReviewModal';
import './viewCourse.css';
import {useForm} from 'react-hook-form';

const ViewCourse = () => {
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    
    const [loading,setLoading] = useState(false);
    const [reviewModalData,setReviewModalData] = useState(null);
    const [reviewModalOpen,setReviewModalOpen] = useState(false);
    const [reviewEditMode,setReviewEditMode] = useState(false);

    const {getValues,setValue,register,formState:{errors}} = useForm();

    const dispatch = useDispatch();

    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getFullDetailsOfCourse(courseId,token));
      setReviewModalData({
        image : response?.courseDetails?.instructor?.image,
      });
      await dispatch(setCourseSectionData(response?.courseDetails?.courseContent));
      await dispatch(setCourseDetails(response?.courseDetails));
      await dispatch(setCompleteLectures(response?.completedVideos));
      await dispatch(setTotalNoOfLectures(response?.totalLectures));
      setLoading(false);
    }

    useEffect(() => {
      fetchData();
    },[]);

    if(loading){
      return (
        <div className='w-[100vw] h-[100vh] bg-richblack-900 flex justify-center items-center'>
          <div className='spinner'></div>
        </div>
      )
    }

  return (
    <div className='relative w-[100vw] bg-richblack-900 min-h-[100vh] flex'>
      <VideoSidebar setReviewEditMode={setReviewEditMode} setValue={setValue} setReviewModalOpen={setReviewModalOpen} />
      <Outlet />
      {
        reviewModalOpen && <ReviewModal courseId={courseId} reviewEditMode={reviewEditMode} register={register} setValue={setValue} getValues={getValues} errors={errors} reviewModalData={reviewModalData} setReviewModalOpen={setReviewModalOpen} />
      }
    </div>
  )
}

export default ViewCourse