import React,{useState} from 'react'
import Button from '../HomePage/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import LogOutModal from '../Dashboard/LogOutModal';
import {AiFillCaretDown} from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProfileDropDown = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile)

  const [openModal,setOpenModal] = useState(null);
  const [dropDown,setDropDown] = useState(false);

  return (
    <div>
      <div className='relative flex text-white justify-center items-center gap-[0.5rem] cursor-pointer'>
        
        {
          dropDown && 
          <div className='flex flex-col absolute top-[2.5rem] right-0 bg-richblack-700 rounded-lg bg-opacity-50 z-10 backdrop-blur-lg'>
            <button className='px-[0.5rem] py-[0.5rem] bg-transparent text-white font-semibold text-[1rem]' onClick={() => setOpenModal({  
                            heading:"Are you sure?",
                            subheading:"You will be logged out of your account.",
                            b1txt:"Log out",
                            b2txt:"Cancel",
                            btn1Handler:() => dispatch(logout(navigate)),
                            btn2Handler:() => setOpenModal(null)  
                        })}>
                        Log Out
            </button>
            <Link to='/dashboard/myProfile'><button className='px-[0.5rem] py-[0.5rem] bg-transparent text-white font-semibold text-[1rem]'>Dashboard</button></Link>
            <button className='px-[0.5rem] py-[0.5rem] bg-transparent text-white font-semibold text-[1rem]' onClick={() => setDropDown(false)}>Back</button>
          </div>
        }
        
        
        <div className='flex gap-[0.5rem] justify-center items-center' onClick={() => setDropDown(true)}>
          <img className='w-[30px] h-[30px] rounded-full' src={user?.image} />
          <AiFillCaretDown />
        </div>
      </div>
      
      {
        openModal && <LogOutModal data={openModal} />
      }

    </div>
  )
}

export default ProfileDropDown