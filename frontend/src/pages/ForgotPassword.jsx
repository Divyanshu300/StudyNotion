import React from 'react'
import {useDispatch, useSelector } from "react-redux"
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getPasswordResetToken } from '../services/operations/authAPI';

export default function ForgotPassword() {

    const [emailSent , setEmailSent ] = useState(false);
    const [email , setEmail ] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent))
    }


  return (
    <div className='flex justify-center items-center text-white'>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>
                        {
                            !emailSent ? "Reset Your Password" : "Check Your Email"
                        }
                    </h1>

                    <p>
                        {
                            !emailSent ? 
                            "Have no fear. We'll email you instructions to reset your password. If you dont have acces to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent && (
                                <label>
                                    <p>Email Address</p>
                                    <input 
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(event)=>setEmail(event.target.value)}
                                    placeholder='Enter Your Email Address'
                                    />
                                </label>
                            )
                        }

                        <button type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}
