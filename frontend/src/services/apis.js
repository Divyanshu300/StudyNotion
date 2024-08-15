const BASE_URL = process.env.REACT_APP_BASE_URL;

//AUTH ENDPOINTS/API
export const authEndpoints = {
    SENDOTP_API : BASE_URL + "/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API : BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API : BASE_URL + "/auth/resetPassword"
}

//PROFILE ENDPOINTS/API
export const profileEndpoints = {
    GET_ALL_USER_DETAILS_API : BASE_URL + "/profile/getAllUserDetails",
    GET_ENROLLED_COURSES_API : BASE_URL + "/profile/getEnrolledCourses"
}

//STUDENT ENDPOINTS/API (payments student ke haath mein hai)
export const studentEndpoints = {
    CAPTURE_PAYMENT_API : BASE_URL + "/payments/capturePayment",
    VERIFY_SIGNATURE_API : BASE_URL + "/payment/verifySignature",
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + "/payment/sendPaymentSuccessEmail",
}

//COURSE ENDPOINTS/API (course , category , section , subsection , rating and reviews)
export const courseEndpoints = {
    //course controller
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    GET_ALL_COURSE_API : BASE_URL + "/course/showAllCourses",
    GET_COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",

    //category controller
    SHOW_ALL_CATEGORIES_API : BASE_URL + "/course/showAllcategories",

    //section controller
    CREATE_SECTION_API : BASE_URL + "/course/createSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",

    //subsection controller
    CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",

    //rating and review
    CREATE_RATING_API : BASE_URL + "/course/createRating",


    //others that i dont know
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
}

//RATING AND REVIEWS ENDPOINTS/API
export const ratingAndReviewsEndpoints = {
    GET_ALL_RATING_API : BASE_URL + "/course/getAllRating"
}

//CATEGORIES ENDPOINTS/API
export const categoriesEndpoints = {
    SHOW_ALL_CATEGORIES_API : BASE_URL + "/course/showAllcategories",
}

//CATALOG PAGE DATA / CATEGORY PAGE DETAILS ENDPOINTS/API
export const catalogData = {
    CATALOGPAGE_DATA_API : BASE_URL + "/course/categoryPageDetails",
}

// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
  }
  
  // SETTINGS PAGE API
  export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteAccount",
  }
