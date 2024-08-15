import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiArrowBack } from "react-icons/bi";

import {AiFillEyeInvisible , AiFillEye} from "react-icons/ai"

function UpdatePassword() {

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData , setFormData] = useState({
        password : "",
        confirmPassword : "",
    })
    const [showPassword , setShowPassword] = useState(false);
    const [showConfirmPassword , setShowConfirmPassword] = useState(false);

    const {loading} = useSelector((state) => state.auth);

    const {password , confirmPassword} = formData;

    const handleOnChange = (event) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [event.target.name] : event.target.value,
            }
        ))
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password , confirmPassword , ))
    }

  return (
    <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? (
                <div className='spinner'></div>
            ) : (
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        Choose new Password
                    </h1>
                    <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        Almost done. Enter your new password and youre all set.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className='relative'>
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                New Password
                            </p>
                            
                            <input
                                required
                                type={showPassword ? "text" : "Password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter New Password'
                                style={{}}
                                className='form-style w-full !pr-10'
                            />

                            <span
                            className='absolute right-3 top-[38px] z-10 bursor-pointer'
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? 
                                    <AiFillEyeInvisible fontSize={24} fill='#AFB2BF'/> 
                                    : <AiFillEye fontSize={24} fill='#AFB2BF'/> 
                                }
                            </span>
                        
                        </label>
                        
                        <label className='relative mt-3 block'>
                            <p className='text-richblack-5 mb-1  text-[0.875rem] leading-[1.375rem] '>
                                Confirm New Password <sup className="text-pink-200">*</sup>
                            </p>
                            
                            <input
                                required
                                type={showConfirmPassword ? "text" : "Password"}
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={handleOnChange}
                                placeholder='Confirm New Password'
                                style={{}}
                                className='form-style w-full !pr-10'
                            />

                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                            >
                                {
                                    showConfirmPassword ? 
                                    <AiFillEyeInvisible fontSize={24} fill = "#AFB2BF"/> 
                                    : <AiFillEye fontSize={24} fill = "#AFB2BF"/> 
                                }
                            </span>
                        
                        </label>

                        <button 
                            type='submit'
                            className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                        >
                                Reset Password
                        </button>
                    </form> 
                      
                    <div className='mt-6 flex items-center justify-between'>
                        <Link to="/login">
                            <p className='flex items-center gap-x-2 text-richblack-5'>
                                <BiArrowBack /> Back to Login
                            </p>
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword