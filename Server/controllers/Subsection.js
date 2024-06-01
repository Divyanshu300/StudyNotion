const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader")

// Create a new sub-section for a given section
exports.createSubSection = async(req , res) => {
    try { 
        //fetch data from req ki body
        const {title , description , sectionId} = req.body;
        //extract file/video
        //const video = req.files.videoFile;
        //data validation
        if(!title || !description || !sectionId //|| !video

        ) {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }
        //upload video to cloudinary to fetch the video url
        // const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME)
        // console.log(uploadDetails);
        //create a Sub-section
        const subSectionDetails = await SubSection.create({
            title : title,
            //timeDuration :  `${uploadDetails.duration}`,
            description : description,
            //videoUrl : uploadDetails.secure_url,
        });
        console.log("SUBSECTION CREATED",subSectionDetails);
        // Update the corresponding section with the newly created sub-section
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSection:subSectionDetails._id,
                                                                }},
                                                                {new:true});
        //HW: log updated section here , after adding populated query
        //return response
        return res.status(200).json({
            success:true,
            message:'Sub Section Created Successfully',
            data : updatedSection,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'Internal Server Error',
            error:error.message,
        })
    }
}

// HW : create UpdateSubSection
exports.updateSubSection = async (req , res) => {
    try {
        //fetch the data
        const {subSectionId , title , description} = req.body;
        console.log(req.body)
        //fetch the subsection using section id
        const subSection = await SubSection.findById(subSectionId);
        //validate the subSection
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }
        //update the title
        if(title !== undefined) {
            subSection.title = title
        }
        //update the description
        if(description !== undefined) {
            subSection.description = description
        }
        //update the video
        if(req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadVideo = await uploadImageToCloudinary(
                video ,
                process.env.FILE_NAME
            )
            subSection.videoUrl = uploadVideo.secure_url;
            subSection.timeDuration = `${uploadVideo.timeDuration}`
        }

        await subSection.save();

        //find the updated SubSection 
        const updatedSection = await Section.findById({sectionId})
                                                    .populate("subSection") 
        
        return res.json({
            success: true,
            message: "Section updated successfully",
          })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Could not update the SubSection",
        })
    }
}

// HW : create DeleteSubSection
exports.deleteSubSection = async (req , res) => {
    try {
        //fetch the SubSection ID and Section ID
        const {sectionId , subSectionId} = req.body;
        //pull it from the section 
        await Section.findByIdAndUpdate(sectionId , 
                                        {
                                            $pull:{
                                                subSection:subSectionId,
                                            }
                                        });
        //delete it from the Database
        const subSection = await SubSection.findByIdAndDelete(subSectionId);
        //validaton
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:'SubSection not found',
            })
        }

        //find the updated SubSection 
        const updatedSection = await Section.findById({sectionId})
                                                    .populate("subSection") 

        //return response
        return res.status(200).json({
            success:true,
            data : updatedSection,
            message:'SubSection deleted successfully',
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'An error eccoured while deleting the subsection',
        })
    }
}