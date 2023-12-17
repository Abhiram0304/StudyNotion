import React, { useEffect, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileDropDown from './ProfileDropDown';
import { APIconnector } from '../../services/APIconnector';
import { categories } from '../../services/APIs';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { NavbarLinks } from '../../data/navbar-links';
import Button from '../HomePage/Button';
import { ImCross } from "react-icons/im";
import { FiMenu } from "react-icons/fi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdContactSupport } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchSubLinks = async () => {
      try {
        const result = await APIconnector('GET', categories.CATEGORIES_API);
        console.log(result.data.allCategory);
        setSubLinks(result.data.allCategory);
      } catch (e) {
        console.log(e);
      }
    };

    fetchSubLinks();
  }, []);

  function handleClose(){
    setMenuOpen(false);
  }

  return (
    <>
      <div className='flex h-14 px-[1rem] bg-richblack-900 items-center justify-between border-b-[2px] border-richblack-700 transition-all duration-100'>
        <div className='w-[160px] h-[32px] flex items-center justify-start'>
          <button onClick={() => setMenuOpen(true)} className='text-[white] text-[1.5rem] font-extrabold md:hidden flex'>
            <FiMenu />
          </button>
          <Link to={'/'}>
            <img
              src={Logo}
              alt='Logo'
              className='w-[150px] md:flex hidden'
              loading='lazy'
            />
          </Link>
        </div>

        <div className={`absolute top-0 left-0 md:hidden ${menuOpen ? "w-[70vw] flex" : "w-0"} h-[100vh] z-[10] transition-all duration-200`}>
          <Sidebar backgroundColor="black" width='70vw' collapsedWidth='0' collapsed={!menuOpen}>
            <Menu>
              <div className=' bg-[black] text-white absolute right-[0.5rem] top-[0.5rem] text-[1.2rem]' onClick={handleClose}><ImCross /></div>
              <MenuItem className='w-full mt-[2rem] text-white bg-transparent font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' component={<Link to={'/'} onClick={handleClose} />}><div className='flex gap-[0.5rem] justify-center items-center'><FaHome /><p>Home</p></div></MenuItem>
              <MenuItem className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' component={<Link to={'/about'} onClick={handleClose} />}><div className='flex gap-[0.5rem] justify-center items-center'><BsFillInfoCircleFill /><p>About Us</p></div></MenuItem>
              <MenuItem className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' component={<Link to={'/contact'} onClick={handleClose} />}><div className='flex gap-[0.5rem] justify-center items-center'><MdContactSupport /><p>Contact Us</p></div></MenuItem>
              {
                token && <MenuItem className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' component={<Link to={'/dashboard/myProfile'} onClick={handleClose} />}><div className='flex gap-[0.5rem] justify-center items-center'><RxDashboard /><p>Dashboard</p></div></MenuItem>
              }
            </Menu>
          </Sidebar>
        </div>

        <div className='md:flex md:visible hidden items-center justify-center gap-[2rem] text-white transition-all duration-200'>
          {NavbarLinks.map((each, index) => {
            return (
              each.title !== 'Catalog' ? (
                <Link
                  className={`${
                    matchRoute(each.path)
                      ? 'text-yellow-50 font-semibold'
                      : 'text-richblack-25'
                  } transition-all duration-200`}
                  key={index}
                  to={each.path}
                >
                  <div>{each.title}</div>
                </Link>
              ) : (
                <div
                  key={index}
                  className='relative text-richblack-25 cursor-pointer flex justify-center items-center gap-[5px] group transition-all duration-300'
                >
                  {each.title}
                  <BiChevronDown />
                  <div className='absolute rounded-md left-[-30%] top-[140%] w-auto min-w-[250px] px-[1rem] py-[1rem] transition-all duration-200 bg-white text-richblack-700 flex flex-col z-[3] gap-[8px] invisible group-hover:visible'>
                    {subLinks.map((each, index) => {
                      return (
                        <Link key={index}>
                          <div className='hover:scale-105 transition-all duration-200'>
                            {each.name}
                          </div>
                        </Link>
                      );
                    })}
                    <div className='absolute left-[20%] top-[-7%] h-6 w-6 rotate-45 rounded bg-white'></div>
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className='flex gap-[8px] items-center justify-center'>
          {user && user.accountType !== 'Instructor' && (
            <Link to='/dashboard/cart' className='relative'>
              <FaShoppingCart />
              {totalItems > 0 ? <span>{totalItems}</span> : ''}
            </Link>
          )}
          {token === null && (
            <div className='flex md:gap-[1rem] gap-[0.2rem]'>
              <Button active={false} linkedTo={'/login'}>
                Login
              </Button>
              <Button active={false} linkedTo={'/signup'}>
                Sign Up
              </Button>
            </div>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
