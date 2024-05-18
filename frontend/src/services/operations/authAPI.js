import {setLoading, setToken} from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice";
import {resetCart} from "../../slices/cartSlice"

import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";

import {toast} from "react-hot-toast"


//import all the apis required for auth
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
} = authEndpoints

export function sendotp(email , navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));

        try { 
            const response = await apiConnector("POST" , SENDOTP_API , {
                email,
                checkUserPresent : true,
            });

            console.log("SENDOTP API RESPONSE..." , response);

            console.log("Success : ",response.data.success);

            if(!response) {
                throw new Error(response.data.success);
            }

            toast.success("OTP Sent Successfully");

            //opt send hone ke baad jhaa enter krna hai whaa navigate krr do
            navigate("/verify-email");
        }
        catch(error) {
            toast.error("Could Not Send OTP");
            console.log("SENDOTP API ERROR..." , error);
        }

        dispatch(setLoading(false));
    }
}

export function signup(firstName , lastName , email , password , confirmPassword , accountType , otp , navigate) {
    return async(dispatch) => {
        dispatch(setLoading(true));

        try {
            //console.log("authAPI WAALA : " , otp);
            //call the backend controller by sending request
            const response = await apiConnector("POST" , SIGNUP_API , {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            });

            console.log("SIGNUP API RESPONSE..." , response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");

            //signup ho gya toh login page prr navigate krrdo
            navigate("/login");

        }
        catch(error) {
            console.log("SIGNUP API ERROR..." , error);
            toast.error("Signup Fail");
            //signup fail ho gyaa toh ussi page prr rho
            navigate("/signup");
        }

        dispatch(setLoading(false));
    }
}


export function login(email , password , navigate) {
    //kyunki login krne ke baad redirect honge dashboard prr iss liye input mein navigate bhej rhe hai
    return async(dispatch) => {
        try {
            dispatch(setLoading(true));

            const response = await apiConnector("POST" , LOGIN_API , {
                email ,
                password,
            });

            console.log("LOGIN API RESPONSE..." , response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");

            //Login hone ke baad token generate hoga '
            dispatch(setToken(response.data.token));

            //user ki default image set krenge 
            const userImage = response.data?.user?.image 
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            

            //reducer mein setUser ko set kroge
            dispatch(setUser({...response.data.user , image : userImage}))
            
            //local storage mein token set krenge
            localStorage.setItem("token" , JSON.stringify(response.data.token))
            
            //local storage mein user set krenge
            localStorage.setItem("user" , JSON.stringify(response.data.user))
            
            //login krne ke baad navigate to dashboard
            navigate("/dashboard/my-profile");
        }
        catch(error) {
            console.log("LOGIN API ERROR..." , error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
    }
}

export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));//agar koi bhi reducer ko use krna hota hai toh we can use them with the help of dispatch
        try {
            const response = await apiConnector("POST" , RESETPASSWORDTOKEN_API , {email}); //jo bhi hmlogo ne controller mein code likha hai usme jo bhi req hai body , header , params in sb ke andar woh sb bhejte hai 
            
            console.log("RESET PASSWORD TOKEN RESPONSE..." , response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reset Email Sent");
            setEmailSent(true);
        }
        catch(error) {
            console.log("RESET PASSWORD TOKEN ERROR");
            toast.error("Failed to send email for reseting password");
        }

        dispatch(setLoading(false));
    }
}

export function resetPassword(password , confirmPassword , token) {
    return async(dispatch) => {
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST" , RESETPASSWORD_API , {password , confirmPassword , token});

            console.log("RESET PASSWORD RESPONSE..." , response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset Successfully");
        }
        catch(error) {
            console.log("RESET PASSWORD ERROR");
            toast.error("Unable to reset Password");
        }

        dispatch(setLoading(false));
    }
}


export function logout(navigate) {
    return (dispatch) => {
        
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast.success("Logged Out");
        
        navigate("/");
    }
}