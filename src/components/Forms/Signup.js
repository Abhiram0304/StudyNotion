import React, { useState } from 'react'
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Button from '../HomePage/Button';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../reducer/slices/authSlice';
import { sendOTP } from '../../services/operations/authAPI';

const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType,setAccountType] = useState("Student");
    const [formData,setFormData] = useState({
        firstName:'',lastName:'',email:'',createPassword:'',confirmPassword:''
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

    const {firstName,lastName,email,createPassword,confirmPassword} = formData;

    function submitHandler(event){
        event.preventDefault();
        if(createPassword === confirmPassword){
            const signupData = {
                ...formData,accountType
            }

            console.log(signupData);

            dispatch(setSignupData(signupData));
            dispatch(sendOTP(email,navigate));

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                createPassword:"",
                confirmPassword: "",
            })
            setAccountType("Student")
        }
        else{
            toast.error("Passwords Don't Match!");
            return;
        }
    }

  return (
    <div className='w-full justify-center flex flex-col'>
        <div className='flex bg-richblack-800 p-1 gap-x-1 lg:my-0 my-[1rem] rounded-full max-w-max lg:mb-2 transition-all duration-200'>
            <button onClick={() => setAccountType("Student")} className={`${accountType === "Student" ? ("bg-richblack-900 text-richblack-5") : ("bg-transparent text-richblack-200")} py-2 px-5 rounded-full transition-all duration-200`}>Student</button>
            <button onClick={() => setAccountType("Instructor")} className={`${accountType === "Instructor" ? ("bg-richblack-900 text-richblack-5") : ("bg-transparent text-richblack-200")} py-2 px-5 rounded-full transition-all duration-200`}>Instructor</button>
        </div>

        <form className='w-full flex flex-col gap-[1rem]'>

            <div className='flex gap-[1rem]'>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>First Name<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type='text' name='firstName' placeholder='Enter First Name' value={formData.firstName} onChange={changeHandler} />
                </label>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Last Name<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type='text' name='lastName' placeholder='Enter Last Name' value={formData.lastName} onChange={changeHandler} />
                </label>
            </div>

            <div>
                <label className='flex flex-col gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Email Address<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type='email' name='email' placeholder='Enter Email Address' value={formData.email} onChange={changeHandler} />
                </label>
            </div>

            <div className='flex gap-[1rem] mb-[2rem]'>
                <label className='flex flex-col relative gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Create Password<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type={showPassword1 ? ('text'): ('password') } name='createPassword' placeholder='Enter Password' value={formData.createPassword} onChange={changeHandler} />
                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword1((prev) => !prev)}>
                        {
                            showPassword1 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                        }
                    </span>
                </label>

                <label className='flex flex-col relative gap-[2px]'>
                    <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Confirm Password<span className='text-[red] text-[15px]'>*</span></p>
                    <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type={showPassword2 ? ('text'): ('password') } name='confirmPassword' placeholder='Confirm Password' value={formData.confirmPassword} onChange={changeHandler} />
                    <span className='absolute text-white top-8 right-2' onClick={() => setShowPassword2((prev) => !prev)}>
                        {
                            showPassword2 ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                        }
                    </span>
                </label>
            </div>

            <button onClick={submitHandler}><Button active={true}>Sign in</Button></button>
        </form>
    </div>
  )
}

export default SignupForm