import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, Route,useLocation, matchPath } from 'react-router-dom'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import {BiChevronDown} from 'react-icons/bi'
import Button from '../HomePage/Button'
import { useSelector } from 'react-redux'
import {FaShoppingCart} from 'react-icons/fa'
import ProfileDropDown from './ProfileDropDown'
import { APIconnector } from '../../services/APIconnector'
import { categories } from '../../services/APIs'

const Navbar = () => {

    const location = useLocation()
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);

    const [subLinks,setSubLinks] = useState([]);

    useEffect(() => {
        const fetchSubLinks = async() => {
            try{
                const result = await APIconnector("GET",categories.CATEGORIES_API);
                console.log(result.data.allCategory);
                setSubLinks(result.data.allCategory);
            }catch(e){
                console.log(e);
            }
        }

        fetchSubLinks();
    },[])

  return (
    <div className='flex h-14 bg-richblack-900 items-center justify-center border-b-[2px] border-richblack-700 transition-all duration-200'>
        <div className='md:w-4/5 w-5/6 flex max-w-[1260px] text-[18px] items-center justify-between mx-auto py-[12px]'>
            <div className='w-[160px] h-[32px] items-center justify-center'>
                <Link to={'/'}><img src={Logo} alt="Logo" className='lg:w-[160px] lg:h-[32px] md:w-[150px] w-[120px] h-[25px]' loading="lazy" /></Link>
            </div>
            <div className='md:flex md:visible hidden items-center justify-center gap-[2rem] text-white transition-all duration-200'>
                    {
                        NavbarLinks.map((each,index) => {
                            return (
                                (each.title !== 'Catalog') ?
                                (<Link className={`${matchRoute(each.path) ? "text-yellow-50 font-semibold" : "text-richblack-25"} transition-all duration-200`} key={index} to={each.path}><div>{each.title}</div></Link>)
                                : 
                                (<div key={index} className='relative text-richblack-25 cursor-pointer flex justify-center items-center gap-[5px] group transition-all duration-300'>
                                    {each.title}
                                    <BiChevronDown />
                                    <div className='absolute rounded-md left-[-30%] top-[140%] w-auto min-w-[250px] px-[1rem] py-[1rem] transition-all duration-200 bg-white text-richblack-700 flex flex-col z-[3] gap-[8px] invisible group-hover:visible'>
                                        {
                                            subLinks.map((each,index) => {
                                                return (
                                                    <Link key={index}><div className='hover:scale-105 transition-all duration-200'>{each.name}</div></Link>
                                                )
                                            } )
                                        }
                                        <div className='absolute left-[20%] top-[-7%] h-6 w-6 rotate-45 rounded bg-white'></div>
                                    </div>
                                </div>
                                )
                            )
                        })
                    }
            </div>
            <div className='flex gap-[8px] items-center justify-center'>

                {
                    user && user.accountType !== "Instructor" && (
                        <Link to='/dashboard/cart' className='relative'>
                            <FaShoppingCart />
                            {
                                totalItems>0 ? (<span>{totalItems}</span>) : ("")
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <div className='flex md:gap-[1rem] gap-[0.2rem]'>
                            <Button active={false} linkedTo={'/login'}>Login</Button>
                            <Button active={false} linkedTo={'/signup'}>Sign Up</Button>
                        </div>
                    )
                }
                {
                    token!==null && (
                        <ProfileDropDown />
                    )
                }

                
            </div>
        </div>
    </div>
  )
}

export default Navbar