import React from 'react'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../HomePage/Button';
import { changePassword } from '../../services/operations/settingsAPI';
import { useDispatch, useSelector } from 'react-redux';

const SettingsChangePassword = () => {

    const [showPassword1,setShowPassword1] = useState(false);
    const [showPassword2,setShowPassword2] = useState(false);

    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}} = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                currentPassword:"",
                newPassword:"",
            })
        }
    },[isSubmitSuccessful,reset]);

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);

    const passwordChangeHandler = async (data) => {
        dispatch(changePassword(data,token));
    }

  return (
    <div className='flex flex-col gap-[1rem]'>
        <div className='flex flex-col gap-[1rem]'>
                    <h2 className='text-richblack-5 font-medium text-[20px]'>Change Password</h2>
                    <div className='flex w-full justify-center items-center gap-[2rem]'>
                        <form className='flex flex-col w-full gap-[1.5rem]'>
                            <div className='flex md:flex-row flex-col md:gap-[0] gap-[1rem] w-full justify-between items-center px-[1rem]'>
                                <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Current Password</p>
                                    <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type={showPassword1 ? ('text'): ('password') } name='currentPassword' placeholder='Enter current Password' {...register("currentPassword",{required:true})}/>
                                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword1((prev) => !prev)}>
                                        {
                                            showPassword1 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                                        }
                                    </span>
                                </label>
                                <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>New Password</p>
                                    <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type={showPassword2 ? ('text'): ('password') } name='newPassword' placeholder='Enter new Password' {...register("newPassword",{required:true})}/>
                                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword2((prev) => !prev)}>
                                        {
                                            showPassword2 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                                        }
                                    </span>
                                </label>
                            </div>
                            <div className='flex justify-end'>
                                <div onClick={handleSubmit(passwordChangeHandler)}><Button active={true}>Change Password</Button></div>
                            </div>
                        </form>
                    </div>
        </div>
        
    </div>
  )
}

export default SettingsChangePassword