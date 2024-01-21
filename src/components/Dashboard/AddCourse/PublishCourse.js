import React, { useEffect } from 'react'
import Button from '../../HomePage/Button'
import { FaAngleLeft } from "react-icons/fa";
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourse , setEditCourse , resetCourseState, setStage } from '../../../reducer/slices/courseSlice';
import { changeCourseStatus } from '../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {

    const {getValues,setValue,register} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        if(course?.status == "Published"){
            setValue("check",true);
        }
    },[]);


    const handleCoursePublish = async() => {
        const values = getValues();
        if((course?.status==='Published' && values.check===true) || (course?.status==='Draft' && values.check===false)){
            dispatch(resetCourseState());
            navigate("/dashboard/myCourses");
            return;
        }else{
            const formData = new FormData();
            formData.append("publishCourse",values.check);
            formData.append("courseId",course._id);
            const result = await dispatch(changeCourseStatus(formData,token));
            if(result){
                dispatch(resetCourseState());
                navigate("/dashboard/myCourses");
            }
        }
    }

    const goBack = () => {
        dispatch(setStage(2));
    }

  return (
    <div className='w-full flex flex-col gap-[2rem]'>
        <div className='w-full px-[1rem] py-[1rem] rounded-lg bg-richblack-800 flex flex-col gap-[1rem] my-[1rem]'>
            <p>Publish Settings</p>
            <div className='flex gap-[1rem] justify-start items-center'>
                <input id='check' type='checkbox' className="border-richblack-500 h-4 w-4 rounded" {...register("check",{required:true})} />
                <label htmlFor='check' className='text-[16px] text-richblack-500 font-semibold tracking-wide'>Make this Course Public</label>
            </div>
        </div>
        <div className='w-full flex items-center justify-between'>
            <div onClick={goBack}>
                <Button active={false}>
                    <FaAngleLeft />
                    <p>Back</p>
                </Button>
            </div>
            <div onClick={handleCoursePublish}>
                <Button active={true}>Save Changes & Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default PublishCourse