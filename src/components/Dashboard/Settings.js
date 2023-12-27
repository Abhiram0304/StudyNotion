import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../HomePage/Button'
import {FaTrashAlt} from 'react-icons/fa'
import {deleteAccount} from '../../services/operations/settingsAPI'
import SettingsChangePassword from './SettingsChangePassword'
import EditProfile from './EditProfile'
import LogOutModal from './LogOutModal'
import { FiUpload } from 'react-icons/fi'
import { useRef } from 'react'
import {updateProfileImage} from '../../services/operations/settingsAPI'

const Settings = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [modalOpen,setModalOpen] = useState(null);
    const [imageFile,setImageFile] = useState(null);
    const [imagePreview,setPreviewImage] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        console.log(user);
    },[user]);

    const fileInputRef = useRef(null);

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        }
    }

    const fileChangeHandler = (event) => {
        const image = event.target.files[0];
        if(image){  
            setImageFile(image);
            previewFile(image);
        }
    }

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setImageFile(null);
    }

    useEffect(() => {
        if (imageFile) {
          previewFile(imageFile)
        }
    },[imageFile]);

    const fileUploadHandler = async() => {
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append("displayPicture", imageFile);
            await dispatch(updateProfileImage(formData,token));
            console.log("USER IMAGE AFTER DISPATCH :",user);
            setLoading(false);
            setPreviewImage(null);
            setImageFile(null);
        }catch(e){
            setLoading(false);
            throw new Error(e);
        }
        
    }

  return (
    <div className='font-inter min-h-[100vh] lg:w-[85%] md:w-[75%] w-[100%] bg-richblack-900'>
        <div className='md:px-[2rem] px-[0.5rem] md:py-[3rem] py-[2rem] flex flex-col gap-[1.5rem] lg:w-3/4 w-[95%] mx-auto'>

            <h1 className='text-richblack-5 font-edu-sa font-semibold text-[36px] mb-[10px]'>Settings</h1>

            <div className='flex justify-between items-center md:px-[1.5rem] px-[0.5rem] md:py-[1.5rem] py-[1rem] bg-richblack-800 rounded-xl'>
                <div className='flex items-center justify-center'>
                    <div className='w-full flex gap-[2rem] md:justify-center justify-between items-center'>
                    <div className='md:w-[80px] md:h-[80px] w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'><img src={imagePreview!==null ? imagePreview : user?.image} width={"100%"} alt='userImage' /></div>
                        <div className='flex flex-col justify-between items-center gap-[1rem]'>
                            <h2 className='text-richblack-5 font-medium text-[20px]'>Change Profile Picture</h2>
                            <div className='flex items-center justify-center gap-[1rem]'>
                                <div className="flex flex-row gap-3">
                                    {
                                        (imagePreview===null) ? 
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={fileChangeHandler}
                                                style={{ backgroundColor: 'black', height: '30px', width: '100px' }}
                                                className='cursor-pointer'
                                                accept="image/png, image/gif, image/jpeg"
                                            /> 
                                            : 
                                            <div className='flex items-center justify-center gap-[0.5rem]' onClick={fileUploadHandler} >   
                                                <Button active={true}>
                                                    {loading ? "Uploading..." : "Upload"}
                                                    {!loading && 
                                                        (
                                                        <FiUpload className="text-lg text-richblack-900" />
                                                        )
                                                    }
                                                </Button>
                                            </div>
                                    }
                                
                                </div>
                                <div onClick={handleRemoveImage}><Button active={false}>Remove</Button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between items-center md:px-[1.5rem] px-[0.5rem] md:py-[1.5rem] py-[1rem] bg-richblack-800 rounded-xl'>
                <EditProfile />
            </div>

            <div className='flex flex-col md:px-[1.5rem] px-[0.5rem] md:py-[1.5rem] py-[1rem] bg-richblack-800 rounded-xl'>
                <SettingsChangePassword />
            </div>

            <div className='flex justify-between items-center lg:px-[2.5rem] py-[1.5rem] bg-pink-900 rounded-xl'>
                <div className='flex items-center gap-[1rem] px-[0.5rem] w-full justify-between'>
                    <div className='flex flex-col gap-[2rem]'>
                        <div onClick={() => setModalOpen({
                                heading:"Are you sure?",
                                subheading:"You Account Will be Deleted Permenantly.",
                                b1txt:"Continue",
                                b2txt:"Cancel",
                                btn1Handler:() => dispatch(deleteAccount(token,navigate)),
                                btn2Handler:() => setModalOpen(null),
                        })
                        } className='px-[1rem] cursor-pointer py-[1rem] bg-pink-700 flex items-center justify-center rounded-full hover:scale-105 transition-all duration-200'>
                            <FaTrashAlt className='text-[1.5rem] text-pink-200' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[1px]'>
                        <h2 className='text-richblack-5 text-[18px] font-semibold tracking-wide'>Delete Account</h2>
                        <p className='text-pink-25 text-[14px] font-medium leading-[22px]'>Would you like to delete account?</p>
                        <p className='text-pink-25 text-[14px] font-medium leading-[22px]'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                        <p className='text-pink-300 text-[16px] italic tracking-wide keading-[24px]'>I want to delete my account.</p>
                    </div>
                </div>
            </div>

        </div>

        {
            modalOpen && <LogOutModal data={modalOpen} />
        }
    </div>
  )
}

export default Settings