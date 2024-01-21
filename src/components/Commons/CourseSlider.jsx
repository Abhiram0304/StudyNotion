import React,{useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,FreeMode,Navigation } from 'swiper/modules';
import CourseCard from './CourseCard';

const CourseSlider = ({courses}) => {

  console.log("Course : ",courses);
  return (
    <>
      <div className='max-w-[80vw]'>
        <Swiper style={{'--swiper-navigation-color': 'white','--swiper-navigation-size': '30px'}} slidesPerView={1} navigation={true} autoplay={{disableOnInteraction: false}} modules={[Navigation,Autoplay]} spaceBetween={25} loop={true} breakpoints={{1024: {slidesPerView: 3}}} className="max-h-[30rem]" >
          {
            courses.map((course,index) => (
              <SwiperSlide key={index}>
                <CourseCard course={course} height={"md:h-[200px] h-[180px]"} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </>
  )
}

export default CourseSlider