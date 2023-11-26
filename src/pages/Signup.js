import React from 'react'
import Template from '../components/Templates/Template'
import SignUpImage from '../assets/Images/signup.jpg'

const Signup = ({setLoggedIn}) => {
  return (
    <div className='w-full h-auto lg:min-h-full flex md:flex-row flex-col justify-center items-center bg-richblack-900'>
        <Template 
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={SignUpImage}
            form="signup"
            setLoggedIn={setLoggedIn}
    />
    </div>
  )
}

export default Signup