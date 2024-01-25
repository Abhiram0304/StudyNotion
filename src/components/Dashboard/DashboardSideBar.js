import React, { useState } from 'react'
import { sidebarLinks } from '../../data/dashboard-links'
import { logout } from '../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DashboardSideBarLink from './DashboardSideBarLink'
import { VscSignOut } from 'react-icons/vsc'
import LogOutModal from './LogOutModal'
import { ImCross } from "react-icons/im";
import { HiMenuAlt1 } from "react-icons/hi";

const DashboardSideBar = () => {

    const {user,loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openModal,setOpenModal] = useState(null);
    const [openSideBar, setOpenSideBar] = useState(false);

    if(profileLoading || authLoading){
        return (
          <div>
            Loading...
          </div>
        )
    }

  return (
    <>  
        <div className='font-semibold md:hidden flex text-[2.5rem] text-white px-[0.5rem] mt-[1rem]'><HiMenuAlt1 onClick={() => setOpenSideBar(true)}  /></div>
        <div className={`md:relative md:z-[0] z-[9] absolute left-0 top-0 bottom-0 lg:w-[15%] md:w-[25%] md:flex ${openSideBar ? "w-[65%]" : "w-0"} transition-all duration-200 min-h-[100vh] bg-richblack-800`}>
            <div onClick={() => setOpenSideBar(false)} className='absolute md:hidden flex top-[0.5rem] right-[0.5rem] z-[9] text-white text-[1.5rem]'><ImCross /></div>
            <div className='relative overflow-hidden font-inter flex flex-col h-full w-full border-r-[2px] border-richblack-700 min-h-[calc[100vh-3.5rem]] md:py-[1rem] py-[2rem]'>
                <div className='mt-[1rem]'>
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type) return null;
                            else{
                                return (
                                    <div onClick={() => setOpenSideBar(false)}><DashboardSideBarLink key={link.id} link={link} /></div>
                                )
                            }
                        })
                    }
                </div>
                <div className='my-6 mx-auto w-10/12 h-[2px] bg-richblack-600'></div>
                <div className='relative flex flex-col'>
                    <div onClick={() => setOpenSideBar(false)} ><DashboardSideBarLink link={{name:"Settings",path:"/dashboard/settings",icon:"VscSettingsGear"}} /></div>
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
    </>
  )
}

export default DashboardSideBar