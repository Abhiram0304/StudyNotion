import React from 'react'
import { useSelector } from 'react-redux'
import EditBtn from './EditBtn'

const MyProfile = () => {

    const {user} = useSelector((state) => (state.profile));

  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] w-[100%] bg-richblack-900'>
        <div className='md:px-[5rem] px-[0.5rem] md:py-[5rem] py-[2rem] flex flex-col gap-[1.5rem] md:w-3/4 w-[100%] mx-auto'>

            <h1 className='text-richblack-5 font-edu-sa font-semibold text-[36px] mb-[10px]'>My Profile</h1>

            <div className='flex justify-between items-center px-[1.5rem] py-[1.5rem] bg-richblack-800 rounded-xl'>
                <div className='flex gap-[1rem]'>
                    <div className='md:w-[80px] md:h-[80px] w-[40px] h-[40px] rounded-full flex justify-center items-center'><img src={`${user?.image}`} width={"100%"} className='rounded-full' alt='userImage' /></div>
                    <div className='flex flex-col items-start justify-evenly'>
                        <h2 className='text-richblack-5 font-semibold text-[18px]'>{user?.firstName + " " + user?.lastName}</h2>
                        <p className='text-richblack-300 text-[14px]'>{user?.email}</p>
                    </div>
                </div>
                <EditBtn />
            </div>

            <div className='flex flex-col gap-[0.5rem] px-[1.5rem] py-[1.5rem] bg-richblack-800 rounded-xl'>
                <div className='flex justify-between items-center gap-[1rem]'>
                    <h2 className='text-richblack-5 font-semibold tracking-wider text-[18px]'>About</h2>
                    <EditBtn />
                </div>
                <p className='text-richblack-300 text-[14px]'>{user?.additionalDetails?.about ? (user?.additionalDetails?.about) : ("Write Something About Yourself")}</p>
            </div>

            <div className='flex flex-col gap-[0.5rem] px-[1.5rem] py-[1.5rem] bg-richblack-800 rounded-xl'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-richblack-5 font-semibold tracking-wider text-[18px]'>Personal Details</h2>
                    <EditBtn />
                </div>
                <div className='flex flex-col gap-[1rem] mt-[2rem]'>
                    <div className='flex justify-start gap-[2rem]'>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>First Name</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.firstName}</p>
                        </div>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>Last Name</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.lastName}</p>
                        </div>
                    </div>
                    <div className='flex justify-start gap-[2rem]'>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>Email</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.email}</p>
                        </div>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>Phone Number</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.additionalDetails?.contactNumber ? (user?.additionalDetails?.contactNumber) : ("Add Contact Number")}</p>
                        </div>
                    </div>
                    <div className='flex justify-start gap-[2rem]'>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>Gender</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.additionalDetails?.gender ? (user?.additionalDetails?.gender) : ("Add Gender")}</p>
                        </div>
                        <div className='w-[40%]'>
                            <h2 className='text-richblack-300 font-medium text-[14px]'>Date Of Birth</h2>
                            <p className='text-richblack-5 font-medium text-[14px]'>{user?.additionalDetails?.dateOfBirth ? (user?.additionalDetails?.dateOfBirth) : ("Add Your DOB")}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default MyProfile