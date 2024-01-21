import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
import CourseInfoForm from './CourseInfoForm';
import CourseBuilderForm from './CourseBuilderForm';
import PublishCourse from './PublishCourse';

const RenderSteps = () => {

    const {stage} = useSelector((state) => state.course);

    const stages = [
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish",
        },
    ]

  return (
        <div className='w-full flex flex-col gap-[2rem] justify-center items-center'>
            <div className='w-full flex flex-row justify-center items-start'>
                {
                    stages.map((item) => 
                        (
                            <div key={item.id} className={`${item.id<3 ? "w-[40%]" : "w-[15%]"} flex flex-row justify-between items-start`}>
                                <div className='w-[130px] flex flex-col gap-[1rem] items-center justify-center'>
                                    {
                                        stage==item.id && <div className={`flex justify-center items-center w-[34px] h-[34px] border-[2px] rounded-full text-[18px] border-yellow-50 text-yellow-50 bg-yellow-900`}>{item.id}</div>
                                    }
                                    {
                                        stage>item.id && <div className={`flex justify-center items-center w-[34px] h-[34px] border-[2px] rounded-full text-[18px] border-yellow-50 text-richblack-900 bg-yellow-50`}><FaCheck /></div>
                                    }
                                    {
                                        stage<item.id && <div className={`flex justify-center items-center w-[34px] h-[34px] border-[2px] rounded-full text-[18px] border-richblack-500 text-richblack-500 bg-richblack-800`}>{item.id}</div>
                                    }
                                    <p className={`text-[14px] text-center ${stage==item.id ? "text-richblack-5 font-semibold" : "text-richblack-500 font-medium"} transition-all duration-200`}>{item.title}</p>
                                </div>
                                {
                                    item.id!=3 && <div className={`h-[17px] border-b-[2px] ${item.id<stage ? "border-yellow-50" : "border-richblack-700"} border-dashed w-[80%]`}></div>
                                }
                            </div>
                        )
                    )
                }
            </div>
            {stage==1 && <CourseInfoForm />}
            {stage==2 && <CourseBuilderForm />}
            {stage==3 && <PublishCourse />}
        </div>
  )
}

export default RenderSteps