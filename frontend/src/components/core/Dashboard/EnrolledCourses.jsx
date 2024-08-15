import {useSelector} from "react-redux";
import { useState , useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

export default function EnrolledCourses() {

    const {token} = useSelector( (state) => state.auth);
    const navigate = useNavigate()

    const [enrolledCourses , setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            console.log("Unable to fetch Enrolled Courses");
        }
    }

    useEffect(() => {
        getEnrolledCourses()
    },[])

  return (
    <div>
        <div className="text-richblack-50 text-3xl">
            Enrolled Courses
        </div>
        {
            !enrolledCourses ? (
                <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                    <div className="spinner"></div>
                </div>
            )
            : !enrolledCourses.length ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                    You have not Enrolled in any Course yet
                    {/* TODO: Modify this empty space */}
                </p>
            ) : (
                <div className="my-8 text-richblack-5">
                    {/* Headings */}
                    <div className="flex rounded-t-lg bg-richblack-500">
                        <p className="w-[45%] px-5 py-3">Course Name</p>
                        <p className="w-1/4 px-2 py-3">Durations</p>
                        <p className="flex-1 px-2 py-3">Progress</p>
                    </div>
                    {/* Cards shuru hot hai ab */}
                    {
                        enrolledCourses.map((course , index , arr) => (
                            <div 
                                key={index}
                                className={`flex items-center border border-richblack-700 ${
                                    index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                                }`}
                            >
                                <div 
                                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                    onClick={() => {
                                        navigate(
                                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/`
                                        )
                                    }}
                                >
                                    <img 
                                        src={course.thumbnail}
                                        alt="course_img"
                                        className="h-14 w-14 rounded-lg object-cover"
                                    />
                                    <div className="flex max-w-xs flex-col gap-2">
                                        <p className="font-semibold">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">
                                            {
                                                course.courseDescription.length > 50 
                                                ? `${course.courseDescription.slice(0,50)}...`
                                                : course.courseDescription
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="w-1/4 px-2 py-3">
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height="8px"
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}
