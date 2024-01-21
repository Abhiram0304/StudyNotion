import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {fetchCourseDetails} from '../services/operations/courseDetailsAPI';
import { ImInfo } from "react-icons/im";
import { TbWorld } from "react-icons/tb";
import { LuClock2 } from "react-icons/lu";
import { PiCursorBold } from "react-icons/pi";
import { TbFileCertificate } from "react-icons/tb"
import Button from '../components/HomePage/Button';
import { CiMobile3 } from "react-icons/ci";
import Footer from '../components/Commons/Footer';
import './courseDetails.css';
import DropDown from '../components/Commons/CourseDropDown/DropDown';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard'
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import { addToCart } from '../reducer/slices/cartSlice';
import { buyCourse } from '../services/operations/studentOperationsAPI';
import RatingStars from '../components/Commons/RatingStars';

const CourseDetails = () => {

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading,setLoading] = useState(false);
  const [date,setData] = useState([]);
  const [loginData,setLoginData] = useState(null);

  useEffect(() => {
    ;(async () => {
      setLoading(true);
      try{
        const response = await fetchCourseDetails(courseId);
        console.log("RESPONSE: ",response);
        setCourseDetails(response);
        getDate(courseDetails?.createdAt);
        countLectures();
      }catch(error){
        console.log("Could not fetch Course Details")
      }
      setLoading(false);
    })()
  }, [courseId]);

  const getDate = (data) => {
    const year = data.split('-').at(0);
    const month = data.split('-').at(1);
    setData([year,month]);
  }

  const buyCourseHandler = async() => {
    await dispatch(buyCourse([courseId],user,navigate,dispatch,token));
    return;
  }

  const addToCartHandler = async() => {
    if(user && user?.accountType=='Instructor'){
      toast.error("You are using an instructor Account, Hence you Cannot buy a Course");
      return;
    }
    
    if(token){
        await dispatch(addToCart(courseDetails));
    }else{
      toast.error("Login into your account, to use cart");
      setLoginData({
        heading : "You are not logged in!",
        subHeading : "Please login to add To Cart",
        b1txt : "Login",
        b2txt : "Cancel",
        btn1Handler : navigate('/login'),
        btn2Handler : setLoginData(null)
      })
    }
  }

  const [totalLectures,setTotalLectures] = useState(0);
  
  const countLectures = () => {
    courseDetails?.courseContent?.forEach((section) => {setTotalLectures(totalLectures + (section?.subSection?.length || 0))});
  }

  const shareHandler = () => {
    const route = window.location.href;
    copy(route);
    toast.success("Copied to Clipboard");
  }
  
  return (
    <>
      {
        !loading ? (
          <>
            <div className='w-full bg-richblack-900 min-h-[100vh]'>
              <div className='lg:w-[85%] w-[90%] mx-auto py-[2rem] flex lg:flex-row flex-col gap-[2rem] justify-center items-start'>
                <div className='lg:w-[70%] w-[95%] mx-auto flex flex-col justify-center items-center gap-[2rem]'>

                  <div className='w-full flex flex-col justify-center items-start gap-[1rem] border-r-[2px] border-richblack-700'>
                    <div className='text-richblack-5 text-[36px] font-semibold tracking-wide'>{courseDetails?.courseName}</div>
                    <p className='text-richblack-200 text-[16px]'>{courseDetails?.courseDescription}</p>
                    <div className='flex gap-[1rem] justify-start items-center'>
                      <RatingStars size={30} />
                      <p className='text-richblack-100'>(190)</p>
                    </div>
                    <p className='text-[20px] text-richblack-50 flex gap-[0.5rem]'>Created By :<p className='text-semibold tracking-wide'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p></p>
                    <div className='flex justify-start items-center gap-[3rem]'>
                      <p className='text-richblack-5 flex gap-[0.5rem] text-[16px] justify-start items-center'>
                        <ImInfo />
                        <p>Created At :</p>
                        <p>{date[1]} / {date[0]}</p>
                      </p>
                      <p className='text-richblack-5 flex gap-[0.5rem] text-[16px] justify-start items-center'>
                        <TbWorld />
                        <p>English</p>
                      </p>
                  </div>
                  </div>

                  <div className='w-full flex flex-col gap-[1rem] justify-center items-start border-[2px] border-richblack-700 px-[2rem] py-[2rem] rounded-md'>
                    <p className='text-richblack-5 text-[32px] tracking-wide font-semibold'>What You'll Learn</p>
                    <p className='text-[18px] text-richblack-50 leading-[1.7rem]'>{courseDetails?.whatYouWillLearn}</p>
                  </div>

                  <div className='w-full gap-[1rem] flex flex-col justify-center items-start'>
                    <p className='text-[28px] text-richblack-5 font-semibold tracking-wide'>Course Content</p>
                    <div className='font-semibold tracking-wide w-full flex justify-start items-center gap-[1rem]'>
                      <div className='flex justify-start items-center gap-[2rem]'>
                        <div className='text-[18px] text-richblack-50'>{courseDetails?.courseContent.length} Sections</div>
                        <div className='text-[18px] text-richblack-50'>|</div>
                        <div className='text-[18px] text-richblack-50'>{totalLectures} Lectures</div>
                        <div className='text-[18px] text-richblack-50'>|</div>
                        <div className='text-[18px] text-richblack-50'>total Time</div>
                      </div>
                    </div>
                    <div className='w-full border-[2px] rounded-lg border-richblack-400 transition-all duration-300'>
                      {
                        courseDetails?.courseContent.map((section,index) => (
                          <DropDown section={section} key={index} />
                        ))
                      }
                    </div>
                  </div>

                  <div className='w-full flex flex-col gap-[1rem]'>
                    <p className='text-richblack-5 font-semibold tracking-wide text-[26px]'>Author</p>
                    <div className='flex gap-[2rem] justify-start items-center'>
                      <img src={courseDetails?.instructor?.image} loading='lazy' className='w-[60px] object-cover h-[60px] rounded-full' />
                      <p className='text-[25px] text-richblack-5'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                    </div>
                    <p className='text-[18px] text-richblack-100'>{courseDetails?.instructor?.additionalDetails?.about}</p>
                  </div>

                </div>
                <div className='lg:w-[30%] w-[95%] mx-auto rounded-lg overflow-hidden'>
                  <img src={courseDetails?.thumbnail} loading='lazy' className='w-full' />
                  <div className='w-full flex flex-col gap-[1rem] bg-richblack-700 px-[1.5rem] py-[1.5rem]'>
                    <div className='text-richblack-5 text-[32px] font-edu-sa'>Rs. {courseDetails?.price}</div>
                    <div onClick={addToCartHandler}><Button active={true}>Add To Cart</Button></div>
                    <div onClick={buyCourseHandler}><Button active={false} >Buy Now</Button></div>
                    <p className='text-richblack-5 text-[16px] text-center'>30-Day Money-Back Guarantee</p>
                    <div className='w-full flex justify-center items-start flex-col gap-[0.25rem]'>
                      <p className='text-white text-[18px]'>This Course Includes:</p>
                      <div className='text-[16px] text-caribbeangreen-100 font-medium'>
                        <div className='flex gap-[0.5rem] justify-start items-center'><LuClock2 /><p>8 hours on-demand video</p></div>
                        <div className='flex gap-[0.5rem] justify-start items-center'><PiCursorBold /><p>Full Lifetime access</p></div>
                        <div className='flex gap-[0.5rem] justify-start items-center'><CiMobile3 /><p>Access on Mobile and TV</p></div>
                        <div className='flex gap-[0.5rem] justify-start items-center'><TbFileCertificate /><p>Certificate of completion</p></div>
                      </div>
                    </div>
                    <p className='w-full text-center font-bold cursor-pointer text-yellow-100 text-[16px]' onClick={shareHandler}>Share</p>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <div className='w-[100vw] h-[100vh] bg-richblack-900 flex justify-center items-center'>
            <div className='spinner'></div>
          </div>
        )
      }

      {
        loginData && <LoginModal data={loginData} />
      }
    </>
  )
}

export default CourseDetails