import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'

const VideoSidebar = () => {

    const [activeStatus,setActiveStatus] = useState("");
    const [videoBarActive,setVideoBarActive] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {sectionId,subSectionId} = useParams();
    const {completedLectures,courseData,courseSectionData,totalNoOfLectures} = useSelector((state) => state.courseDetails);

    const findCurrentState = () => {
        if(courseSectionData.length == 0){
            return;
        }

        const currentSectionIndex = courseSectionData.findIndex((item) => item._id==sectionId);
        const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((item) => item._id===subSectionId);

        setActiveStatus(courseSectionData?.[currentSectionIndex]?.id);
        setVideoBarActive(currentSubSectionIndex);
    }

    useEffect(() => {

    })

  return (
    <div className='w-[20%] flex flex-col px-[1rem] py-[1rem] min-h-[100vh] bg-richblack-800 border-r-[2px] border-richblack-700'>
        <div className='flex flex-col gap-[1rem] justify-start items-center'>
            <p>Learn {}</p>
        </div>
    </div>
  )
}

export default VideoSidebar