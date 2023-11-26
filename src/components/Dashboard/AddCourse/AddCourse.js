import React from 'react'
import {BsLightningChargeFill} from 'react-icons/bs'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='w-[85%] min-h-[100vh] bg-richblack-900 flex'>
        <div>
            <div>
                <div className='font-semibold text-[32px] text-richblack-5 font-edu-sa'>Add Course</div>
                <div>
                    <RenderSteps />
                </div>
            </div>
            <div>
                <div className='flex gap-[1rem] items-center justify-start px-[1rem]'>
                    <BsLightningChargeFill />
                    <p>Course Upload Tips</p>
                </div>
                <div>
                    <ul className='flex flex-col gap-[0.5rem] text-[16px] text-richblack-5'>
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
    </div>
  )
}

export default AddCourse