import React, { useState } from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { logout } from '../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardSideBarLink from './DashboardSideBarLink'
import { VscSignOut } from 'react-icons/vsc'
import LogOutModal from './LogOutModal'

const DashboardSideBar = () => {

    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openModal,setOpenModal] = useState(null);

    if(profileLoading || authLoading){
        return (
          <div>
            Loading...
          </div>
        )
      }

  return (
    <div className='relative w-[15%] min-h-[100vh] bg-richblack-800'>
        <div className='relative font-inter flex flex-col h-full w-full border-r-[2px] border-richblack-700 min-h-[calc[100vh-3.5rem]] py-[1rem]'>
            <div className='mt-[1rem]'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        else{
                            return (
                                <DashboardSideBarLink key={link.id} link={link} />
                            )
                        }
                    })
                }
            </div>
            <div className='my-6 mx-auto w-10/12 h-[2px] bg-richblack-600'></div>
            <div className='relative flex flex-col'>
                <DashboardSideBarLink link={{name:"Settings",path:"/dashboard/settings",icon:"VscSettingsGear"}} />
                <button
                    onClick={() => setOpenModal({  
                        heading:"Are you sure?",
                        subheading:"You will be logged out of your account.",
                        b1txt:"Log out",
                        b2txt:"Cancel",
                        btn1Handler:() => dispatch(logout(navigate)),
                        btn2Handler:() => setOpenModal(null)  
                    })}
                > 
                <div className='flex justify-start gap-[0.5rem] items-center text-richblack-300 relative px-8 py-2 text-sm font-medium transition-all duration-200'>
                    <VscSignOut />
                    <span>Log out</span>
                </div>
                </button>
            </div>
        </div>

        {
            openModal && <LogOutModal data={openModal} />
        }
    </div>
  )
}

export default DashboardSideBar