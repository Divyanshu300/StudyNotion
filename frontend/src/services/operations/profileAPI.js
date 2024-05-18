import {apiConnector} from "../apiconnector";
import { profileEndpoints } from "../apis";
import {toast} from "react-hot-toast";

const {GET_ALL_USER_DETAILS_API , GET_ENROLLED_COURSES_API} = profileEndpoints


//CALL FOR USER ENROLLED COURSES -->
export async function getUserEnrolledCourses(token) {
    let result = []

    try {
        console.log("BEFORE CALLING BACKEND API FOR ENROLLED COURSES -->");
        
        const response = await apiConnector(
            "GET" ,
            GET_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )

        console.log("AFTER CALLING BACKEND API FOR ENROLLED COURSES -->");

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        result = response.data.data;

    }
    catch(error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }

    return result;
}