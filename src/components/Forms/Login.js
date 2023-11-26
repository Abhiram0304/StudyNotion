import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../HomePage/Button';
import { login } from '../../services/operations/authAPI';
import { useDispatch } from 'react-redux';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData,setFormData] = useState({
        email:"",password:""
    })

    const {email,password} = formData;

    function changeHandler(event){
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name] : event.target.value 
            }
        ))
    }

    const [showPassword,setShowPassword] = useState(false);

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password,navigate));
    }

  return (
    <div className='w-full'>
        <form className='w-full flex flex-col gap-2 my-[1rem]'>
            <label className='flex flex-col gap-[2px]'>
                <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Email Address</p>
                <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type='email' name='email' placeholder='Enter email address' value={formData.email} onChange={changeHandler} />
            </label>
            <label className='flex flex-col gap-[2px] relative py-3 mb-[2rem] mt-[8px]'>
                <p className='text-white flex gap-1 items-center text-[14px] tracking-wide'>Password</p>
                <input className='w-full bg-richblack-800 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-1 px-2' required type={showPassword ? ('text'): ('password') } name='password' placeholder='Enter Password' value={formData.password} onChange={changeHandler} />
                <span className='text-white absolute right-2 top-11' onClick={() => setShowPassword((prev) => !prev)}>
                    {
                        showPassword ? (<AiFillEye/>) : (<AiFillEyeInvisible/>)
                    }
                </span>
                <Link to='/forgotPassword' >
                    <span className='absolute text-blue-100 right-0 bottom-[-15px]'>Forgot Password</span>
                </Link>
            </label>

            <button onClick={submitHandler}><Button active={true}>Login</Button></button>
        </form>
    </div>
  )
}

export default LoginForm