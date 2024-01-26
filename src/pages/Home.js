import React from 'react'
import {BsArrowRightShort} from 'react-icons/bs';
import {Link} from 'react-router-dom';
import HighlightText from '../components/HomePage/HighlightText';
import Button from '../components/HomePage/Button';
import Banner from '../assets/Images/banner.mp4';
import Segment from '../components/HomePage/Segment';
import Footer from '../components/Commons/Footer';
import TimeLineSection from '../components/HomePage/TimeLineSection';
import KnowYourProgressSection from '../components/HomePage/KnowYourProgressSection';
import InstructorImage from '../assets/Images/Instructor.png';
import ExploreMore from '../components/HomePage/ExploreMore';

const Home = () => {
  return (
    // Wrapper 
    <div className='w-full'>
        {/* Section 1 */}
        <div className='bg-richblack-900'>
            <div className='relative flex flex-col mx-auto w-11/12 items-center text-white justify-between pb-[3rem]'>

                <div className='relative lg:w-3/4 w-5/6 mx-auto flex flex-col gap-[38px] items-center justify-center '>
                    <Link to="/signup">
                        <div className='mt-16 flex gap-[10px] rounded-xl py-[5px] px-[16px] justify-center text-center text-[15px] text-richblack-200 leading-[20px] bg-richblack-800 font-medium items-center border-b-[2px] border-richblack-600 hover:scale-105 transition-all duration-200'>
                            <p>Become An Instructor</p>
                            <BsArrowRightShort className='text-[16px]' />
                        </div>
                    </Link>
                    <div className='text-[36px] leading-[44px] font-semibold tracking-[-0.88px] text-center'>Empower Your Future with <HighlightText text='Coding Skills'/></div>
                    <div className='text-richblack-300 text-center font-semibold text-[17px]'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </div>
                    <div className='flex flex-row gap-[24px]'>
                        <Button active={true} linkedTo={"/signup"}>Learn More</Button>
                        <Button active={false} linkedTo={"/login"}>Book a Demo</Button>
                    </div>
                </div>

                <div className='relative lg:w-3/4 w-5/6 h-auto mb-[40px] mt-[80px]'>
                    <video className='w-full relative z-[3] rounded-md' muted autoPlay loop><source src={Banner} type="video/mp4" /></video>
                    <div className='w-full absolute top-2 left-2 h-full z-[2] bg-white rounded-md'></div>
                    <div className='w-3/4 h-1/2 absolute z-[1] top-[40%] left-[30%] rounded-full bg-blue-50 shadow-sm blur-[70px]'></div>
                    <div className='w-3/4 h-1/2 absolute z-[1] top-[10%] left-[0%] rounded-full bg-blue-50 shadow-sm blur-[70px]'></div>
                </div>

                <div className='lg:w-4/5 w-5/6 mx-auto relative justify-center my-[5rem] flex flex-col lg:gap-[12rem]'>
                    <Segment position={"lg:flex-row flex-col"} heading={
                            <div>Unlock your <HighlightText text={"coding potential"} /> with our online courses.</div>
                        } 
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        b1={{linkedTo:"/login",text:"Try it Yourself",active:true}}
                        b2={{linkedTo:"/signup",text:"Learn More",active:false}}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="/one">One</a><a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav></body>\n</html>`}
                        blurcolor={"red"}
                    />

                    <Segment position={"lg:flex-row-reverse flex-col"} heading={
                            <div>Start <HighlightText text={` coding in seconds`} /></div>
                        } 
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        b1={{linkedTo:"/login",text:"Continue Lesson",active:true}}
                        b2={{linkedTo:"/signup",text:"Learn More",active:false}}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n<a href="/one">One</a><a href="/two">Two</a>\n<a href="/three">Three</a>\n</nav></body>\n</html>`}
                        blurcolor={"blue"}
                    />
                </div>

                <ExploreMore />
            </div>
        </div>

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='section2_bg lg:h-[380px] h-[260px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                    <div className='flex sm:gap-7 gap-2 mx-auto lg:mt-[15rem] mt-[10rem]'>
                        <Button active={true} linkedTo={"/signup"}>Explore Full Catalog<BsArrowRightShort /></Button>
                        <Button active={false} linkedTo={"/signup"}>Learn More</Button>
                    </div>
                </div>
            </div>

            <div className='relative md:w-11/12 w-full mx-auto justify-center items-center py-[4rem] px-[3rem]'>

                <div className='flex md:flex-row flex-col justify-around items-center md:gap-[8rem] gap-[10px] mt-[2rem]'>
                        <p className='font-semibold leading-[1.1] text-[38px]'>Get the skills you need for a<HighlightText text={" job that is in demand"} /></p>
                        <div className='flex flex-col lg:gap-[3rem] gap-[1rem] justify-center items-start'>
                            <p className='text-richblack-700 self-stretch text-[15px] font-medium font-inter'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <Button linkedTo={'/signup'} active={true}>Learn More</Button>
                        </div>
                </div>

                <TimeLineSection />
                <KnowYourProgressSection />
            </div>
        </div>

        {/* Section 3 */}
        <div className='bg-richblack-900 relative'>
            <div className='relative h-full w-10/12 mx-auto py-[6rem] flex md:flex-row flex-col-reverse gap-[4rem] md:gap-[10rem] place-content-between'>
                <div className='relative md:w-[50%] w-full mx-auto'>
                    <img src={InstructorImage} className='relative z-[2] w-[100%]' />
                    <div className='absolute h-full z-[1] w-[100%] bg-white bottom-3 right-3'></div>
                </div>
                <div className='relative h-auto md:w-[50%] md:gap-[0px] gap-[2rem] flex flex-col justify-start md:justify-around items-start'>
                    <div className='relative flex flex-col gap-[1rem]'>
                        <h1 className='text-white text-[36px] font-semibold max-w-[250px] leading-[1.2]'>Become an <HighlightText text={" instructor"}/></h1>
                        <p className='text-[16px] text-richblack-300 text-left w-3/4'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                    </div>
                    <Button active={true} linkedTo={'/'}>Start Teaching Today <BsArrowRightShort /></Button>
                </div>
            </div>            
        </div>

        {/* Footer */}
        <div className='w-full'>
            <Footer />
        </div>
    </div>
  )
}

export default Home