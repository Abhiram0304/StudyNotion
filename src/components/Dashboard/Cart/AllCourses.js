import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateFormat } from '../../../utilities/DateFormat';
import { TbTrash } from "react-icons/tb";
import { removeFromCart } from '../../../reducer/slices/cartSlice';
import toast from 'react-hot-toast';

const AllCourses = () => {

  const {cartItems} = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log("CATR ITEMS  : ",cartItems);

  const removeFromCartHandler = async(courseId) => {
    await dispatch(removeFromCart(courseId));
  }

  return (
    <div className='lg:w-[70%] w-[95%] mx-auto flex flex-col gap-[1rem]'>
      {
        cartItems.map((cartItem,index) => (
          <div className={`w-full flex lg:flex-row flex-col justify-between items-center gap-[1rem] py-[1rem] ${index < cartItems.length-1 ? ("border-b-[2px] border-richblack-700") : ("border-0")}`} key={index}>
            <div className='flex lg:flex-row flex-col gap-[1rem]'>
              <img src={cartItem.thumbnail} className='lg:w-[250px] w-full rounded-lg' loading='lazy' />
              <div className='flex flex-col py-[0.5rem] justify-between items-start'>
                <h1 className='text-[18px] font-medium text-richblack-5'>{cartItem?.courseName}</h1>
                <p className='text-[16px] font-medium text-richblack-100'>Instructor : {cartItem?.instructor?.firstName} {cartItem?.instructor?.lastName}</p>
                <div className='text-[16px] text-richblack-5 font-medium'>Ratings and Count</div>
                <div className='text-[16px] font-medium text-richblack-100'>Created on : {DateFormat(cartItem?.createdAt)}</div>
              </div>
            </div>
            <div className='lg:w-auto w-full flex lg:flex-col flex-row lg:gap-[2rem] gap-[1rem] justify-between items-center'>
              <div className='text-[24px] text-yellow-50 font-semibold'>₹ {cartItem?.price}</div>
              <div onClick={() => removeFromCartHandler(cartItem._id)} className='text-pink-200 text-[16px] flex gap-[0.75rem] justify-center items-center border-[2px] bg-richblack-800 border-richblack-700 px-[0.5rem] py-[0.5rem] rounded-md cursor-pointer hover:scale-105 transition-all duration-200'>
                <TbTrash className='text-[20px]' />
                <p>Remove</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AllCourses