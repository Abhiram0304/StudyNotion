import React, { useEffect, useState } from 'react'
import { get, set, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import Upload from './Upload';
import InstructionField from './InstructionField';
import Button from '../../HomePage/Button';
import { MdNavigateNext } from "react-icons/md";
import { addCourseDetails } from '../../../services/operations/courseDetailsAPI';
import { categories } from '../../../services/APIs';
import { setStage,setCourse } from '../../../reducer/slices/courseSlice';

const CourseInfoForm = () => {

    const [courseCategories,setCourseCategories] = useState([]);
    const [tagsList,setTagsList] = useState([]);

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course,editCourse,stage} = useSelector((state) => state.course);

    const {register,handleSubmit,setValue,getValues,formState:{errors,isSubmitSuccessful}} = useForm();

    useEffect(() => {
        const getCategories = async() => {
            const coursesList = await dispatch(getAllCourses());
            if(coursesList.length > 0){
                setCourseCategories(coursesList);
            }
        }

        if(editCourse){
            setValue("courseName",course.courseName);
            setValue("courseDescription",course.courseDescription);
            setValue("instructor",course.instructor);
            setValue("whatYouWillLearn",course.whatYouWillLearn);
            setValue("courseContent",course.courseContent);
            setValue("ratingAndReviews",course.ratingAndReviews);
            setValue("price",course.price);
            setValue("thumbnail",course.thumbnail);
            setValue("category",course.category);
            setValue("courseTags",course.tags);
            setValue("studentsEnrolled",course.studentsEnrolled);
            setValue("instructions",course.instructions);
            setValue("status",course.status);
        }

        getCategories();
    },[]);

    useEffect(() => {
        if(editCourse){
            setTagsList(course?.tag);
        }
        register("tags",{required:true,validate:(value) => value.length>0});
    },[]);

    useEffect(() => {
        setValue("tags",tagsList);
    },[tagsList]);

    const handleTagEnter = (event) => {
        if(event.key==="Enter" || event.key===","){
            event.preventDefault();
            const tagValue = event.target.value.trim();
            if(tagValue && !tagsList.includes(tagValue)){
                const newTagList = [...tagsList,tagValue];
                setTagsList(newTagList);
                event.target.value = "";
            }
        }
    }

    const handleTagDelete = (tagIndex) => {
        const newTagList = tagsList.filter((_,index) => index!=tagIndex);
        setTagsList(newTagList);
    }

    const nextStepHandler = async(data) => {
        const formData = new FormData();
        formData.append("courseName", data.courseName);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.price);
        formData.append("tags", JSON.stringify(data.tags));
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
        formData.append("category", data.category);
        formData.append("status", "DRAFT");
        formData.append("instructions", JSON.stringify(data.instructions));
        formData.append("thumbnail", data.thumbnail);
        await dispatch(addCourseDetails(formData,token));
    }

  return (
    <div className='w-full flex flex-col gap-[2rem]'>
        <form className='w-full px-[1rem] py-[1rem] rounded-lg bg-richblack-800 flex flex-col gap-[1rem] my-[1rem]' >
            <label className='flex flex-col gap-[2px]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Course Name<p className='text-[red]'>*</p></p>
                <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='courseName' placeholder='Enter Course Name' {...register("courseName",{required:true})}/>
                {
                    errors.courseName && (
                        <span className='mt-1 text-[12px] text-[red]'>
                            Please Enter Your Course Name
                        </span>
                    )
                }
            </label>
            <label className='flex flex-col gap-[2px]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Course Short Description<p className='text-[red]'>*</p></p>
                <textarea rows={3} className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='courseDescription' placeholder='Course Description' {...register("courseDescription",{required:true})} />
                {
                    errors.courseDescription && (
                        <span className='mt-1 text-[12px] text-[red]'>
                            Please Enter Your Course Description
                        </span>
                    )
                    }
            </label>
            <label className='flex flex-col gap-[2px]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Price<p className='text-[red]'>*</p></p>
                <div className='relative w-full bg-richblack-800 '>
                    <input className='w-full bg-richblack-700 pl-[2rem] border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='price' placeholder='Enter Price' {...register("price",{required:true,valueAsNumber:true})} />
                    {
                        errors.price && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter Course Price
                            </span>
                        )
                    }
                    <div className='absolute left-2 top-1/4 scale-125'><HiOutlineCurrencyRupee /></div>
                </div>
            </label>
            
            <label className='flex flex-col gap-[2px]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Course Category</p>
                <select {...register("category",{required:true})} className='w-full px-2 py-1 bg-richblack-700 border-b-[2px] text-[14px] border-richblack-400 text-richblack-200 rounded-md' type='text' name='category' placeholder='select category'>
                    {
                        courseCategories.map((courseCat,index) => {
                            return (
                                <option className='px-[0.5rem] py-[0.5rem]' key={index} value={courseCat?._id}>{courseCat?.name}</option>
                            )
                        })
                    }
                </select>
                {
                    errors.category && (
                        <span className='mt-1 text-[12px] text-[red]'>
                            Please Select a Category
                        </span>
                    )
                }
            </label> 

            <label className='flex flex-col gap-[0.5rem]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Tags</p>
                <div className='w-full flex flex-wrap gap-[0.5rem] items-center justify-start'>
                        {
                            tagsList.map((tag,index) => (
                                <div key={index} className='px-[0.5rem] py-[0.2rem] rounded-xl flex gap-[0.5rem] bg-yellow-50 text-black font-semibold text-[14px] hover:scale-105 transition-all duration-200 cursor-pointer'>
                                    <div className="">{tag}</div>
                                    <div className="text-[0.75rem]" onClick={() => handleTagDelete(index)}><ImCross /></div>
                                </div>
                            ))
                        }
                </div>
                <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' id='tags' name='tags' placeholder='Enter a Tag and Press Enter' onKeyDown={handleTagEnter} />
            </label>

            <Upload
                name={"thumbnail"}
                label={"Course Thumbnail"}
                setValue={setValue}
                register={register}
                video={false}
                errors={errors}
             />   

            <label className='flex flex-col gap-[2px]'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Benefits of the Course<p className='text-[red]'>*</p></p>
                <textarea rows={3} className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='whatYouWillLearn' placeholder='Enter the Benefits of the Course' {...register("whatYouWillLearn",{required:true})} />
                {
                    errors.whatYouWillLearn && (
                        <span className='mt-1 text-[12px] text-[red]'>
                            Please Enter The Benefits of the Course
                        </span>
                    )
                }
            </label>

            <InstructionField
                name={"instructions"}
                label={"Requirements/Instructions"}
                errors={errors}
                register={register}
                setValue={setValue}
                placeholder={"Enter the Instructions/Requirements"}
            />      
        </form>
        <div className='w-full flex justify-end items-center' onClick={handleSubmit(nextStepHandler)}>
            <Button active={true}>
                <p>Next</p>
                <MdNavigateNext />
            </Button>
        </div>
    </div>
  )
}

export default CourseInfoForm