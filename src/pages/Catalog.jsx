import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {fetchCatalogPageCourses} from '../services/operations/courseDetailsAPI';
import { getAllCourses } from '../services/operations/courseDetailsAPI';
import './catalog.css';
import CourseCard from '../components/Commons/CourseCard';
import CourseSlider from '../components/Commons/CourseSlider';
import ReviewSlider from '../components/Commons/ReviewSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [categoryId,setCategoryId] = useState(null);
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [tab,setTab] = useState(1);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
      const getCategoryId = async () => {
        const response = await dispatch(getAllCourses());
        const catId = response.filter((cat) => cat?.name.split(" ").join("").toLowerCase()===catalogName)[0];
        setCategoryId(catId._id);
      }
      getCategoryId();
    },[catalogName]);


    useEffect(() => {
      const fetchCatalogPageData = async () => {
          setLoading(true);
          const response = await dispatch(fetchCatalogPageCourses(categoryId));
          console.log("Catalog page Response : ", response);
          setCatalogPageData(response);
          setLoading(false);
      };

      if(categoryId){
        fetchCatalogPageData();
      }
  }, [categoryId]);

  if(loading || !catalogPageData){
    return (
      <div className='w-[100vw] h-[100vh] bg-richblack-900 flex justify-center items-center'>
          <div className='spinner'></div>
      </div>
  )
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-richblack-900 flex flex-col'>
      <div className='w-full py-[2rem] bg-richblack-800'>
        <div className='w-[80%] mx-auto flex flex-col gap-[0.5rem] justify-start items-start'>
          <div className='text-[14px] text-richblack-300 tracking-wider'>Home  / Catalog / <span className='text-yellow-50'>{catalogPageData?.currentCategory?.name}</span></div>
          <div className='text-[30px] text-richblack-5'>{catalogPageData?.currentCategory?.name}</div>
          <div className='w-[80%] text-left text-[14px] text-richblack-300 tracking-wide'>{catalogPageData?.currentCategory?.description}</div>
        </div>
      </div>
      <div className='w-[80%] mx-auto flex flex-col gap-[0.5rem] py-[2rem]'>
        <p className='text-[2rem] font-medium tracking-wide text-richblack-5'>Courses to get you started</p>
        <div className='relative w-full border-b-[1px] border-richblack-600 flex justify-start items-center'>
          <div onClick={() => setTab(1)} className={`cursor-pointer text-[16px] px-[1rem] py-[0.5rem] ${tab===1 ? ("border-b-[1px] border-yellow-100 text-yellow-100") : ("text-richblack-200")}`} >Most Popular</div>
          <div onClick={() => setTab(2)} className={`cursor-pointer text-[16px] px-[1rem] py-[0.5rem] ${tab===2 ? ("border-b-[1px] border-yellow-100 text-yellow-100") : ("text-richblack-200")}`} >New</div>
        </div>
        <div className='w-full my-[1.5rem]'><CourseSlider courses={catalogPageData?.currentCategory?.course} /></div>
        <div className='w-full'>
          <div className='w-full font-semibold tracking-wide border-b-[1px] border-richblack-600 text-[24px] text-richblack-5'>Top Courses in {catalogPageData?.otherCategoryCourse?.name}</div>
          <div className='w-full my-[1.5rem]'><CourseSlider courses={catalogPageData?.otherCategoryCourse?.course} /></div>
        </div>
        <div>
          <div className='w-full border-b-[1px] font-semibold tracking-wide border-richblack-600 text-[24px] text-richblack-5 py-[0.5rem]'>Top Selling Courses</div>
          <div className='w-full flex justify-between items-start flex-wrap my-[1.5rem] gap-[1.5rem]'>
            {
              catalogPageData?.topSellingCourses.map((course,index) => (
                <div className='lg:w-[30%] md:w-[45%] w-[100%]'><CourseCard course={course} height={"md:h-[240px] h-[180px]"} index={index} bestSelling={true} /></div>
              ))
            }
          </div>
        </div>
      </div>
      <div className='bg-richblack-900'>
            <div className='lg:w-[80%] py-[2rem] md:w-[85%] w-[95%] flex flex-col gap-[2rem] mx-auto'>
                <h1 className='text-richblack-5 text-[32px] font-medium tracking-wider text-center'>Reviews from other learners</h1>
                <ReviewSlider />
            </div>
      </div>
    </div>
  )
}

export default Catalog