import React, { useEffect, useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = ['Free','New to coding','Most popular','Skills paths','Career paths'];

const ExploreMore = () => {

    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((section) => section.tag == value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading); 
    }

    function handleCurrentCard(card){
        setCurrentCard(card.heading);
    }
  return (
    <div className='relative lg:w-4/5 w-4/5 mx-auto flex flex-col text-center gap-[8px] lg:mt-[8rem] mt-[0rem]'>
        <h2 className='font-semibold text-white md:text-[36px] text-[28px] text-center mx-auto w-3/4'>Unlock the <HighlightText text={" Power of Code"} /></h2>
        <p className='text-richblack-300 tracking-wide md:text-[16px] text-[13px] text-center font-semibold'>Learn to Build Anything You Can Imagine</p>
        <div className='lg:w-auto w-auto flex flex-wrap lg:flex-nowrap justify-center items-center rounded-3xl mx-auto bg-richblack-800 lg:mt-[3rem] mt-[1rem] py-[5px] lg:px-[5px]'>
            {
                tabsName.map((tab,index) => {
                    return (
                        <div className={`${currentTab === tab ? "bg-richblack-700 text-white" : "bg-richblack-800 text-richblack-400"} px-[1rem] py-[8px] rounded-3xl transition-all duration-200 cursor-pointer `} key={index} onClick={() => setMyCards(tab)}>
                            {tab}
                        </div>
                    )
                })
            }
        </div>
        <div className='relative w-full mx-auto'>
            <div className='absolute top-[30px] left-[0] lg:left-[3%] lg:w-11/12 flex flex-wrap items-center justify-center gap-[3rem] mx-auto transition-all duration-500'>
                {
                    courses.map((course,index) => {
                        return (
                            <div onClick={() => handleCurrentCard(course)} className='hover:scale-105 transition-all duration-200 cursor-pointer'>
                            <CourseCard key={index} currentCard={currentCard === course.heading}  course={course} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore