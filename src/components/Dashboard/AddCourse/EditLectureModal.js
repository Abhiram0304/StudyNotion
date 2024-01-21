import React from 'react'
import { ImCross } from "react-icons/im";
import Upload from './Upload';
import Button from '../../HomePage/Button';

const EditLectureModal = ({data,setValue,register,errors,setEditSubSectionModal}) => {

    const modalStyles = {
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(3px)'
    };

  return (
    <div className='absolute bg-richblack-100 top-0 left-0 w-[100vw] h-[100%] z-[10] flex justify-center items-center' style={modalStyles} >
        <div className='lg:w-[35vw] md:w-[65vw] w-[95vw] rounded-lg overflow-hidden'>
            <div className='bg-richblack-700 px-[1rem] py-[0.5rem] flex w-[100%] justify-between items-center'>
                <p className='font-semibold text-[18px] text-richblack-5'>{data?.editMode ? ("Editing Lecture") : ("Adding Lecture") }</p>
                <ImCross onClick={() => setEditSubSectionModal(null)} className='text-[18px] text-richblack-50 cursor-pointer' />
            </div>
            <div className='bg-richblack-800 px-[1rem] py-[0.5rem] flex flex-col gap-[1rem] w-[100%] justify-center items-center'>
                <Upload name={"lecture"} label={"Lecture Video"} setValue={setValue} register={register} video={true} errors={errors} />
                <label className='w-full flex flex-col gap-[2px]'>
                    <div className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Lecture Title<p className='text-[red]'>*</p></div>
                    <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='text' id='lectureName' name='lectureName' placeholder='Enter Lecture Title' {...register("lectureName",{required:true})} />
                    {
                        errors.lectureName && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter Lecture Name
                            </span>
                        )
                    }
                </label>
                {/* <div className='w-full flex flex-col gap-[2px] justify-center items-start'>
                    <div className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Video Playback Time<p className='text-[red]'>*</p></div>
                    <div className='w-full flex flex-row gap-[1rem] justify-between items-center'>
                        <label className='w-full flex flex-col gap-[2px]'>
                            <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='number' name='hourTime' placeholder='HH' {...register("hourTime",{required:true})} />
                            {
                                errors.hourTime && (
                                    <span className='mt-1 text-[12px] text-[red]'>
                                        Please Enter Proper Time
                                    </span>
                                )
                            }
                        </label>
                        <label className='w-full flex flex-col gap-[2px]'>
                            <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='number' name='minuteTime' placeholder='MM' {...register("minuteTime",{required:true})} />
                            {
                                errors.minuteTime && (
                                    <span className='mt-1 text-[12px] text-[red]'>
                                        Please Enter Proper Time
                                    </span>
                                )
                            }
                        </label>
                        <label className='w-full flex flex-col gap-[2px]'>
                            <input className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='number' name='secondTime' placeholder='SS' {...register("secondTime",{required:true})} />
                            {
                                errors.secondTime && (
                                    <span className='mt-1 text-[12px] text-[red]'>
                                        Please Enter Proper Time
                                    </span>
                                )
                            }
                        </label>
                    </div>
                </div> */}
                <label className='w-full flex flex-col gap-[2px]'>
                    <div className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>Lecture Description<p className='text-[red]'>*</p></div>
                    <textarea rows={2} className='w-full bg-richblack-700 border-b-[2px] text-[16px] border-richblack-400 text-richblack-200 rounded-md py-[0.5rem] px-[1rem]' type='text' id='lectureDescription' name='lectureDescription' placeholder='Enter Lecture Description' {...register("lectureDescription",{required:true})} />
                    {
                        errors.lectureDescription && (
                            <span className='mt-1 text-[12px] text-[red]'>
                                Please Enter Lecture Description
                            </span>
                        )
                    }
                </label>
                <div className='w-full flex gap-[1rem] justify-end items-center'>
                    <button onClick={data?.b2Handler}><Button active={false}>Cancel</Button></button>
                    <button onClick={data?.b1Handler}><Button active={true}>Save Edits</Button></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditLectureModal