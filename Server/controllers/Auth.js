const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

// Send OTP For Email Verification
exports.sendotp = async (req , res) => {
    try {
        //fetch email from req ki body
        const {email} = req.body;

        //check if User already exists
        // Find user with provided email
        const checkUserPresent = await User.findOne({email});
        // to be used in case of signup

        //if user already exists , return a response
        if(checkUserPresent)
        {
            return res.status(401).json({
                success : false,
                message : "User already registered",
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated : " , otp);

        //check unique otp or not
        const result = await OTP.findOne({otp : otp});
        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);

        while(result) {
            otp = otpGenerator(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otp : otp});
        }

        //yhaa prr created at nhi btaana padaa kyunki woh default hmlogo ne date.now() krr diya hai
        const otpPayload = {email , otp};
        console.log(otpPayload)

        //create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

        //return response successful
        res.status(200).json({
            success : true,
            message : 'OTP sent successfully',
            otp,
        });
    }
    catch(error) {
        console.log(error);
        console.log("OTP GENERATE NHI HUAA")
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// Signup Controller for Registering USers

exports.signup = async(req , res) => {
    
   try {
        // Destructure fields from the request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            contactNumber,
        } = req.body;

        // Check if All Details are there or not
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            //console.log(firstName , "/n" , lastName , "/n" , email , "/n" , password , "/n" ,confirmPassword , "/n" , otp);
            return res.status(403).json({
                success : false,
                message : "All fields are required",
            })
        }

        //dono passwords ko match krrlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword values does not match , please try again",
            });
        }

        //check user already exists or not
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists. Please sign in to continue.",
            });
        }

        //find most recent OTP stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
                                                //timestamp ke basis prr sort krr liyaa and recent waale ko fetch krr liyaa
        console.log("Generated OTP : ",recentOTP);

        //validate OTP
        if(recentOTP.length === 0) {
            //otp not found
            return res.status(400).json({
                success:false,
                message:'OTP NOT Found',
            });
        }
        else if(otp !== recentOTP[0].otp) {
            //invalid otp
            return res.status(400).json({
                success:false,
                message:'invalid otp',
            })
        }
        

        //Hash Password
        const hashedPassword = await bcrypt.hash(password , 10);

        //entry create in DB
        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            contactNumber,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return respose
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        })
   }
   catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered. Please try again',
        })
   }
}


// Login controller for authenticating users

exports.login = async (req , res) => {
    try {
        //get data from req ki body
        const {email , password} = req.body;

        //validation of data
        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message:"All fields are required, please try again",
            });
        }

        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        // If user not found with provided email
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first",
            });
        }

        //generate jwt , after password matching
        if(await bcrypt.compare(password , user.password)) {
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn:"24h",
            });
            // Save token to user document in database
            user.token = token;
            user.password = undefined;

            // Set cookie for token and return success respons
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true,
            }

            res.cookie("token" , token , options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })
        }
        else {
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        }
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure, Please try again',
        });
    }
}


//change Password

exports.changePassword = async (req,res) => {
    try {
        //get user id form req.user.id
        const userId = req.user.id;
        //get user details using id 
        const userDetails = await User.findById(userId);
        //get oldPassword , newPassword , confirmPassword
        const {oldPassword , newPassword , confirmNewPassword} = req.body; 
        //validation

        //validate old password with the password stored in DB
        //bcryptly compare the old password entered by the user
        const isPasswordMatch = await bcrypt.compare(
            oldPassword ,
            userDetails.password,
            );

        if(!isPasswordMatch) {
            return res.status(401).json({
                success:false,
                message:'The Password is Incorrect',
            })
        }
        //Check if NewPassword and ConfirmPassword mathces
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success:false,
                message:"The NewPassword And ConfirmPassword does not match",
            })
        }
        //Hash the Password 
        const newHashedPassword = await bcrypt.hash(mewPassword , 10); 
        //update pwd in database
        const updatedUserDetails = await User.findByIdAndUpdate(userId , 
                                                            {password:newHashedPassword},
                                                            {new:true});
        //send mail Password Updated
        try{
            const emailResponse = await mailSender(updatedUserDetails.email , 
                                                    passwordUpdated(updatedUserDetails.email ,
                                                        `Password Updated for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                                                        )
                                                    );
        }
        catch(error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success:false,
                message:'Could Not Send Email For password change',
                error:error.message,
            })
        }
        //return successful response
        return res.status(200).json({
            success:true,
            message:'Password Updated Successfully',
        })
    }
    catch(error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
        })
    }
}