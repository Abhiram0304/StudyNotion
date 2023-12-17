import React from 'react'
import { useSelector } from 'react-redux'
import AllCourses from './AllCourses'
import TotalAmount from './TotalAmount'

const Cart = () => {

    const {totalPrice,totalItems} = useSelector((state) => state.cart);

  return (
    <div className='min-h-[100vh] lg:w-[85%] md:w-[75%] bg-richblack-900 py-[1rem] px-[2rem]'>
        <div className='flex flex-col gap-[1rem]'>
            <h1>My Cart</h1>
            <div className='py-[0.5rem] px-[1rem] border-b-2 border-richblack-700 text-richblack-300 font-semibold'>{totalItems} Courses in Cart</div>
            {
                totalItems>0 ? 
                (
                    <div className='items-start flex gap-[1rem]'>
                        <AllCourses />
                        <TotalAmount />
                    </div>
                ): 
                (
                    <div>Your Cart is Empty.</div>
                )
            }
        </div>
    </div>
  )
}

export default Cart