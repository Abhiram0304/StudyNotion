import React from 'react'
import image from '../../assets/Images/FoundingStory.png'

const SubAboutUs = () => {
  return (
    <div className='w-3/4 my-[4rem] mx-auto flex flex-col gap-[2rem] justify-center items-center'>
        <div className='flex flex-col md:flex-row w-full gap-[2rem] justify-between items-center'>
            <div className='flex md:w-[45%] flex-col gap-[0.5rem]'>
                <h1 className='text-[36px] text-left font-semibold mb-[0.5rem]' style={{
                    WebkitTextFillColor: 'transparent',
                    background: 'linear-gradient(to bottom right, #833AB4, #FD1D1D)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    }}>
                    Our Founding Story
                </h1>
                <p className='text-[16px] text-richblack-300 font-medium'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p className='text-[16px] text-richblack-300 font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
            <div className='md:w-[45%]'>
                <img src={image} />
            </div>
        </div>
        <div className='flex flex-col md:flex-row w-full gap-[2rem] justify-between items-center'>
               <div className='flex md:w-[45%] flex-col gap-[0.5rem]'>
                    <h1 className='text-[36px] text-left font-semibold mb-[0.5rem]' style={{
                        WebkitTextFillColor: 'transparent',
                        background: 'linear-gradient(to bottom right, #E65C00, #F9D423)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        }}>
                        Our Vision
                    </h1>
                    <p className='text-[16px] text-richblack-300 font-medium'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
               </div>
               <div className='flex md:w-[45%] flex-col gap-[0.5rem]'>
                    <h1 className='text-[36px] text-left font-semibold mb-[0.5rem]' style={{
                        WebkitTextFillColor: 'transparent',
                        background: 'linear-gradient(to bottom right, #1FA2FF, #12D8FA)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                    }}>Our Mission</h1>
                    <p className='text-[16px] text-richblack-300 font-medium'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
               </div>     
        </div>
    </div>
  )
}

export default SubAboutUs