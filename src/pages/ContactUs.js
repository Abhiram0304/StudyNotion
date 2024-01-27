import React from 'react'
import {HiChatAlt2} from 'react-icons/hi'
import {FaGlobeAfrica} from 'react-icons/fa'
import {MdCall} from 'react-icons/md'
import ContactForm from '../components/Forms/ContactForm'
import Footer from '../components/Commons/Footer'
import ReviewSlider from '../components/Commons/ReviewSlider'

const ContactUs = () => {
  return (
    <div className='w-[100vw] min-h-[100vh] bg-richblack-900'>
        <div className ='font-inter flex justify-center items-center'>
            <div className='lg:w-3/5 w-full mx-auto my-[5rem] flex lg:flex-row flex-col justify-between lg:items-start items-center gap-[3rem]'>
                <div className='lg:w-[35%] w-[95%] h-auto py-[2rem] px-[2rem] rounded-lg text-richblack-200 bg-richblack-800 flex flex-col gap-[1rem]'>
                    <div className='flex gap-[1rem] items-start justify-start'>
                        <HiChatAlt2 className='text-[30px]' />
                        <div className='flex flex-col gap-[2px]'>
                            <h1 className='font-semibold tracking-wide text-[18px] text-richblack-5'>Chat with Us</h1>
                            <p className='text-[14px]'>Our friendly team is here to help.</p>
                            <p className='text-[14px] font-semibold'>tanneriabhiram@gmail.com</p>
                        </div> 
                    </div>
                    <div className='flex gap-[1rem] items-start justify-start'>
                        <FaGlobeAfrica className='text-[30px]' />
                        <div className='flex flex-col gap-[2px]'>
                            <h1 className='font-semibold tracking-wide text-[18px] text-richblack-5'>Visit us</h1>
                            <p className='text-[14px]'>Come and say hello at our office HQ.</p>
                            <p className='text-[14px] font-semibold'>NIT AP, Tadepalligudem.</p>
                        </div>
                    </div>
                    <div className='flex gap-[1rem] items-start justify-start'>
                        <MdCall className='text-[30px]' />
                        <div className='flex flex-col gap-[2px]'>
                            <h1 className='font-semibold tracking-wide text-[18px] text-richblack-5'>Call us</h1>
                            <p className='text-[14px]'>We are available 24/7</p>
                            <p className='text-[14px] font-semibold'>+91 7478xxxxxx</p>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[60%] w-[95%] border-[1px] rounded-lg border-richblack-600 px-[2rem] py-[2rem]'>
                    <div className='text-richblack-5 font-semibold text-[33px] leading-[1.2]'>Got a Idea? We’ve got the skills. Let’s team up</div>
                    <p className='font-medium text-[16px] text-richblack-300'>Tell us more about yourself and what you’re got in mind.</p>
                    <ContactForm />
                </div>
            </div>
        </div>

        <div className='bg-richblack-900'>
            <div className='lg:w-[80%] py-[2rem] md:w-[85%] w-[95%] flex flex-col gap-[2rem] mx-auto'>
                <h1 className='text-richblack-5 text-[32px] font-medium tracking-wider text-center'>Reviews from other learners</h1>
                <ReviewSlider />
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default ContactUs