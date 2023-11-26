import React from 'react'
import logo1 from '../../assets/TimeLineLogo/Logo1.svg';
import logo2 from '../../assets/TimeLineLogo/Logo2.svg';
import logo3 from '../../assets/TimeLineLogo/Logo3.svg';
import logo4 from '../../assets/TimeLineLogo/Logo4.svg';
import image from '../../assets/Images/TimelineImage.png';

const timelineData = [
    {
        logo:logo1,
        heading:"Leadership",
        desc:"Fully committed to the success company"
    },
    {
        logo:logo2,
        heading:"Responsibility",
        desc:"Students will always be our top priority"
    },
    {
        logo:logo3,
        heading:"Flexibility",
        desc:"The ability to switch is an important skills"
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        desc:"Code your way to a solution"
    }
] 

const TimeLineSection = () => {
  return (
    <div className='w-full flex lg:flex-row gap-[2rem] flex-col place-content-between my-[4rem] items-center'>

            <div className='flex flex-col md:gap-[10px] gap-[0px]'>
                {
                    timelineData.map((each,index) => {
                        return (
                            <div className='flex flex-col md:gap-[10px] gap-[0px]'>
                                <div className='flex gap-[2rem] items-center justify-start' key={index}>
                                    <div className='w-[50px] h-[50px] flex items-center justify-center bg-white rounded-full shadow-md shadow-richblack-100'>
                                        <img src={each.logo} />
                                    </div>
                                    <div className='flex flex-col gap-[5px]'>
                                        <h2 className='text-[18px] text-richblack-800 font-semibold'>{each.heading}</h2>
                                        <p className='text-[14px] text-richblack-700 font-normal'>{each.desc}</p>
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        timelineData.length - 1 === index ? "hidden" : "lg:block"
                                        }  lg:h-14 h-8 border-dotted border-r-[2px] border-richblack-200 bg-richblack-800/0 w-[7%]`}
                                >
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='relative'>
                <img src={image} className='relative z-[3] w-full md:h-auto' />
                <div className='absolute top-4 left-4 w-full h-full bg-white z-[2]'></div>
                <div className='absolute md:right-[15%] md:bottom-[-7%] right-[-3%] bottom-[-16%] sm:gap-[1rem] gap-[0px] flex md:flex-row flex-col w-auto justify-center items-center mx-auto z-[4] bg-caribbeangreen-700 sm:px-[1rem] px-[0px] sm:py-[1rem] py-[2px]'>
                    <div className='flex sm:gap-[1rem] gap-[5px] justify-center items-center w-1/2 md:border-r-[2px] border-r-0 border-caribbeangreen-500'>
                        <h1 className='font-bold sm:text-[36px] text-[28px] text-white'>10</h1>
                        <p className='sm:text-[14px] text-[10px] font-medium text-caribbeangreen-300'>YEARS EXPERIENCES</p>
                    </div>
                    <div className='flex sm:gap-[1rem] gap-[5px] justify-center items-center w-1/2'>
                        <h1 className='font-bold sm:text-[36px] text-[28px] text-white'>250</h1>
                        <p className='sm:text-[14px] text-[10px] font-medium text-caribbeangreen-300'>TYPES OF COURSES</p>
                    </div>
                </div>
                <div className='absolute bottom-10 right-1 z-[1] h-[40%] w-[40%] bg-[#6fd8f2] blur-[100px]'></div>
                <div className='absolute top-10 left-1 z-[1] h-[40%] w-[40%] bg-[#6fd8f2] blur-[100px]'></div>
            </div>
        </div>
  )
}

export default TimeLineSection