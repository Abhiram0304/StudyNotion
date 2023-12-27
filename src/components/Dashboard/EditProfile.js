import React from 'react'
import Button from '../HomePage/Button';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import countryCode from '../../data/countrycode.json';
import { useNavigate } from 'react-router-dom';
import {updateProfile} from '../../services/operations/settingsAPI';
import { setUser } from '../../reducer/slices/profileSlice';

const EditProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);

    const {register,handleSubmit,reset,formState:{errors}} = useForm();

    useEffect(() => {
            reset({
                firstName:user?.firstName,
                lastName:user?.lastName,
                gender:user?.additionalDetails?.gender,
                dateOfBirth:user?.additionalDetails?.dateOfBirth,
                countryCode:user?.additionalDetails?.countryCode,
                phoneNumber:user?.additionalDetails?.phoneNumber,
                about:user?.additionalDetails?.about,
            })
    },[user,reset]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitUpdateProfileHandler = async(data) => {
        dispatch(updateProfile(data,token,navigate));
    }

    function cancelHandler(e){
        e.preventDefault();
        navigate('/dashboard/myProfile');
    }

  return (
    <form className='flex w-full flex-col gap-[1rem]'>
                    <h2 className='text-richblack-5 font-medium text-[20px]'>Profile Information</h2>
                    <div className='w-full flex flex-col gap-[1rem]'>
                        <div className='w-full'>
                            <div className='flex md:flex-row flex-col w-full justify-center items-center md:gap-[2rem] gap-[1rem]'>
                                <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>First Name</p>
                                    <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' placeholder='Enter first Name' name='firstName' defaultValue={user?.firstName} {...register("firstName",{required:true})}/>
                                    {
                                        errors.firstName && (
                                            <span className='mt-1 text-[12px] text-[red]'>
                                                Please Enter Your First Name
                                            </span>
                                        )
                                    }
                                </label>
                                <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Last Name</p>
                                    <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' placeholder='Enter last Name' name='lastName' defaultValue={user?.lastName} {...register("lastName",{required:true})}/>
                                    {
                                        errors.lastName && (
                                            <span className='mt-1 text-[12px] text-[red]'>
                                                Please Enter Your Last Name
                                            </span>
                                        )
                                    }
                                </label>
                            </div>
                        </div>
                        <div className='w-full flex md:flex-row flex-col items-center md:gap-[2rem] gap-[1rem] justify-center'>
                            <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Date of Birth</p>
                                <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='date' name='dateOfBith' placeholder='YYYY-MM-DD' defaultValue={user?.additionalDetails?.dateOfBirth} {...register("dateOfBirth", {  required:false, max:{value: new Date().toISOString().split("T")[0]}})}/>
                            </label>
                            <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Gender</p>
                                <div className='w-full flex justify-between bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2'>
                                    <div className='flex gap-[8px]'>
                                        <input type='radio' id='male' name='gender' defaultChecked={user?.additionalDetails?.gender === "M"} value="M" {...register("gender",{required:false})} />
                                        <label htmlFor='male'>M</label>
                                    </div>
                                    <div>
                                        <input type='radio' id='female' name='gender' defaultChecked={user?.additionalDetails?.gender === "F"} value="F" {...register("gender",{required:false})} />
                                        <label htmlFor='female'>F</label>
                                    </div>
                                    <div>
                                        <input type='radio' id='null' name='gender' defaultChecked={!user?.additionalDetails?.gender === "-"} value="-" {...register("gender",{required:false})} />
                                        <label htmlFor='null'>Prefer not say</label>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className='flex md:flex-row flex-col items-center md:gap-[2rem] gap-[1rem] justify-center'>
                            <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Phone Number</p>
                                <div className='w-full flex justify-between gap-[8px] items-center flex-row'>
                                    <select name='dropDown' {...register("countryCode",{required:true})} className='w-[25%] bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-2 px-2' >
                                        {
                                            countryCode.map((element,index) => {
                                                return (
                                                    <option key={index} value={element.code}>{element.code} - {element.country}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input className='w-[70%] bg-richblack-700 border-b-[2px] text-[16px] border-richblack-200 text-richblack-200 rounded-md py-1 px-2' type='text' name='phoneNumber' placeholder='12345 67890' defaultValue={user?.additionalDetails?.contactNumber} 
                                        {...register("phoneNumber",
                                            {
                                                required:{value:false},
                                                maxLength:{value:10,message:"Invalid Phone Number"},
                                                minLength:{value:10,message:"Invalid Phone Number"}
                                            })} 
                                        />
                                    {
                                        errors.phoneNumber && (
                                            <span className='-mt-1 text-[12px] text-[red]'>
                                                {errors.phoneNumber.message}
                                            </span>
                                        )
                                    }
                                </div>
                            </label>
                            <label className='flex md:w-[45%] w-[90%] relative flex-col gap-[2px]'>
                                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>About</p>
                                <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='about' placeholder='Enter bio Details' defaultValue={user?.additionalDetails?.about} {...register("about",{required:false,"maxLength":{value:100,message:"Max limit 100 characters"}})}/>
                                {
                                    errors.about && (
                                        <span className='mt-1 text-[12px] text-[red]'>
                                            {errors.about.message}
                                        </span>
                                    )
                                }
                            </label>
                        </div>
                    </div>

                    <div className='flex justify-end gap-[1rem] px-[1.5rem] py-[1rem] mt-[-1rem] mb-[1rem rounded-xl'>
                        <div onClick={cancelHandler}><Button active={false}>Cancel</Button></div>
                        <div onClick={handleSubmit(submitUpdateProfileHandler)}><Button active={true}>Save</Button></div>
                    </div>
                </form>
  )
}

export default EditProfile