import toast from "react-hot-toast";
import { APIconnector } from "../APIconnector";
import {courseEndpoints} from '../APIs';
import {setCourse,setStage} from '../../reducer/slices/courseSlice'

const {GET_ALL_COURSE_API,COURSE_DETAILS_API,EDIT_COURSE_API,COURSE_CATEGORIES_API,CREATE_COURSE_API,CREATE_SECTION_API,CREATE_SUBSECTION_API,UPDATE_SECTION_API,UPDATE_SUBSECTION_API,GET_ALL_INSTRUCTOR_COURSES_API,DELETE_SECTION_API,DELETE_SUBSECTION_API,DELETE_COURSE_API,GET_FULL_COURSE_DETAILS_AUTHENTICATED,LECTURE_COMPLETION_API,CREATE_RATING_API} = courseEndpoints;

export function getAllCourses(){
    return async() => {
        try{
            const response = await APIconnector("GET",COURSE_CATEGORIES_API);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            return response.data.allCategory;
        }catch(e){
            console.log(e);
            return;
        }
    }
}

export function addCourseDetails(formData,token){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("POST",CREATE_COURSE_API,formData,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`});
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Successfully Added Course Info");
            dispatch(setCourse(response?.data?.data));
            dispatch(setStage(2));
        }catch(e){
            toast.error("Unable to submit Form");
            throw new Error(e);
        }
        toast.dismiss(toastId);
    }
}