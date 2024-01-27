import React,{useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay,FreeMode,Navigation } from 'swiper/modules';
import { useDispatch } from 'react-redux';
import { getAllReviews } from '../../services/operations/courseDetailsAPI';
import ReviewCard from './ReviewCard';

const ReviewSlider = () => {
    const [reviews,setReviews] = useState([]);
    const dispatch = useDispatch();

    const fetchReviews = async() => {
        const response = await dispatch(getAllReviews()); 
        if(response){
            setReviews(response); 
        }   
    }

    useEffect(() => {
        fetchReviews();
    },[]);
  return (
    <div className=''>
        <Swiper style={{'--swiper-navigation-color': 'white','--swiper-navigation-size': '30px'}} slidesPerView={1} navigation={true} autoplay={{disableOnInteracation: false}} modules={[Navigation,Autoplay]} spaceBetween={25} loop={true} breakpoints={{1024: {slidesPerView: 3}}} className="max-h-[30rem] justify-center items-center flex" >
          {
            reviews.map((review,index) => (
              <SwiperSlide key={index}>
                <ReviewCard data={review} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
  )
}

export default ReviewSlider