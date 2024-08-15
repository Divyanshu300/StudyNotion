const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

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
        try {
        //data input
        const {sectionName , sectionId , courseId} = req.body;
        
        //data validation
        if(!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId , {sectionName} , {new:true});

        //get the updated course
        const course = await Course.findById(courseId)
                                            .populate({
                                                path : "courseContent",
                                                populate : {
                                                    path : "subSection",
                                                }
                                            })
                                            .exec()

        //return response
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
            data : course,
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
        const {sectionId , courseId} = req.body;
        console.log(req.body);

        //pull the Section out from course 
        await Course.findByIdAndUpdate(courseId , {
            $pull : {
                courseContent : sectionId,
            }
        })

        //use findByIdAndDelete
        const section = await Section.findById(sectionId);

        if(!section) {
            return res.status(404).json({
                success : false,
                message : "Section Not Found"
            })
        }

        //delete SubSections inside that section]
        await SubSection.deleteMany({
            _id : {
                $in : section.subSection
            }
        });

        // delete Section

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId)
                                            .populate({
                                                path: "courseContent",
                                                populate : {
                                                    path : "subSection"
                                                }
                                            })
                                            .exec()

        //return response
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully',
            data : course, 
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