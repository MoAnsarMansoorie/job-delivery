import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import VITE_API_END_POINT from "../constant.js"

const LogIn = () => {
    const primaryColor = "#ff4d2d";
    // const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginHandle = async () => {
      try {
        const result = await axios.post(`${VITE_API_END_POINT}/api/v1/auth/login`, {
          email,
          password
        }, {withCredentials: true})

        console.log(result)
        
      } catch (error) {
        console.log(`Error in submitting data`, error)
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{backgroundColor: bgColor}}>
        <div className={`bg-white border shadow-lg w-full max-w-md p-8 rounded-xl`} style={{borderColor: borderColor}}>
            <h1 className={`text-3xl font-bold mb-2`} style={{color: `${primaryColor}`}}>Foodie</h1>
            <p>LogIn your account to get started with delicious food deliveries</p>

            {/* email */}
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email:</label>
              <input type='text' className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            {/* password */}
            <div className='mb-1'>
              <label htmlFor='password' className='block text-gray-700 font-medium mb-1'>Password:</label>
              <div className='relative'>
                <input type={`${showPassword? "text": "password"}`} className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your password' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye/> : <LuEyeClosed/>}</button>
              </div>
            </div>

            <button className='text-right mb-4 text-sm cursor-pointer text-red-500' onClick={() => navigate("/forgot-password")}>
              Forgot Password
            </button>

            <button className={`w-full font-semibold rounded-lg bg-[#ff4d2d] text-white transition duration-300 py-2 hover:bg-[#e64323]`} onClick={loginHandle} >Sign In</button>

            <button className='w-full mt-4 flex items-center justify-center border border-gray-200 px3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 font-medium gap-2'>
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>

            <p className='mt-1 text-sm text-center'>Do not have an account? Please <span className='text-[#e64323] cursor-pointer' onClick={() => navigate("/signup")}>SignUp</span></p>
        </div>
    </div>
  )
}

export default LogIn
