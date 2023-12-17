import React, { useEffect, useState } from 'react';
import { Link, useLocation,useNavigate, matchPath } from 'react-router-dom';
import Logo from '../../assets/Logo/Logo-Full-Light.png';
import { BiChevronDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import ProfileDropDown from './ProfileDropDown';
import { APIconnector } from '../../services/APIconnector';
import { categories } from '../../services/APIs';
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
  const navigate = useNavigate();
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

  function handleClose(path){
    console.log(path);
    navigate(path);
    setMenuOpen(false);
  }

  return (
    <>
      <div className='relative flex h-14 px-[1rem] bg-richblack-900 items-center justify-between border-b-[2px] border-richblack-700 transition-all duration-100'>
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

        <div className={`absolute bg-black top-0 left-0 bottom-0 md:hidden overflow-hidden ${menuOpen ? "w-[60%]" : "w-[0]"} h-[100vh] z-[10] transition-all duration-200`}>
            <div className='flex flex-col gap-[1.5rem] px-[1rem] py-[3rem] overflow-hidden'>
              <div className=' bg-[black] text-white absolute right-[1rem] top-[1rem] text-[1.2rem]' onClick={() => setMenuOpen(false)}><ImCross /></div>
              <div className='w-full mt-[2rem] text-white bg-transparent font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' onClick={() => handleClose('/')} ><div className='flex gap-[0.5rem] justify-center items-center'><FaHome /><p>Home</p></div></div>
              <div className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' onClick={() => handleClose('/about')}><div className='flex gap-[0.5rem] justify-center items-center'><BsFillInfoCircleFill /><p>About Us</p></div></div>
              <div className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' onClick={() => handleClose('/contact')}><div className='flex gap-[0.5rem] justify-center items-center'><MdContactSupport /><p>Contact Us</p></div></div>
              {
                token && <div className='w-full text-white font-semibold text-[1.2rem] flex justify-start items-center hover:scale-105 transition-all duration-200' ><div className='flex gap-[0.5rem] justify-center items-center' onClick={() => handleClose('/dashboard/myProfile')}><RxDashboard /><p>Dashboard</p></div></div>
              }
            </div>
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
