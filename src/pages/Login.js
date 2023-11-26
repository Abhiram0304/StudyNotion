import React from 'react'
import Template from '../components/Templates/Template'
import LoginImage from '../assets/Images/login.jpg'

const Login = ({setLoggedIn}) => {
  return (
    <div className='w-full h-auto lg:min-h-full flex md:flex-row flex-col justify-center items-center bg-richblack-900'>
        <Template
            title="Welcome Back"
            desc1="Discover your passions,"
            desc2="Be Unstoppable"
            image={LoginImage}
            form="login"
            setLoggedIn={setLoggedIn}
         />
    </div>
  )
}

export default Login