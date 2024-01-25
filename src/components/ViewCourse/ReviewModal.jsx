import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";
import Button from '../HomePage/Button';
import ReactStars from 'react-rating-stars-component';
import { TiStarFullOutline , TiStarHalfOutline , TiStarOutline } from "react-icons/ti";
import {useForm} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createAndEditRatingAndReview } from '../../services/operations/courseDetailsAPI';

const ReviewModal = ({courseId,reviewModalData,reviewEditMode,register,setReviewModalOpen,errors,getValues,setValue}) => {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const [stars,setStars] = useState(1);
    const modalStyles = {
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(3px)'
    };
    
    useEffect(() => {
        if(reviewEditMode){
            const value = getValues();
            setStars(value?.rating);
        }else{
            setStars(1);
            setValue("review","");
        }
    },[]);

    const ratingChangeHandler = (stars) => {
        setValue("rating",stars);
    }

    const submitReview = async () => {
        const values = getValues();
        // console.log("values : ",values);
        await dispatch(createAndEditRatingAndReview(courseId,values.rating,values.review,token));
        setReviewModalOpen(false);

    }
      
  return (
    <div className='absolute bg-richblack-100 top-0 left-0 w-[100vw] h-[100%] z-[30] flex justify-center items-center' style={modalStyles}>
        <div className='flex flex-col md:w-[600px] w-[95%] rounded-lg'>
            <div className='w-full py-[1rem] px-[1.5rem] bg-richblack-700 rounded-t-lg flex justify-between items-center'>
                <div className='text-richblack-5 text-[18px] font-medium'>Add Review</div>
                <ImCross onClick={() => setReviewModalOpen(false)} className='cursor-pointer text-richblack-5 text-[18px]' />
            </div>
            <div className='w-full py-[1.5rem] px-[1.5rem] bg-richblack-800 rounded-b-lg flex flex-col gap-[1.5rem]'>
                <div className='w-full flex gap-[1rem] justify-center items-center'>
                    <img src={reviewModalData?.image} loading='lazy' className='w-[52px] h-[52px] rounded-full' />
                    <div className='flex flex-col justify-between items-start'>
                        <p className='text-richblack-5 text-[16px]'>T Abhiram</p>
                        <p className='text-[14px] text-richblack-25'>Posting Publicly</p>
                    </div>
                </div>
                <form className='w-full flex gap-[1rem] flex-col'>
                    <div className='w-full flex justify-center items-center'>
                        <ReactStars onChange={ratingChangeHandler} value={stars} edit={true} emptyIcon={<TiStarOutline />} halfIcon={<TiStarHalfOutline />} filledIcon={<TiStarFullOutline />} count={5} size={32} activeColor={"#ffd700"} />
                    </div>
                    <label className='flex flex-col gap-[2px]'>
                        <div className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Add Your Experience<p className='text-[red]'>*</p></div>
                        <textarea rows={5} className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='review' placeholder='Share Details of your own experience for this course' {...register("review",{required:true})} />
                        {
                            errors.review && (
                                <span className='mt-1 text-[12px] text-[red]'>
                                    Please Enter Your Review
                                </span>
                            )
                        }
                    </label>
                </form>
                
                <div className='w-full flex justify-end items-end'>
                    <div className='flex justify-center items-center gap-[1rem]'>
                        <div onClick={() => setReviewModalOpen(false)} ><Button active={false}>Cancel</Button></div>
                        <div onClick={submitReview}><Button active={true}>{reviewEditMode ? "Edit Review" : "Save Review"}</Button></div>
                    </div>
                </div>
            </div>
        </div> 
        
    </div> 
  )
}

export default ReviewModal