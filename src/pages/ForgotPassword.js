import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/HomePage/Button'
import { Link, useNavigate } from 'react-router-dom'
import {getPasswordResetToken} from '../services/operations/authAPI'
import {BsArrowLeft} from 'react-icons/bs'

const ForgotPassword = () => {

    const {loading} = useSelector((state) => state.auth);
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function submitHandler(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

    

  return (
    <div className='bg-richblack-900 flex items-center justify-center w-full min-h-[100vh] font-inter'>
        {
            loading ?
            (
                <div className='text-richblack-5 text-[36px] font-semibold'>Loading...</div>
            ) 
            : 
            ( 
                <div className='text-richblack-900 flex flex-col gap-[1rem] justify-center lg:w-1/4 md:w-1/3 w-4/5'>
                    <h1 className='text-richblack-5 text-[30px] font-semibold'>{!emailSent ? "Reset Your Password" : "Check Your Email"}</h1>
                    <p className='text-richblack-100 text-[18px] leading-[26px]'>{!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`}</p>
                    <form className='w-full flex flex-col my-[1rem]'>
                        {
                            !emailSent && (
                                <label className='flex flex-col gap-[10px]'>
                                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Email Address</p>
                                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' />
                                </label>
                            )
                            
                        }
                    </form>

                    <button onClick={submitHandler}>
                            <Button active={true}>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                            </Button>
                    </button>
                    <div className='text-richblack-5 text-[16px] font-medium mt-[8px]'>
                        <Link to={'/login'}>
                            <div className='flex gap-[8px] items-center'>
                                <BsArrowLeft />
                                Back To Login
                            </div>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword