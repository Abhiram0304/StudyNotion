import React from 'react'
import { Link } from 'react-router-dom'

const FooterPart = (props) => {
    const heading = props.heading;
    const content = props.content;
  return (
    <div className='flex flex-col gap-2 items-start justify-start'>
        <h2 className='font-semibold mb-[8px] text-richblack-100 text-[16px]'>{heading}</h2>
        <div className='text-richblack-400 text-[14px] flex flex-col gap-2'>
            {
                content.map((each, index) => {
                return (
                    <Link to={`/${each.path}`} key={index}><p className='hover:font-semibold hover:scale-105 hover:text-richblack-300 transition-all duration-200'>{each.topic}</p></Link>
                    );
                })
            }
        </div> 

    </div>
  )
}

export default FooterPart