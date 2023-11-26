import React from 'react'
import { FooterLink2 } from '../../data/footer-links'
import FooterLogo from '../../assets/Logo/Logo-Full-Light.png'
import FooterPart from './FooterPart'
import {FaFacebookSquare,FaGoogle,FaTwitterSquare,FaYoutube,FaRegCopyright} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='font-inter w-full mx-auto bg-richblack-800 lg:px-[10rem] px-[1rem] lg:py-[3rem] py-[1.5rem] border-t-[2px] border-richblack-500'>
        <div className='relative flex lg:flex-nowrap flex-wrap justify-center w-full gap-[4rem] h-auto'>
            <div className='flex flex-wrap gap-[2rem] mx-auto lg:w-1/2 w-4/5 justify-between'>
                <div className='flex flex-col gap-7'>
                    <img src={FooterLogo} className='w-[160px]' />
                    <FooterPart heading={"Company"} content={[
                        {topic:"About", path:"/about"},
                        {topic:"Affiliates", path:"/Affiliates"},
                        {topic:"Carrer", path:"/career"}
                    ]} />
                    <div className='flex gap-2 text-richblack-400 text-[20px]'>
                        <Link to={'https://www.facebook.com'}><FaFacebookSquare className='hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                        <Link to={'https://www/google.com'}><FaGoogle className='hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                        <Link to={'https://www.twitter.com'}><FaTwitterSquare className='hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                        <Link to={'https://www.youtube.com'}><FaYoutube className='hover:scale-105 transition-all duration-200 cursor-pointer' /></Link>
                    </div>
                </div>
                <div className='flex flex-col gap-7'>
                    <FooterPart heading={"Resources"} content={[
                        {topic:"Articles", path:"/articles"},
                        {topic:"Blog", path:"/blog"},
                        {topic:"Cheat Sheet", path:"/cheatsheet"},
                        {topic:"Code challenges", path:"/codechallenges"},
                        {topic:"Docs", path:"/docs"},
                        {topic:"projects", path:"/projects"},
                        {topic:"Articles", path:"/articles"},
                        {topic:"Videos", path:"/videos"},
                        {topic:"workspaces", path:"/workspaces"}
                    ]}/>

                    <FooterPart heading={"Support"} content={[{topic:"Help Center",path:"/helpcenter"}]} />
                </div>
                <div className='flex flex-col gap-7'>
                    <FooterPart heading={"Plans"} content={[
                        {topic:"Paid memberships", path:"/paidmembership"},
                        {topic:"For students", path:"/forstudents"},
                        {topic:"Business solutions ", path:"/businesssolutions"}
                    ]} />

                    <FooterPart heading={"Community"} content={[
                        {topic:"Forums", path:"/forums"},
                        {topic:"Chapters", path:"/chapters"},
                        {topic:"Events", path:"/events"}
                    ]} />
                </div>
            </div>
            <div className='lg:w-[2px] w-[0px] items-stretch bg-richblack-700'></div>
            <div className='flex flex-wrap gap-[2rem] justify-between mx-auto lg:w-1/2 w-4/5'>
                <FooterPart heading={FooterLink2[0].title} content={FooterLink2[0].links} />
                <FooterPart heading={FooterLink2[1].title} content={FooterLink2[1].links} />    
                <FooterPart heading={FooterLink2[2].title} content={FooterLink2[2].links} />
            </div>
        </div>

        <div className='w-full flex md:flex-row flex-col justify-between pt-[2rem] mt-[2rem] border-t-[2px] border-richblack-700 text-[14px] text-richblack-300 '>
            <div className='flex md:mx-0 mx-auto gap-[8px]'>
                <Link to={'/privacypolicy'}>Privacy Policy</Link>
                <div className='w-[2px] bg-richblack-700 items-stretch'></div>
                <Link to={'/cookiepolicy'}>Cookie Policy</Link>
                <div className='w-[2px] bg-richblack-700 items-stretch'></div>
                <Link to={'/terms'}>Terms</Link>
            </div>
            <div className='flex md:mx-0 mx-auto md:mt-[0px] mt-[10px] items-center gap-[7px]'>Made by Abhiram <FaRegCopyright /> 2023 StudyNotion</div>
        </div>
    </div>
  )
}

export default Footer