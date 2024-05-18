import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import OtpInput from "react-otp-input";
import { Link, useNavigate } from 'react-router-dom';
import { sendotp } from '../services/operations/authAPI';
import { signup } from '../services/operations/authAPI';

import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

export default function VerifyEmail() {

    const [otp , setOtp] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {signupData , loading} = useSelector( (state) => state.auth );

    useEffect( () => { // agar signupData epmty hua toh usko signup page prr bhej do
        if(!signupData) {
            navigate("/signup");
        }
    } , [])

    

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = signupData;
 
        console.log("Change ho gyaa bhai: ",otp);
        dispatch(
            signup(
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp,
                navigate
            ));
        //email verify krne ke baad signup hi krrna hai issliye signUp call hoga
    }

  return (
    <div className='min-h-[calc(100vh-3.5rem)] flex justify-center items-center'>
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>Verify Email</h1>
                    <p className='text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100'>
                        A Verification code has been sent to you. Enter the code below
                    </p>
                    <form onSubmit={handleOnSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => (
                            <input
                                {...props}
                                placeholder="-"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                        )}
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                          }}
                        />
                        <button 
                        className="w-full bg-yellow-50 py-[12px] px-[12px rounded-[8px] mt-6 font-medium text-richblack-900"
                        type='submit'> 
                            Verify Email
                        </button>
                    </form>

                    <div className='mt-6 flex items-center justify-between'>
                        <div>
                            <Link to="/signup">
                                <p className='text-richblack-5 flex items-center gap-x-2'>
                                    <BiArrowBack /> Back to Signup
                                </p>
                            </Link>
                        </div>

                        <button 
                        className='flex items-center text-blue-100 gap-x-2'
                        onClick={() => dispatch(sendotp(signupData.email , navigate))} //agar otp dobaara bhejna ho toh iss function ko dobaraa call krna padega
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}
