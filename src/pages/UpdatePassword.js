import React from 'react'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { useState } from 'react'
import Button from '../components/HomePage/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import toast from 'react-hot-toast'

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData,setFormData] = useState({
        confirmPassword:'',confirmNewPassword:""
    })

    function changeHandler(event){
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name] : event.target.value 
            }
        ))
    }

    const [showPassword1,setShowPassword1] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);

    function submitHandler(e){
        if(formData.confirmNewPassword === formData.confirmPassword){
            e.preventDefault();
            const token = location.pathname.split('/').at(-1);
            dispatch(resetPassword(formData.confirmPassword,formData.confirmNewPassword,token,navigate));
        }
        else{
            toast.error("Passwords Don't Match");
            return;
        }
    }

  return (
    <div className='w-full min-h-[100vh] bg-richblack-900 flex justify-center items-center'>
        <div className='text-richblack-900 flex flex-col gap-[0.5rem] justify-center lg:w-1/4 md:w-1/3 w-4/5'>
            <h1 className='text-richblack-5 text-[30px] font-semibold'>Choose New Password</h1>
            <p className='text-richblack-100 text-[18px] leading-[26px]'>Almost done. Enter your new password and you're all set.</p>
            <form className='w-full flex flex-col mt-[0.5rem] gap-[1rem]'>
                <label className='flex flex-col relative gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Create Password<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type={showPassword1 ? ('text'): ('password') } name='confirmPassword' placeholder='Enter Password' value={formData.confirmPassword} onChange={changeHandler} />
                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword1((prev) => !prev)}>
                        {
                            showPassword1 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                        }
                    </span>
                </label>

                <label className='flex flex-col relative gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Confirm Password<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type={showPassword2 ? ('text'): ('password') } name='confirmNewPassword' placeholder='Confirm Password' value={formData.confirmNewPassword} onChange={changeHandler} />
                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword2((prev) => !prev)}>
                        {
                            showPassword2 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                        }
                    </span>
                </label>

                <button onClick={submitHandler}><Button active={true}>Reset Password</Button></button>

                <div className='text-richblack-5 text-[16px] font-medium mt-[8px]'>
                    <Link to={'/login'}>
                        <div className='flex gap-[8px] items-center'>
                            <BsArrowLeft />
                            Back To Login
                        </div>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdatePassword