import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    <div>
        {
            loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password</p>
                            
                            <input
                                required
                                type={showPassword ? "text" : "Password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter New Password'
                                style={{}}
                                className=''
                            />

                            <span
                            onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/> 
                                    : <AiFillEye fontSize={24}/> 
                                }
                            </span>
                        
                        </label>
                        
                        <label>
                            <p>Confirm New Password</p>
                            
                            <input
                                required
                                type={showConfirmPassword ? "text" : "Password"}
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={handleOnChange}
                                placeholder='Confirm New Password'
                                style={{}}
                                className=''
                            />

                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {
                                    showConfirmPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/> 
                                    : <AiFillEye fontSize={24}/> 
                                }
                            </span>
                        
                        </label>

                        <button type='submit'>
                                Reset Password
                        </button>
                    </form> 
                      
                    <div>
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>

                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword