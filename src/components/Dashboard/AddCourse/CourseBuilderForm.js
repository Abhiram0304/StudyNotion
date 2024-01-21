import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CiCirclePlus } from "react-icons/ci";
import {setCourse,setEditCourse,setStage} from '../../../reducer/slices/courseSlice';
import {createSection,updateSection,deleteSection} from '../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';
import { MdNavigateBefore,MdNavigateNext } from 'react-icons/md';
import Button from '../../HomePage/Button';

const CourseBuilderForm = () => {

	const {course} = useSelector((state) => state.course);
	const {token} = useSelector((state) => state.auth);
	const [loading,setLoading] = useState(false);

	const dispatch = useDispatch();
	
	const {register,setValue,handleSubmit,formState: {errors}} = useForm();

	const submitHandler = async(data) => {
		setLoading(true);
		
		const result=  await dispatch(createSection(data,course,token));
		// result = await dispatch(updateSection(data,course,token));

		if(result){
			await dispatch(setCourse(result));
			setValue("sectionName","");
		}
		setLoading(false);
	}

	const goBackHandler = async() => {
		dispatch(setStage(1));
	}

	const goNextHandler = async() => {
		dispatch(setStage(3));
		dispatch(setEditCourse(true));
	}

  return (
    <div className='w-full rounded-lg flex flex-col justify-center items-center gap-[2rem]'>
		<div className='px-[2rem] py-[1rem] rounded-lg flex flex-col justify-start items-start gap-[1rem] w-full bg-richblack-800 '>
			<h1 className='font-semibold text-[1.5rem] text-richblack-5 text-left'>Course Builder</h1>
			<NestedView />
			<form className='w-full flex flex-col justify-center gap-[1.5rem] items-start'>
				<label className='w-full flex flex-col gap-[2px]'>
					<input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='text' name='sectionName' placeholder='Add a section to build your course' {...register("sectionName",{required:true})} />
					{
						errors.sectionName && (
							<span className='mt-1 text-[12px] text-[red]'>
								Please Enter The Section Name
							</span>
						)
					}
				</label>
				<div onClick={handleSubmit(submitHandler)} className='px-[1.5rem] py-[0.75rem] border-[2px] text-yellow-50 border-yellow-50 rounded-md bg-transparent text-[16px] font-medium flex justify-center items-center gap-[1rem] hover:scale-105 transition-all duration-200 cursor-pointer'>
					<CiCirclePlus />
					<p>Create Section</p>
				</div>
			</form>
		</div>
		<div className='w-full flex gap-[1rem] justify-end items-center'>
			<div onClick={goBackHandler}>
				<Button active={false}>
						<MdNavigateBefore />
						<p>Back</p>
				</Button>
			</div>
			<div onClick={goNextHandler}>
				<Button active={true}>
						<p>Next</p>
						<MdNavigateNext />
				</Button>
			</div>
		</div>
    </div>
  )
}

export default CourseBuilderForm