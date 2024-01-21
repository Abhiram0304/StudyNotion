import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import VideoSidebar from './VideoSidebar';
import { getFullDetailsOfCourse } from '../../services/operations/courseDetailsAPI';
import { setCourseSectionData, setCompleteLectures, setCourseDetails, setTotalNoOfLectures } from '../../reducer/slices/courseDetailsSlice';

const ViewCourse = () => {
    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    const fetchData = async () => {
      const response = await dispatch(getFullDetailsOfCourse(courseId,token));
      await dispatch(setCourseSectionData(response?.courseDetails?.courseContent));
      await dispatch(setCourseDetails(response?.courseDetails));
      await dispatch(setCompleteLectures(response?.completedVideos));
      await dispatch(setTotalNoOfLectures(response?.totalLectures));
    }

    useEffect(() => {
      fetchData();
    },[]);

  return (
    <div className='w-[100vw] bg-richblack-900 min-h-[100vh] flex'>
      <VideoSidebar />
      <Outlet />
    </div>
  )
}

export default ViewCourse