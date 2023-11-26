import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/HomePage/Button'

const ResetPasswordSuccess = () => {
  return (
    <div className='w-full min-h-[100vh] font-inter bg-richblack-900 flex justify-center items-center'>
        <div className='text-richblack-900 flex flex-col gap-[0.5rem] justify-center lg:w-1/4 md:w-1/3 w-4/5'>
            <h1 className='text-richblack-5 text-[30px] font-semibold'>Reset complete!</h1>
            <p className='text-richblack-100 text-[16x] leading-[26px] mb-[15px]'>All done! We have successfully reset the password for your Account.</p>
            <Link to={'/login'}>
              <div>
                <Button linkedTo={'/login'} active={true}>
                  Return to login
                </Button>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default ResetPasswordSuccess