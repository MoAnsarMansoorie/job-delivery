import React from 'react'
import { useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import VITE_API_END_POINT from "../constant.js"

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1 - email, 2 - OTP, 3 - reset password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const sendOtpHandler = async () => {
        try {
            const result = await axios.post(`${VITE_API_END_POINT}/api/v1/auth/send-otp`, {email}, {withCredentials: true});
            console.log(result)
            setStep(2);
            
        } catch (error) {
            console.log(`Error in sendOtp`, error)
        }
    }

    const verifyOtpHandler = async () => {
        try {
            const result = await axios.post(`${VITE_API_END_POINT}/api/v1/auth/verify-otp`, {email, otp}, {withCredentials: true});
            console.log(result);
            setStep(3);
            
        } catch (error) {
            console.log(`Error in verifyOtp`, error)
        }
    }

    const resetPasswordHandler = async () => {
        try {
            if(newPassword!=confirmNewPassword){
                return null;
            }
            const result = await axios.post(`${VITE_API_END_POINT}/api/v1/auth/reset-password`, {email, newPassword}, {withCredentials: true});
            console.log(result);
            navigate("/login");
            
        } catch (error) {
            console.log(`Error in reset password`, error);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full p-4 bg-[#e6ddd9]'>
            <div className='bg-white w-full max-w-md rounded-cl shadow-lg p-4'>
                <div className='flex items-center gap-3 mb-4'>
                    <IoIosArrowRoundBack size={30} className='cursor-pointer text-[#ff4d2d]' onClick={() => navigate("/login")} />
                    <h2 className='text-2xl font-semibold text-[#ff4d2d] text-center'>Forgot Password</h2>
                </div>

                {/* step 1 - email */}
                {
                    step === 1 && (
                        <div>
                            {/* email */}
                            <div className='mb-4'>
                                <label htmlFor='email' className='block text-gray-700 font-medium mb-1'>Email:</label>
                                <input type='text' className='w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <button className={`w-full font-semibold rounded-lg bg-[#ff4d2d] text-white transition duration-300 py-2 hover:bg-[#e64323]`} onClick={sendOtpHandler}>Send OTP</button>
                        </div>
                    )
                }

                {/* step 2 - OTP */}
                {
                    step === 2 && (
                        <div>
                            {/* otp */}
                            <div className='mb-4'>
                                <label htmlFor='otp' className='block text-gray-700 font-medium mb-1'>OTP:</label>
                                <input type='text' className='w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} value={otp} />
                            </div>
                            <button className={`w-full font-semibold rounded-lg bg-[#ff4d2d] text-white transition duration-300 py-2 hover:bg-[#e64323]`} onClick={verifyOtpHandler}>Verify</button>
                        </div>
                    )
                }

                {/* password */}
                {/* step 3 - New Password */}
                {
                    step === 3 && (
                        <div>
                            {/* new password */}
                            <div className='mb-4'>
                                <label htmlFor='newPassword' className='block text-gray-700 font-medium mb-1'>Password:</label>
                                <input type='text' className='w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                            </div>
                            {/* confirm password */}
                            <div className='mb-4'>
                                <label htmlFor='confirmPassword' className='block text-gray-700 font-medium mb-1'>Confirm Password:</label>
                                <input type='text' className='w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Confirm Password' onChange={(e) => setConfirmNewPassword(e.target.value)} value={confirmNewPassword} />
                            </div>
                            <button className={`w-full font-semibold rounded-lg bg-[#ff4d2d] text-white transition duration-300 py-2 hover:bg-[#e64323]`} onClick={resetPasswordHandler}>Reset Password</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ForgotPassword
