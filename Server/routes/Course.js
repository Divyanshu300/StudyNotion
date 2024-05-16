//Import express
const express = require("express");

//Create an instance of Router from express
const router = express.Router();

//Import the controllers -->

//Course Controller Import
const {createCourse , editCourse , deleteCourse , getFullCourseDetails , getInstructorCourses , showAllCourses , getCourseDetails} = require("../controllers/Course");

//Category Controller Import
const {createCategory , showAllcategories , categoryPageDetails} = require("../controllers/Categories");

//Rating and Review Controller Import
const {createRating , getAverageRating , getAllRating} = require("../controllers/RatingAndReview");

//Section Controller Import
const {createSection , updateSection , deleteSection} = require("../controllers/Section");

//Sub-Section Controller Import
const {createSubSection , updateSubSection , deleteSubSection} = require("../controllers/Subsection");

// Importing Middlewares
const {auth , isInstructor , isStudent , isAdmin} = require("../middlewares/auth");


//********************************************************************************************************************************************************** */
//                                                          Course Routes
//********************************************************************************************************************************************************** */

//Courses can Only be Created by Instructor
router.post("/createCourse" , auth , isInstructor , createCourse);
//Courses can Only be deleted by Instructor
router.delete("/deleteCourse" , auth , isInstructor , deleteCourse);
//Courses can Only be edited by Instructor
router.post("/editCourse" , auth , isInstructor , editCourse);

//Add a Section to a Course
router.post("/createSection" , auth , isInstructor , createSection);
//Update a Section
router.post("/updateSection" , auth , isInstructor , updateSection);
//Delete a Section
router.post("/deleteSection" , auth , isInstructor , deleteSection);

//Add Sub-Section
router.post("/createSubSection" , auth , isInstructor , createSubSection);
//Edit Sub-Section
router.post("/updateSubSection" , auth , isInstructor , updateSubSection);
//Delete Sub-Section
router.post("/deleteSubSection" , auth , isInstructor , deleteSubSection);

//Get all Registered Courses
router.get("/showAllCourses" , showAllCourses);

//Get Details for a Specific Courses
router.post("/getCourseDetails" , getCourseDetails);

//Courses associated with a single Instructor
router.get("/getInstructorCourses" , getInstructorCourses);




//********************************************************************************************************************************************************** */
//                                                      Category Routes (Only by Admin)
//********************************************************************************************************************************************************** */

//Category can only be Created by Admin
//TODO: Put IsAdmin Middleware here
router.post("/createCategory" , auth , isAdmin , createCategory);
router.get("/showAllcategories", showAllcategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router
