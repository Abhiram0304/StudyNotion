import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUploadCloud } from "react-icons/fi";
import { useDropzone } from 'react-dropzone';
import { Player } from 'video-react';
import "video-react/dist/video-react.css";
import Button from '../../HomePage/Button'

const Upload = ({name,label,setValue,getValues,register,video,errors,editCourse}) => {
  
    const [selectedFile,setSelectedFile] = useState(null);
    const [preview,setPreview] = useState(null);
    const inputRef = useRef();

    const onDrop = (droppedFile) => {
        const file = droppedFile[0];
        if(file){
            setSelectedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setPreview(reader.result);
            }
        }
    }

    useEffect(() => {
        if(editCourse){
            const data = getValues();
            const file = data?.thumbnail;
            setPreview(file);
        }
    },[]);

    useEffect(() => {
        register(name,{required:true});
    },[register]);

    useEffect(() => {
        setValue(name,selectedFile);
    },[selectedFile,setValue]);
  
    const {getRootProps,getInputProps,isDragActive} = useDropzone({
        accept : video ? {"video/*" : [".mp4"]} : {"image/*" : [".jpeg",".jpg",".png"]},onDrop,
    })

    const removeFileHandler = () => {
        setSelectedFile(null);  
        setPreview(null);
    }

    return (
        <label className='w-full flex flex-col gap-[2px]'>
            <p className='text-richblack-5 flex gap-1 items-center text-[14px] tracking-wide'>{label}<p className='text-[red]'>*</p></p>
            <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex min-h-[250px] px-[1rem] py-[1rem] cursor-pointer items-center justify-center rounded-md border-[2px] border-dashed border-richblack-500`} >
                {
                    preview ? 
                        (
                            <div className='w-[90%] h-[90%] rounded-lg overflow-hidden flex flex-col gap-[1rem] justify-center items-center object-cover'>
                                {
                                    !video ? 
                                        (<img src={preview} alt='preview' className='w-full h-full object-cover rounded-lg' />) 
                                        : 
                                        (<Player src={preview} className='w-full h-full flex object-cover rounded-lg' aspectRatio='16:9' playsInline={true} />)
                                }
                                <div className='flex items-center justify-center gap-[3rem]'>
                                    {/* <Button active={true}><div onClick={uploadHandler}>Upload</div></Button> */}
                                    <Button active={false}><div onClick={removeFileHandler}>Remove</div></Button>
                                </div>
                            </div>
                        ) 
                        : 
                        (
                            <div className='w-full h-full' {...getRootProps()}>
                                <input className='w-full h-full' ref={inputRef} {...getInputProps()} />
                                <div className='px-[1rem] flex justify-center items-center flex-col gap-[0.5rem]'>
                                    <div className='flex justify-center items-center px-[12px] bg-pure-greys-800 py-[12px] rounded-full overflow-hidden'>
                                        <FiUploadCloud className='text-yellow-5 text-[22px]' />
                                    </div>
                                    <div className='max-w-[50%] text-[14px] font-medium text-richblack-200 text-center'>Drag and drop an {video ? "video" : "image"}, or<p className='text-yellow-5 font-semibold'>Browse</p>to Select a file.</div>
                                    <ul className='w-full flex lg:flex-row flex-col lg:gap-[1rem] gap-[0] justify-evenly items-center list-disc'>
                                        <li>Aspect Ratio 16:9</li>
                                        <li>Recommmended Size : 1024x576</li>
                                    </ul>
                                </div>
                            </div>
                        )
                }
            </div>
            {
                errors.label && (
                    <span className='mt-1 text-[12px] text-[red]'>
                        Please Select a file For ThumbNail
                    </span>
                )
            }
        </label>
  )
}

export default Upload