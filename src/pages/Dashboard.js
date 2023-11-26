import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import DashboardSideBar from '../components/Dashboard/DashboardSideBar'

const Dashboard = () => {

  const {loading:authLoading} = useSelector((state) => state.auth);
  const {loading:profileLoading} = useSelector((state) => state.auth);

  if(profileLoading || authLoading){
    return (
      <div>
        Spinner
      </div>
    )
  }

  return (
    <div className='relative w-100vw min-h-[100vh] flex justify-center bg-richblack-900 text-richblack-5'>
      <DashboardSideBar />
      <Outlet />
    </div>
  )
}

export default Dashboard