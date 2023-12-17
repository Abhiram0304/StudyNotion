import React from 'react'
import HighlightText from '../components/HomePage/HighlightText'
import img1 from '../assets/Images/aboutus1.webp'
import img2 from '../assets/Images/aboutus2.webp'
import img3 from '../assets/Images/aboutus3.webp'
import {BiSolidQuoteSingleLeft,BiSolidQuoteSingleRight} from 'react-icons/bi'
import SubAboutUs from '../components/AboutUs/SubAboutUs'
import Footer from '../components/Commons/Footer'
import Statistics from '../components/AboutUs/Statistics'
import Button from '../components/HomePage/Button'
import Box from '../components/AboutUs/Box'

const AboutUs = () => {
  return (
    <div className='relative w-full h-auto flex flex-col font-inter mx-auto'>
        {/* section 1 */}
        <div className='relative bg-richblack-800 h-auto w-full pb-[4rem]'>
            <div className='relative w-3/4 h-auto mx-auto flex flex-col justify-center items-center'>
                <div className='relative md:w-3/4 w-[100%] text-center my-[3rem] flex flex-col lg:gap-[2rem] gap-[1rem]'>
                    <p className='text-[16px] text-richblack-200'>About us</p>
                    <div className='lg:text-[36px] md:text-[32px] text-[28px] leading-[44px] font-semibold text-richblack-5'>Driving Innovation in Online Education for a<HighlightText text={' Brighter Future'} /></div>
                    <div className='lg:text-[16px] md:text-[13px] text-[12px] text-richblack-300 font-semibold'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</div>
                </div>
                <div className='relative w-full lg:pb-[8rem] md:pb-[19rem] pb-[34rem]'>
                    <div className='absolute z-[2] flex flex-wrap h-full top-0 left-0 justify-center gap-[2rem] w-full'>
                        <img src={img1} className='min-w-[250px] max-w-[320px] w-[30%]' />
                        <img src={img2} className='min-w-[250px] max-w-[320px] w-[30%]' />
                        <img src={img3} className='min-w-[250px] max-w-[320px] w-[30%]' />
                    </div>
                </div>
            </div>
        </div>

        {/* section 2 */}
        <div className='relative w-full bg-richblack-900 h-auto pt-[8rem] pb-[3rem]'>
            <div className='w-3/4 mx-auto'>
                <div className='w-full justify-center flex lg:text-[34px] md:text-[30px] text-[26px] font-semibold text-center'>
                    <span className='text-richblack-600'><BiSolidQuoteSingleLeft /></span>
                    <span className='text-richblack-100'>
                        We are passionate about revolutionizing the way we learn. Our innovative platform
                        <span className='pl-[8px]' style={{
                                background: 'linear-gradient(to bottom right, #1FA2FF, #20BDFF)',
                                '-webkit-background-clip': 'text',
                                'background-clip': 'text',
                                color: 'transparent'
                        }}>
                        combines technology
                        </span>,
                        <span className='pl-[8px]' style={{
                                background: 'linear-gradient(to top right, #FF512F, #F09819)',
                                '-webkit-background-clip': 'text',
                                'background-clip': 'text',
                                color: 'transparent'
                        }}>expertise</span>, and community to create an
                        <span className='pl-[8px]' style={{
                                background: 'linear-gradient(to bottom right, #E65C00, #F9D423)',
                                '-webkit-background-clip': 'text',
                                'background-clip': 'text',
                                color: 'transparent'
                        }}>unparalleled educational experience</span>.
                    </span>
                    <span className='text-richblack-600'><BiSolidQuoteSingleRight /></span>
                </div>
            </div>
            <div className='w-[full] h-[1px] md:block hidden my-[3rem] bg-richblack-700'></div>
            <SubAboutUs />
        </div>

        {/* section 3 */}
        <Statistics />

        {/* section 4 */}
        <div className='w-full flex-col bg-richblack-900 flex items-center justify-center py-[3rem]'>
            <div className='lg:w-3/4 md:w-11/12 w-4/5 flex lg:flex-row flex-col justify-between gap-[2rem]'>
                <div className='flex md:h-[265px] lg:w-[50%] flex-col items-start gap-[1rem]'>
                    <div className='font-semibold text-[36px] text-richblack-5 leading-[1.1]'>World-Class Learning for<HighlightText text={" Anyone, Anywhere"} /></div>
                    <p className='font-medium text-[16px] text-richblack-300 mb-[1rem]'>Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.</p>
                    <Button active={true} linkedTo={'/signup'}>Learn More</Button>
                </div>
                <div className='flex md:justify-end justify-start'>
                    <div className='flex md:flex-row flex-col'>
                        <Box color={1} title={"Curriculum Based on Industry Needs"} description={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} />
                        <Box color={2} title={"Our Learning Methods"} description={"The learning process uses the namely online and offline."} />
                    </div>
                </div>
            </div>
            <div className='lg:w-3/4 md:w-11/12 w-4/5 flex justify-start md:justify-end'>
                <div className='flex md:flex-row flex-col'>
                    <Box color={1} title={"Certification"} description={"You will get a certificate that can be used as a certification during job hunting."}/>
                    <Box color={2} title={`Rating "Auto-grading"`} description={"You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."} />
                    <Box color={1} title={"Ready to Work"} description={"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."} />
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default AboutUs