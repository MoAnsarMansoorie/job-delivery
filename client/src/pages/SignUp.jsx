import React, { useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import VITE_API_END_POINT from "../constant.js"

const SignUp = () => {
    const primaryColor = "#ff4d2d";
    // const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const signupHandle = async () => {
      try {
        const result = await axios.post(`${VITE_API_END_POINT}/api/v1/auth/register`, {
          fullName,
          email,
          mobile,
          password,
          role
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
            <p>Create your account to get started with delicious food deliveries</p>

            {/* fullName */}
            <div className='mb-4'>
              <label htmlFor='fullName' className='block text-gray-700 font-medium mb-1'>Full Name:</label>
              <input type='text' className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your fullname' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setFullName(e.target.value)} value={fullName} />
            </div>

            {/* email */}
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email:</label>
              <input type='text' className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>

            {/* mobile */}
            <div className='mb-4'>
              <label htmlFor='mobile' className='block text-gray-700 font-medium mb-1'>Mobile:</label>
              <input type='text' className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your mobile' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setMobile(e.target.value)} value={mobile} />
            </div>

            {/* password */}
            <div className='mb-4'>
              <label htmlFor='password' className='block text-gray-700 font-medium mb-1'>Password:</label>
              <div className='relative'>
                <input type={`${showPassword? "text": "password"}`} className='w-full rounded-lg border px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your password' style={{border: `1px solid ${borderColor}`}} onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className='absolute right-3 top-3 text-gray-500 cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <FaRegEye/> : <LuEyeClosed/>}</button>
              </div>
            </div>

            {/* role */}
            <div className='mb-4'>
              <label htmlFor='role' className='block text-gray-700 font-medium mb-1'>Role:</label>
              <div className='flex gap-2'>
                {["user", "owner", "deliveryBoy"].map((r) => (
                  <button className='flex-1 border rounded-lg px-3 py-2 font-medium text-center transition-colors'
                  onClick={() => setRole(r)}
                  style={
                    role == r ? {backgroundColor: primaryColor, color: 'white'} : {border: `1px solid ${primaryColor}`, color: primaryColor}
                  }
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button className={`w-full font-semibold rounded-lg bg-[#ff4d2d] text-white transition duration-300 py-2 hover:bg-[#e64323]`} onClick={signupHandle} >Sign Up</button>

            <button className='w-full mt-4 flex items-center justify-center border border-gray-200 px3 py-2 rounded-lg transition-all duration-300 hover:bg-gray-200 font-medium gap-2'>
              <FcGoogle size={20} />
              <span>Continue with Google</span>
            </button>

            <p className='mt-1 text-sm text-center'>Already Have an account? Please <span className='text-[#e64323] cursor-pointer' onClick={() => navigate("/login")}>SignIn</span></p>
        </div>
    </div>
  )
}

export default SignUp
