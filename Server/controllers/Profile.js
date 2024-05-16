const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader")

// Method for updating a profile
exports.updateProfile = async (req , res) => {
    try {
        //get data
        const {gender , dateOfBirth="" , about="" , contactNumber} = req.body;
        //get userId    kyunki user logged in hai issliye hmlog id aise nikaal paa rhe hai
        const id = req.user.id;//hmlogo ne user ki id ko pehlehi req ki body mein daala tha decode krrte wkt issliye yhaa use krr paa rhe
        //validation 
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        //DB mein entry ke 2 treeke hote hai
        //1st--> jb hmlogo ne object nhi bnaaya hai tb hmmlog create function ka use krrte hai
        //2nd --> jb hmlogo ka object bnaa padaa hai tb hmlog save function ka use krrte hai
        await profileDetails.save()  
        //return response
        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.messsage,
        })
    }
}


//delete account 
//Explore: how can we schedule the deleteion 
exports.deleteAccount = async (req , res) => {
    try {

        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);

        //get id
        const id = req.user.id;
        //id validation
        const userDetails = await User.findById(id); 
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : 'User not found',
            })
        }
        
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TODO: HW unenroll user form all enrolled courses
        //delete user 
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully',
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User cannot be deleted Successfully',
        })
    }
}

//user ki saari ki saari details chahiye
exports.getAllUserDetails = async (req , res) => {
    try {
        //get id 
        const id = req.user.id;
        //fetch all details using id and validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec();//isme uska gender contact no. sb mill jayega
        //return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully',
            data: userDetails,
        })
    }   
    catch(error) {
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

//Update the Profile Pictre of user
exports.updateDisplayPicture = async (req , res) => {
    try {
        //fetch the profile picture
        const displayPicture = req.files.displayPicture;
        //fetch the user ID
        const userId = req.user.id;
        //upload the image to cloudinary to get the url
        const image = await uploadImageToCloudinary(displayPicture ,
                                             process.env.FOLDER_NAME,
                                             1000,
                                             1000);
        console.log(image);

        //update the DB with new photo
        const updatedProfile = await User.findByIdAndUpdate(userId,
                                                            {image:image.secure_url},
                                                            {new : true});
        return res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
    })
    }
}


//get all Enrolled courses by the user

exports.getEnrolledCourses = async (req , res) => {
    try {
        //fetch userId
        const userId = req.user.id;
        //validate if the user is present in the DB
        const userDetails = await User.findById(userId)
                                        .populate("courses")
                                        .exec()
        if(!userDetails) {
            return req.status(400).json({
                success:false,
                message:'User not Found',
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Could not get all the courses user is enrolled in'
        })
    }
}