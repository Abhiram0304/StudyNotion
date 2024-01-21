import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../HomePage/Button';
import { useSelector } from 'react-redux';

const TotalAmount = () => {

    const {setValue, getValues, register} = useForm();
    const {totalPrice} = useSelector((state) => state.cart);

  return (
        <div className='lg:w-[30%] w-[95%] mx-auto px-[1rem] py-[1rem] rounded-lg flex flex-col font-inter justify-start items-start gap-[1rem] bg-richblack-900 border-[2px] border-richblack-700'>
            <h1 className='text-[18px] text-richblack-5 font-semibold tracking-wide'>Payment Summary</h1>
            <p className='text-[14px] text-richblack-100'>Complete your purchase of courses successFully to explore these Courses at your comform.</p>
            <div className='flex justify-between items-end gap-[1rem]'>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-5 flex gap-1 items-center text-[16px] tracking-wide'>Coupon Code</p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-1' type='text' name='couponCode' placeholder='Enter a Coupon Code' {...register("couponCode")} />
                </label>
                <Button active={false}>Apply</Button>
            </div>
            <div className='w-full h-[2px] bg-richblack-700'></div>
            <div className='flex w-full justify-between items-center'>
                <p className='text-[16px] text-richblack-5 font-medium tracking-wide'>Total : </p>
                <div className='text-[16px] font-medium text-richblack-5'>Rs {totalPrice}/-</div>
            </div>
            <div className='w-full justify-start items-stretch'><Button active={true}>Proceed to Payment</Button></div>
        </div>
  )
}

export default TotalAmount