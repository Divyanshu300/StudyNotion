const Section = require("../models/Section");
const Course = require("../models/Course");

// CREATE a new section
exports.createSection = async (req , res) => {
    try {console.log("CREATE SECTION CONTROLLER KE ANDARR --->")
        // Extract the required properties from the request body
        const {sectionName , courseId} = req.body;

        //data validaion
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        // Create a new section with the given name
        const newSection = await Section.create({sectionName});
        console.log("NEW SECTION ---> " , newSection)

        // Add the new section to the course's content array
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                        {
                                                            $push:{
                                                                courseContent:newSection._id,
                                                            }
                                                        },
                                                        {new:true})
                                                        .populate({
                                                            path:"courseContent",
                                                            populate : {
                                                                path:"subSection"
                                                            },
                                                        })
                                                        .exec();
        // Return the updated course object in the response
        return res.status(200).json({
            success : true,
            message:'Section created successfully',
            updatedCourseDetails,
        });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Unable to create section, please try again',
            error:error.message,
        })
    }
}


// UPDATE a section
exports.updateSection = async(req , res) => {
    try {console.log("hello ji")
        //data input
        const {sectionName , sectionId} = req.body;
        //data validation
        if(!sectionName || !sectionId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
            section,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Unable to create section, please try again',
            error:error.message,
        })
    }
}


// DELETE a section
exports.deleteSection = async (req , res) => {
    try {
        //get ID - assuming that we are sending ID in params
        const {sectionId} = req.params;
        //use findByIdAndDelete
        await Section.findByIdAndDelete(sectionId)
        //return response
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully',
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Unable to delete section, please try again',
            error:error.message,
        })
    }
}