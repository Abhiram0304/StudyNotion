import React, { useEffect } from 'react'
import Button from '../../HomePage/Button';

const EditModal = ({data,register}) => {
    
    const modalStyles = {
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(3px)'
    };
    

  return (
    <div className='absolute bg-richblack-100 top-0 left-0 w-[100vw] h-[100%] z-[10] flex justify-center items-center' style={modalStyles} >
      <div className='bg-richblack-800 px-[2rem] py-[2rem] rounded-lg'>
        <div className='flex flex-col gap-[0.3rem]'>
            <h1 className='text-richblack-5 font-semibold font-mono tracking-tighter text-[18px]'>{data?.heading}</h1>
            <label className='w-full flex flex-col gap-[2px]'>
				      <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='text' name='sectionName' placeholder={data?.placeholder} {...register("sectionName",{required:true})} />
			    </label>
            <div className='flex mt-[10px] gap-[2rem] items-center justify-center'>
                <button onClick={data?.b1Handler}><Button active={true}>{data?.b1txt}</Button></button>
                <button onClick={data?.b2Handler}><Button active={false}>{data?.b2txt}</Button></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default EditModal