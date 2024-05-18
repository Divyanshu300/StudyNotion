import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast';

import Tab from '../../common/Tab';
import { sendotp } from '../../../services/operations/authAPI';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from '../../../slices/authSlice';
 
function SignupForm() {

  const [accountType , setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData , setFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirmPassword : "",
  })

  const {firstName , lastName , email , password , confirmPassword} = formData;

  const handleOnChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name] : event.target.value,
    }))
  }

  const handleOnSubmit = (event) => {
      event.preventDefault();

      if(password !== confirmPassword) {
        toast.error("Password Don Not Match");
        return;
      }

      const signupData = {
        ...formData,
        accountType,
      }

      //setting Signup data to state
      //to be used after otp verification
      dispatch(setSignupData(signupData));
      
      //send OTP to user for verification
      dispatch(sendotp(email , navigate));

      //Reset
      setFormData({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
      })

      setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  // data to pass to Tab component
  const tabData = [
    {
      id : 1,
      tabName : "Student",
      type : ACCOUNT_TYPE.STUDENT,
    },
    {
      id : 2,
      tabName : "Instructor",
      type : ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>

      {/* Tab */}
      
      <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
      
      {/* Form */}
      
      <form onSubmit={handleOnSubmit} className='w-full flex flex-col gap-y-4'>
        <div className='flex flex-row gap-x-4'>
          <label>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              First Name <span className='text-pink-200'>*</span>
            </p>
            <input
            required
            type='text'
            name='firstName'
            value={firstName}
            onChange={handleOnChange}
            placeholder='Enter first name'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'/>
          </label>
          <label>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Last Name <span className='text-pink-200'>*</span>
            </p>
            <input
            required
            type='text'
            name='lastName'
            value={lastName}
            onChange={handleOnChange}
            placeholder='Enter last name'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'/>
          </label>
        </div>
        <label className='w-full'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Email Address <span className='text-pink-200'>*</span>
            </p>
            <input
            required
            type='email'
            name='email'
            value={email}
            onChange={handleOnChange}
            placeholder='Enter eamil address'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'/>
        </label>
        <div className='flex flex-row gap-x-4'>
          <label className='relative'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Create Password <span className='text-pink-200'>*</span>
            </p>
            <input
            required
            type= {showPassword ? 'text' : 'password'}
            name= 'password'
            value= {password}
            onChange={handleOnChange}
            placeholder='Enter Password'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
            />
            <span 
            className='absolute right-3 top-[38px] cursor-pointer z-10'
            onClick={() => setShowPassword((prev) => !prev)}>
              {
                showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>
          </label>
          <label className='relative'>
            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
              Confirm Password <span className='text-pink-200'>*</span>
            </p>
            <input
            required
            type={showConfirmPassword ? 'text' : "password"}
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder='Confirm Password'
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
            <span 
            className='absolute right-3 top-[38px] cursor-pointer z-10'
            onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {
                showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
            </span>
          </label>
        </div>
        <button type='submit'
        className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'>
          Create Account
        </button>
      </form>
    
    </div>
  )
}

export default SignupForm