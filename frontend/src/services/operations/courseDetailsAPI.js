import { courseEndpoints } from "../apis";
import {apiConnector} from "../apiconnector";
import {toast} from "react-hot-toast";


const {
    
    CREATE_COURSE_API,
    GET_ALL_COURSE_API,
    GET_COURSE_DETAILS_API,
    
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,

    SHOW_ALL_CATEGORIES_API,

    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,

    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,

    CREATE_RATING_API,

    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,

} = courseEndpoints;

//CREATE COURSE API --->
export const addCourseDetails = async(data , token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector(
            "POST",
            CREATE_COURSE_API,
            data,
            {
                "Content-Type" : "multipart/from-data",
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("CREATE_COURSE_API response---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }

        toast.success("Course Detaols Added Successfully");
        result = response?.data?.data;
    }
    catch(error) {
        console.log("CREATE COURSE API ERROR ---> : ", error);
        toast.error(error.message);
    }
    
    toast.dismiss(toastId)
    return result;
}


//GET ALL COURSE API --->
export const getAllCourses = async () => {
    
    let result = [];

    try {
        const response = await apiConnector(
            "GET" , 
            GET_ALL_COURSE_API
        );

        if(!response?.data?.success) {
            throw new Error("Could not fetch course details");
        }

        result = response?.data?.data;

    }
    catch(error) {
        console.log("GET_ALL_COURSE_API ERROR -->");
        toast.error(error.message)
    }

    return result;
}


//GET COURSE DETAILS API --->
export const fetchCourseDetails = async (courseId) => {
    let result = null;

    try {
        const response = await apiConnector(
            "POST" ,
            GET_COURSE_DETAILS_API,
            {
                courseId,
            }
        )

        console.log("GET_COURSE_DETAILS_API response ---> : " , response);

        if(!response?.data?.success) {
            throw new Error(response.data.message);
        }

        result = response.data;
    }
    catch(error) {
        console.log("GET_COURSE_DETAILS_API ERROR ---> : " , error);
        result = error.response.data;
    }

    return result;
}


//SHOW_ALL_CATEGORIES_API ---> 
export const fetchCourseCategories = async () => {
    let result = [];

    try {
        const response = await apiConnector(
            "GET" , 
            SHOW_ALL_CATEGORIES_API
        );

        console.log("SHOW_ALL_CATEGORIES_API RESPONSE --> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Course Categories");
        }

        result = response?.data?.allCategories;
    }
    catch(error) {
        console.log("SHOW_ALL_CATEGORIES_API ERROR ---> : " , error);
        toast.error(error.message);
    }

    return result;
}


//EDIT COURSE API --->
export const editCourseDetails = async (data , token) => {
    let result = null;

    try {
        const response = await apiConnector(
            "POST",
            EDIT_COURSE_API,
            data,
            {
                "content-Type" : "multipart/form-data" ,
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("EDIT COURSE API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Update Course Details");
        }

        toast.success("Course Details Updated Successfully");

        result = response?.data?.data;
    }
    catch(error) {
        console.log("EDIT COURSE API ERROR ---> : " , error);
        toast.error(error.message);
    } 

    return result;
}


//DELETE COURSE API --->
export const deleteCourse = async (data , token) => {

    try {
        const response = await apiConnector(
            "DELETE" , 
            DELETE_COURSE_API ,
            data ,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("DELETE COURSE API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }

        toast.success("Course Deleted");

    }
    catch(error) {
        console.log("DELETE COURSE API ERROR ---> : " , error);
        toast.error(error.message)
    }
}


//FETCH ALL COURSES UNDER A SPECIFIC INSTRUCTOR
export const fetchInstructorCourses = async (token) => {
    let result = [];

    try {
        const response = await apiConnector (
            "GET" , 
            GET_ALL_INSTRUCTOR_COURSES_API , 
            null,
            {
                Authorization : `Beare ${token}`,
            }
        )

        console.log("INSTRUCTOR COURSES API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses");
        }

        result = response?.data?.data;
    }
    catch(error) {
        console.log("INSTRUCTOR COURSES API ERROR ---> : " , error);
        toast.error(error.message)
    }

    return result;
}


//CREATE SECTION API --->
export const createSection = async (data , token) => {
    let result = [];

    try {
        const response = await apiConnector(
            "POST" , 
            CREATE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("CREATE SECTION API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Create Section");
        }

        toast.success("Course Section Created");

        result = response?.data?.updatedCourseDetails;
    }
    catch(error) {
        console.log("CREATE SECTION API ERROR ---> : " , error);
        toast.error(error.message);
    }

    return result;
}


//UPDATE SECTION API --->
export const updateSection = async (data , token) => {
    let result = null;
        
    try {
        const response = await apiConnector(
            "POST" ,
            UPDATE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )
        
        console.log("UPDATE SECTION API RESPONSE ---> : " , response);
        
        if(!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }

        toast.success("Course Section Updated");

        result = response?.data?.data;
    }
    catch(error) {
        console.log("UPDATE SECTION API ERROR ---> : " , error);
        toast.error(error.message);
    }

    return result;
}


//Delete Section API ---> 
export const deletSection = async (data , token) => {
    let result = [];

    try {
        const response = await apiConnector(
            "POST" ,
            DELETE_SECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("DELETE SECTION API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Delete Section");
        }

        toast.success("Course Section Deleted");

        result = response?.data?.data;
    }
    catch(error) {
        console.log("DELETE SECTION API ERROR---> : " , error);
        toast.error(error.message);
    }
    return result;
}


//CREATE_SUBSECTION_API --->
export const createSubSection = async (data , token) => {
    let result = null;

    try {
        const response = await apiConnector(
            "POST" , 
            CREATE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("CREATE SUBSECTION API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Add Lecture");
        }

        toast.success("Lecture Added") ;
        result = response?.data?.data;
    }
    catch(error) {
        console.log("CREATE SUBSECTION API ERROR ---> : " , error);
        toast.error(error.message);
    }

    return result;
}


// UPDATE_SUBSECTION_API ---> 
export const updateSubSection = async(data , token) => {
    let result 
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST" ,
            UPDATE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("UPDATE SUBSECTION API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
        }

        toast.success("Lecture Updated");

        result = response?.data?.data;
    }
    catch(error) {
        console.log("UPDATE SUB-SECTION API ERROR ---> : " , error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}


// DELETE SUBSECTION API ---> 
export const deleteSubSection = async (data , token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "POST" ,
            DELETE_SUBSECTION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("DELETE SUB-SECTION API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }

        toast.success("Lecture Deleted");
        result = response?.data?.data;
    }
    catch(error) {
        console.log("DELETE SUB-SECTION API ERROR ---> : " , error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}


//CREATE_RATING_API ---> 
export const createRating = async (data , token) => {
    const toastId = toast.loading("Loading...");
    let success = false;

    try {
        const response = await apiConnector(
            "POST" ,
            CREATE_RATING_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("CREATE RATING API RESPONSE ---> : " , response);

        if(!response?.data?.data) {
            throw new Error("Could Not Create Rating");
        }

        toast.success("Rating Created");

        success = true;
    }
    catch(error) {
        success = false;
        console.log("CREATE RATING API ERROR ---> : " , error);
        toast.error(error.message);
    }

    toast.dismiss(toastId)
    return success;
}



// GET_FULL_COURSE_DETAILS_AUTHENTICATED
export const getFulCourseDetailsOfCourse = async (courseId , token) => {
    const toastId = toast.loading("Loading....");
    let result = null

    try {
        const response = await apiConnector(
            "POST" , 
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("GET FULL COURSE DETAILS AUTHENTICATED API RESPONSE ---> : " , response);

        if(!response?.data?.success) {
            throw new Error(response.data.message);
        }

        result = response?.data?.data;
    }
    catch(error) {
        console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED API ERROR ---> : " , error);
        result = error.response.data;
    }

    toast.dismiss(toastId);
    return result;
}


//LECTURE_COMPLETION_API --->
export const markLectureAsComplete = async (data , token) => {
    let result = null;
    console.log("mark Complete Data : " , data);
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector(
            "POST" , 
            LECTURE_COMPLETION_API,
            data,
            {
                Authorization : `Bearer ${token}`,
            }
        )

        console.log("MARK LECTURE AS COMPLETE API RESPONSE ---> : " ,response);

        if(!response?.data?.message) {
            throw new Error(response.data.error);
        }

        toast.success("Lecture Completed");

        result = true;
    }
    catch(error) {
        console.log("MARK LECTURE AS COMPLETE API ERROR ---> : " , error);
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}