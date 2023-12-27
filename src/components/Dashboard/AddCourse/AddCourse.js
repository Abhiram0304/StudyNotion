import React from 'react'
import {BsLightningChargeFill} from 'react-icons/bs'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] mx-auto md:px-[2rem] py-[2rem] w-[100%] bg-richblack-900'>
        <div className='w-full text-left md:px-0 px-[1rem] font-semibold text-[32px] text-richblack-5 font-edu-sa'>Add Course</div>
        <div className='w-full flex lg:flex-row flex-col py-[1rem] gap-[2rem] justify-between items-start'>
            <div className='lg:w-[60%] w-[95%] mx-auto flex flex-col gap-[2rem] justify-start items-center'>
                <div className='w-full'>
                    <RenderSteps />
                </div>
            </div>
            <div className='lg:w-[40%] w-[95%] mx-auto px-[1rem] py-[1rem] rounded-lg bg-richblack-800 border-[2px] border-richblack-700 flex justify-start items-start flex-col gap-[1.5rem]'>
                <div className='flex text-[18px] font-semibold gap-[0.5rem] items-center justify-start'>
                    <div className='text-[gold]'><BsLightningChargeFill /></div>
                    <p>Course Upload Tips</p>
                </div>
                <ul className='flex flex-col px-[1rem] list-disc gap-[0.5rem] text-[16px] text-richblack-5'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create and organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </div>
)
}

export default AddCourse