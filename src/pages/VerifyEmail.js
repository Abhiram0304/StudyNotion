import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signUp } from '../services/operations/authAPI';
import OTPInput from 'react-otp-input';
import './VerifyEmail.css';
import Button from '../components/HomePage/Button';
import {BsArrowLeftShort} from 'react-icons/bs';
import {RxCountdownTimer} from 'react-icons/rx';

const VerifyEmail = () => {

  const [OTP,setOTP] = useState("");
  const {signupData,loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!signupData){
      navigate("/signup");
      return
    }
  },[])

  const handleVerifyAndSubmit = (e) => {
    e.preventDefault();
    const {firstName,lastName,accountType,email,createPassword,confirmPassword} = signupData;

    dispatch(signUp(accountType,firstName,lastName,email,createPassword,confirmPassword,OTP,navigate));;
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-richblack-900 flex'>
      {
        loading ? 
        (<div className="custom-loader absolute top-[45%] left-[48%]"></div>)
        : 
        (
          <div className='flex flex-col gap-[1rem] md:px-[0] px-[1rem] mx-auto mt-[10rem] lg:max-w-[450px] md:max-w-[420px] max-w-4/5 overflow-hidden'>
            <div className='text-richblack-5 font-semibold text-[34px] tracking-wide'>Verify Email</div>
            <p className='text-[18px] text-richblack-100 leading-[26px]'>A verification code has been sent to you. Enter the code below</p>
            <form className='flex flex-col'>
              <OTPInput value={OTP} onChange={setOTP} numInputs={6} 
              renderInput={(props) => 
              <input {...props} placeholder='-' />} 
              inputStyle={{width:"15%",height:"50px",maxHeight:"50px",maxWidth:"50px",borderRadius:"0.5rem",backgroundColor:"#161D29",borderBottom:"2px solid #424854",color:"#F1F2FF",}}
              containerStyle={{justifyContent:"space-between",gap:"0.6px",}}
              shouldAutoFocus={true}
              />
              <button className='mt-[2rem]' onClick={handleVerifyAndSubmit}><Button active={true}>Verify and Register</Button></button>
            </form>
            <div className='text-richblack-5 flex justify-between font-medium text-[16px]'>
              <Link to={'/signup'}>
                <div className='flex gap-[8px] items-center justify-center'>
                  <BsArrowLeftShort />
                  <div>Back to Signup</div>
                </div>
              </Link>
              <button className='flex items-center justify-center text-blue-100 gap-[8px]' onClick={() => dispatch(sendOTP(signupData.email))}>
                <RxCountdownTimer />
                <div>Resend it</div>
              </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default VerifyEmail