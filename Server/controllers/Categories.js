const Category = require("../models/Category");

//create Category ka Handler function

exports.createCategory = async (req , res) => {
    try {
        //fetch data
        const {name , description} = req.body;
        //validation 
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //create entry in DB
        const categoryDetails = await Category.create({
            name : name,
            description : description,
        });
        console.log(categoryDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:'Category Created Successfully',
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


//get all category handler function

exports.showAllcategories = async (req , res) => {
    try {
        console.log("SHOW ALL CATEGORIES KE ANDARR: ")
        //saare tags chahiye bss hrr category mein name and description hone chahiye
        const allCategories = await Category.find({} , {name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All categories returned successfully",
            allCategories,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//categoryPageDetails
exports.categoryPageDetails = async(req , res) => {
    try {
        //get category ID
        const {categoryId} = req.body;
        //get courses for specified categories
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:true,
                message:"Data not Found",
            });
        }
        //get course for different categories
        const differentCategories = await Category.find({
                                            _id: {$ne:categoryId},//$ne ka mtlb hai not equal
                                            })
                                            .populate("courses")
                                            .exec();
        //get top selling courses
        const allCategories = await Category.find()
        .populate({
            path : "courses",
            match : { status : "Published" },
            populate : {
                path : "instructor",
            },
        })
        .exec()

        const allCourses = allCategories.flatMap((category) => category.courses);

        const mostSellingCourses = allCourses.sort((a , b) => b.sold - a.sold).slice(0 , 10);

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                mostSellingCourses 
            }
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}