import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import "video-react/dist/video-react.css"
import { BigPlayButton,Player } from 'video-react'
import { updateCompleteLectures } from '../../reducer/slices/courseDetailsSlice'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../HomePage/Button'
import toast from 'react-hot-toast'
import { markLectureAsCompleted } from '../../services/operations/courseDetailsAPI'

const VideoDetails = () => {

  const [subSectionData,setSubSectionData] = useState(null);
  const [videoEnded,setVideoEnded] = useState(false);
  const [thumbnailImage,setThumbnailImage] = useState(null);
  const {courseId,sectionId,subSectionId} = useParams();
  const playerRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const {completedLectures,courseDetails,courseSectionData} = useSelector((state) => state.courseDetails);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section?._id===sectionId);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection?._id===subSectionId);

    if(currentSectionIndex===0 && currentSubSectionIndex===0){
      return true;
    }
    return false;
  }

  const isLastVideo = () => {
    const numberOfSections = courseSectionData.length;
    const numberOfSubSectionsInLastSection = courseSectionData[numberOfSections-1].length;

    const currentSectionIndex = courseSectionData.findIndex((section) => section?._id===sectionId);

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((subSection) => subSection?._id===subSectionId);

    if(currentSectionIndex===numberOfSections-1 && currentSubSectionIndex===numberOfSubSectionsInLastSection-1){
      return true;
    }
    return false;
  }

  const goToNextVideo = async () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id===sectionId);
    const numberOfCurrentSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subSection) => subSection?._id===subSectionId);

    if(currentSubSectionIndex !== numberOfCurrentSubSections-1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex+1]._id;
      navigate(`/viewCourse/${courseDetails?._id}/section/${sectionId}/subSection/${nextSubSectionId}`);
    }else{
      const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`/viewCourse/${courseDetails?._id}/section/${nextSectionId}/subSection/${nextSubSectionId}`);
    }
  }

  const goToPrevVideo = async () => {
    const currentSectionIndex = courseSectionData.findIndex((section) => section._id===sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((subSection) => subSection?._id===subSectionId);

    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
      navigate(`/viewCourse/${courseDetails?._id}/section/${sectionId}/subSection/${prevSubSectionId}`);
    }else{
      const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
      const prevSubSectionId = courseSectionData[currentSectionIndex-1]?.subSection[courseSectionData[currentSectionIndex-1]?.subSection.length - 1]._id;
      navigate(`/viewCourse/${courseDetails?._id}/section/${prevSectionId}/subSection/${prevSubSectionId}`);
    }
  }

  const markAsCompleted = async () => {
    // await dispatch(markLectureAsComplete(sectionId,SubSectionId,token));
  }

  useEffect(() => {
    const fetchData = async () => {
      if(!courseSectionData.lenght == 0){
        return;
      }

      if(!courseId && !sectionId && !subSectionId){
        navigate('dashboard/enrolledCourses');
      }else{
        const currentSectionData = courseSectionData.filter((section) => section?._id===sectionId);
        const currentSubSectionData = currentSectionData?.[0]?.subSection?.filter((subSection) => subSection?._id==subSectionId);

        setSubSectionData(currentSubSectionData[0]);
        setThumbnailImage(currentSectionData?.thumbnail);
        setVideoEnded(false);
      }
    }
    fetchData();
  },[courseDetails,courseSectionData,location.pathname]);

  const handlerLectureCompletion = async () => {
    const toastId = toast.loading("Please Wait...");
    const response = await dispatch(markLectureAsCompleted({courseId,subSectionId,token}));
    console.log("Response :",response);
    if(response){
      await dispatch(updateCompleteLectures(subSectionId));
      toast.success("Marked As Completed");
    }
    toast.dismiss(toastId);
  }

  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      setVideoEnded(false);
    }
  };

  return (
    <div className={`lg:w-[75%] md:w-[60%] w-[95%] mx-auto flex flex-col gap-[2rem] py-[2rem] bg-richblack-900 min-h-[100vh]`}>
      <div className='lg:w-[60%] md:w-[80%] w-[100%] mx-auto md:px-[2rem] px-[0.5rem] border-b-[2px] md:mt-[0] mt-[6rem] rounded-md overflow-hidden'>
        {
          !subSectionData ? (
            <img src={thumbnailImage} alt='thumbnail' className='w-full object-cover' />
          ) : (
            <Player ref={playerRef} src={subSectionData?.videoUrl} className='w-[80%] border-[2px] rounded-xl overflow-hidden border-richblack-300 flex object-cover' onEnded={() => setVideoEnded(true)} aspectRatio='16:9' playsInline={true}>
              <BigPlayButton position='center' /> 
              {videoEnded && <div style={{background: 'rgba(10, 10, 10, 0.75)', backdropFilter: 'blur(3px)'}} className="full absolute inset-0 z-[10] grid h-full place-content-center font-inter">
                <div className='flex flex-col gap-[1rem]'>
                  {!completedLectures.includes(subSectionId) && <div onClick={() => handlerLectureCompletion()} className='mx-auto'><Button active={true}>Mark As Completed</Button></div>}
                  <div onClick={handleRewatch} className='mx-auto'><Button active={false}>Watch Again</Button></div>
                  <div className='flex gap-[2rem] justify-between items-center'>
                    {
                      !isFirstVideo() && (
                        <div onClick={goToPrevVideo}><Button>Prev</Button></div>
                      )
                    }
                    {
                      !isLastVideo() && (
                        <div onClick={goToNextVideo}><Button>Next</Button></div>
                      )
                    }
                  </div>
                </div>
              </div>}
            </Player>
          )
        }
      </div>
      <div className='w-full h-[3px] bg-richblack-700'></div>
      <div className='w-[90%] px-[2rem] flex flex-col gap-[1rem]'>
        <p className='text-[22px] font-semibold tracking-wide text-richblack-5'>{subSectionData?.title}</p>
        <p className='text-[16px] font-medium text-richblack-100'>{subSectionData?.description}</p>
      </div>
    </div>
  )
}

export default VideoDetails