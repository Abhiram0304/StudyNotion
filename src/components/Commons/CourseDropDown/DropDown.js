import React, { useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import SubDropDown from './SubDropDown';

const DropDown = ({section}) => {
  const [isSectionActive, setIsSectionActive] = useState(false);

  return (
    <>
      <div className='w-full px-[1rem] py-[1rem] cursor-pointer bg-richblack-800 flex justify-between items-center transition-all duration-300' onClick={() => setIsSectionActive(!isSectionActive)}>
        <div className='flex justify-center items-center text-[18px] gap-[1rem]'>
            {
              isSectionActive ? (<FaChevronUp className='text-richblack-200' />) : (<FaChevronDown className='text-richblack-200' />)
            }
            <p className='text-richblack-5'>{section?.sectionName}</p>
        </div>
        <div className='flex justify-end items-center text-[18px] gap-[1rem]'>
            <div className='text-yellow-50'>{section?.subSection?.length} Lectures</div>
            <div className='text-richblack-25'>51 min</div>
        </div>
      </div>
      {
        isSectionActive && section?.subSection?.map((subSection,index) => (
          <SubDropDown subSection={subSection} isSectionActive={isSectionActive} key={index} />
        ))
      }
    </>
  )
}

export default DropDown