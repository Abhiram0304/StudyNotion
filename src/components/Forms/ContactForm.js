import React, { useEffect, useState } from 'react'
import Button from '../HomePage/Button'
import countryCode from '../../data/countrycode.json'
import { useForm } from 'react-hook-form'
import {contactUsMail} from '../../services/operations/contactUsAPI'
import { useDispatch } from 'react-redux'

const ContactForm = () => {

    const dispatch = useDispatch();

    const {register,handleSubmit,reset,formState:{errors,isSubmitSuccessful}} = useForm();

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                phoneNumber:"",
                message:""
            })
        }
    },[isSubmitSuccessful,reset]);

    const submitContactForm = async (data) => {
        console.log(data);
        dispatch(contactUsMail(data));
    }

  return (
    <div className='w-full mt-[2rem]'>
        <form className='w-full flex flex-col gap-[1rem] my-[1rem]' >
            <div className='flex md:flex-row flex-col gap-[1rem] relative'>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>First Name</p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='firstName' placeholder='Enter first name' {...register("firstName",{required:true})}/>
                    {
                        errors.firstName && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter Your First Name
                            </span>
                        )
                    }
                </label>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Last Name</p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='text' name='lastName' placeholder='Enter last name' {...register("lastName")} />
                    {
                        errors.lastName && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter Your Last Name
                            </span>
                        )
                    }
                </label>
            </div>
            <div className='w-full relative'>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Email Address</p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' type='email' name='email' placeholder='Enter email address' {...register("email",{required:true})} />
                    {
                        errors.email && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter your Email
                            </span>
                        )
                    }
                </label>
            </div>
            <div className='w-full relative'>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Phone Number</p>
                    <div className='w-full flex flex-col gap-[10px]'>
                        <select name='dropDown' {...register("countryCode",{required:true})} className='w-[40%] bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-2 px-2' >
                            {
                                countryCode.map((element,index) => {
                                    return (
                                        <option key={index} value={element.code}>{element.code} - ({element.country})</option>
                                    )
                                })
                            }
                        </select>
                        <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-200 text-richblack-200 rounded-md py-1 px-2' type='number' name='phoneNumber' placeholder='12345 67890' 
                            {...register("phoneNumber",
                                {
                                    required:{value:true,message:"Please Enter your Phone Number"},
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
            </div>
            <div className='mb-[2rem] relative'>
                <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Message</p>
                <textarea  className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' name='message' type='message' placeholder='enter your message' rows={3} {...register("message",{required:true})} />
                {
                    errors.message && (
                        <span className='-mt-1 text-[12px] text-[red]'>
                            Please Enter your Message
                        </span>
                    )
                }
            </div>
            <button onClick={handleSubmit(submitContactForm)} type='submit'><Button active={true}>Send Message</Button></button>
        </form>
    </div>
  )
}

export default ContactForm