import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,linkedTo}) => {
  return (
    <Link to={linkedTo}>
        <div className={`flex gap-[10px] font-semibold justify-center items-center py-2 px-3 text-[16px] rounded-md border-r-[2px] border-b-[2px] text-center hover:scale-105 transition-all duration-200 cursor-pointer ${active ? "bg-yellow-50 text-black border-yellow-5" : "bg-richblack-800 border-richblack-600 text-white"} `}>
            {children}
        </div>
    </Link>
  )
};

export default Button