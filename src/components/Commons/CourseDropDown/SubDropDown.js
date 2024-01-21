import React, { useState } from 'react'
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

const SubDropDown = ({subSection,isSectionActive}) => {

  let time = subSection?.timeDuration.split('.');
  time = time[0] + ':' +  time[1].slice(0,2); 

  const  [isSubSectionActive, setIsSubSectionActive] = useState(false);
  
  return (
    <>
      <div className='px-[1rem] w-full flex flex-col justify-start items-center gap-[0.25rem] py-[0.5rem] transition-all duration-300'>
        <div className='w-full flex justify-between cursor-pointer items-center' onClick={() => setIsSubSectionActive(!isSubSectionActive)}>
          <div className='flex gap-[1rem] justify-start items-center text-[16px] text-richblack-100'>
            <HiOutlineDesktopComputer />
            <p className='text-richblack-25'>{subSection?.title}</p>
            {
              isSubSectionActive ? (<FaChevronUp className='text-richblack-200' />) : (<FaChevronDown className='text-richblack-200' />)
            }
          </div>
          <p className='text-[16px] text-richblack-100'>{time}</p>
        </div>
        {
          isSectionActive && isSubSectionActive && <div className='text-[16px] text-richblack-200 px-[2rem] transition-all duration-300'>{subSection?.description}</div>
        }
      </div>
    </>
  )
}

export default SubDropDown