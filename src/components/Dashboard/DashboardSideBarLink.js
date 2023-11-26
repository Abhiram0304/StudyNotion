import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

const DashboardSideBarLink = ({link}) => {

    const Icon = Icons[link.icon];
    const location = useLocation();

    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname)
    }

  return (
    <NavLink 
        to={link.path}
        className={`relative flex justify-start gap-[0.5rem] items-center px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50 border-l-[3px] border-yellow-50"
          : "bg-opacity-0 text-richblack-300"}
          transition-all duration-200`}
      >
        <Icon />
        <span>{link.name}</span>
    </NavLink>
  )
}

export default DashboardSideBarLink