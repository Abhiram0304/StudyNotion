
import toast from "react-hot-toast";
import { profileEndpoints } from "../APIs"
import { APIconnector } from "../APIconnector";

const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API,GET_INSTRUCTOR_DATA_API} = profileEndpoints;

export function enrolledCourses(token){
    return async(dispatch) => {
        try{
            const enrolledCourses = await APIconnector("GET",GET_USER_ENROLLED_COURSES_API,null,{Authorization: `Bearer ${token}`});
            if(!enrolledCourses.data.success){
                throw new Error("Cannot fetch enrolled courses");
            }

            return enrolledCourses.data.data;
        }catch(e){
            console.log(e);
            console.log("Unable to fetch enrolled courses");
            toast.error("Unable to fetch enrolled courses");
        }
    }
}