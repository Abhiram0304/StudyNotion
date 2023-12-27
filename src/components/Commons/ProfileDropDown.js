import React,{useState} from 'react'
import Button from '../HomePage/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import LogOutModal from '../Dashboard/LogOutModal';

const ProfileDropDown = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile)

  const [openModal,setOpenModal] = useState(null);

  return (
    <>
      <div className={`absolute ${openModal==null ? "hidden" : "block"} flex z-[100] w-[100vw] h-[100vh] left-0 top-0 right-0`}>
          {
            openModal && <LogOutModal data={openModal} />
          }
      </div>
      <div className='relative flex text-white justify-center items-center gap-[0.5rem] cursor-pointer'>
        <div className='relative flex justify-center items-center gap-[0.5rem]'>
          <div className='flex items-center justify-start' onClick={() => setOpenModal({  
                  heading:"Are you sure?",
                  subheading:"You will be logged out of your account.",
                  b1txt:"Log out",
                  b2txt:"Cancel",
                  btn1Handler:() => dispatch(logout(navigate)),
                  btn2Handler:() => setOpenModal(null)  
              })}>
              <Button active={false}>LogOut
              </Button>
          </div>
          <div className='md:flex hidden justify-center items-center'><Button active={true} linkedTo={"/dashboard/myProfile"}>Dashboard</Button></div>
        </div>        
        
        <div className='flex justify-center items-center'>
          <img className='w-[30px] h-[30px] rounded-full' src={user?.image} />
        </div>
      </div>
    </>
  )
}

export default ProfileDropDown