import React from 'react'
import image1 from '../../assets/Images/Know_your_progress.svg'
import image2 from '../../assets/Images/Compare_with_others.svg'
import image3 from '../../assets/Images/Plan_your_lessons.svg'
import Button from './Button'
import HighlightText from './HighlightText'

const KnowYourProgressSection = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-[2rem] mt-[10rem] w-full'>
        <div className='flex flex-col gap-[1rem] mx-auto md:w-4/5 w-full'>
            <div className='text-[36px] text-richblack-900 font-semibold tracking-tight text-center'>Your swiss knife for <HighlightText text={" learning any language"} /></div>
            <p className='text-center text-[16px] font-medium'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
        </div>
        <div className='flex lg:flex-row flex-col items-center justify-center mb-[1rem]'>
            <img src={image1} className='object-contain  lg:-mr-32 hover:scale-105 hover:rotate-1 transition-all duration-200' />
            <img src={image2} className='object-contain lg:-mb-10 lg:-mt-0 -mt-12 hover:scale-105 hover:rotate-1 transition-all duration-200' />
            <img src={image3} className='object-contain  lg:-ml-36 lg:-mt-5 -mt-16 hover:scale-105 hover:rotate-1 transition-all duration-200' />
        </div>
        <Button active={true} linkedTo={'/signup'}>Learn More</Button>
    </div>
  )
}

export default KnowYourProgressSection