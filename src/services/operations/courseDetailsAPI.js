import toast from "react-hot-toast";
import { APIconnector } from "../APIconnector";
import {courseEndpoints, catalogData, ratingsEndpoints} from '../APIs';
import {setCourse,setStage} from '../../reducer/slices/courseSlice'

const {GET_ALL_COURSE_API,COURSE_DETAILS_API,EDIT_COURSE_API,COURSE_CATEGORIES_API,CREATE_COURSE_API,CREATE_SECTION_API,CREATE_SUBSECTION_API,UPDATE_SECTION_API,UPDATE_SUBSECTION_API,GET_ALL_INSTRUCTOR_COURSES_API,DELETE_SECTION_API,DELETE_SUBSECTION_API,DELETE_COURSE_API,GET_FULL_COURSE_DETAILS_AUTHENTICATED,LECTURE_COMPLETION_API,CREATE_EDIT_RATING_API,GET_STUDENT_COURSE_RATING_AND_REVIEW,CHANGE_COURSE_STATUS} = courseEndpoints;
const {CATALOGPAGEDATA_API} = catalogData;
const {REVIEWS_DETAILS_API} = ratingsEndpoints;

export function getAllCourses(){
    return async() => {
        const toastId = toast.loading("Loading...");
        let result = null;
        try{
            const response = await APIconnector("GET",COURSE_CATEGORIES_API);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            result = response.data.allCategory;
        }catch(e){
            console.log(e);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Please Wait...");
    let result = null
    try {
      const response = await APIconnector("POST", COURSE_DETAILS_API, {
        courseId,
      });  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response?.data?.data;
    } catch (error) {
      console.log(error)
    }
    toast.dismiss(toastId);
    return result
}

export function addCourseDetails(formData,token){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("POST",CREATE_COURSE_API,formData,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`});
                        
            if(!response?.data?.success){
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

export function editCourseDetails(formData,token){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("POST",EDIT_COURSE_API,formData,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`});

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Successfully Updated Course Info");
            dispatch(setCourse(response?.data?.data));
        }catch(e){
            toast.error("Unable to Update Course Info");
            throw new Error(e);
        }
        toast.dismiss(toastId);
    }
}

export function deleteCourse(data,token){
    return async() => {
        let result = null;
        const toastId = toast.loading("Please Wait...");
        try{
            const options = {
                courseId : data,
            }
            const response = await APIconnector("DELETE",DELETE_COURSE_API,options,{Authorization: `Bearer ${token}`});
            if(!response?.data?.success){
                throw new Error("Cannot Delete Course");
            }
            result = response?.data?.updatedCourses;
            toast.success("Course Deleted SuccessFully");
        }catch(e){
            toast.error("Cannot Delete Course");
            throw new Error(e);
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function createSection(data,course,token){
    return async() => {
        const toastId = toast.loading("Please Wait...");
            try{

                const options = {
                    sectionName : data?.sectionName,
                    courseId : course._id,
                }

                const response = await APIconnector("POST",CREATE_SECTION_API,options,{Authorization : `Bearer ${token}`});

                if(!response?.data?.success){
                    throw new Error("Can't create a Section");
                }
                toast.success("Section created Successfully");
                toast.dismiss(toastId);
                return response?.data?.updatedCourse;
            }catch(e){
                console.log(e);
                toast.error("Cannot Create section");
                toast.dismiss(toastId);
                return null;
            }   
    }
}

export function updateSection(data,token){
    return async(dispatch) => {

        const toastID = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("PUT",UPDATE_SECTION_API,data,{Authorization :  `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Could Not Update Section");
            }

            dispatch(setCourse(response?.data?.data));
            toast.success("SuccessFully Updated Section");

        }catch(e){
            toast.error("Cannot update the section");
            console.log(e);
        }
        toast.dismiss(toastID);
    }
}

export function deleteSection(data,token){
    return async(dispatch) => {
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("DELETE",DELETE_SECTION_API,data,{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Cannot delete Section"); 
            }
            await dispatch(setCourse(response?.data?.data));
            toast.success("Section Deleted Successfully");
        }catch(e){
            console.log(e);
            toast.error("Cannot Delete Section");
        }
        toast.dismiss(toastId);
    }
}

export function createSubSection(data,token){
    return async() => {
        const toastId = toast.loading("Please Wait...");
            try{
                const response = await APIconnector("POST",CREATE_SUBSECTION_API,data,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`});

                if(!response?.data?.success){
                    throw new Error("Can't create a sub Section");
                }
                toast.success("Sub Section created Successfully");
                toast.dismiss(toastId);
                return response?.data?.updatedSection;
            }catch(e){
                console.log(e);
                toast.error("Cannot Create sub section");
                toast.dismiss(toastId);
                return null;
            }   
    }
}

export function updateSubSection(data,token){
    return async(dispatch) => {

        const result = null;
        const toastID = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("PUT",UPDATE_SUBSECTION_API,data,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Could Not Update Sub Section");
            }

            result = response?.data?.data;
            toast.success("SuccessFully Updated Sub Section");

        }catch(e){
            toast.error("Cannot update sub section");
            console.log(e);
        }
        toast.dismiss(toastID);
        return result;
    }
}

export function deleteSubSection(data,token){
    return async(dispatch) => {
        let result = null;
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("DELETE",DELETE_SUBSECTION_API,data,{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Cannot delete sub Section"); 
            }

            result = response?.data?.updatedSection;
            toast.success("Sub section Deleted Successfuly");
        }catch(e){
            console.log(e);
            toast.error("Cannot Delete Sub section");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function getInstructorCourses(token){
    return async() => {
        let result = null;
        try{
            const response = await APIconnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Can't fetch Instructor Courses");
            }

            result = response?.data?.instructorCourses;
        }catch(e){
            console.log(e);
        }
        return result;
    }
}

export function getFullDetailsOfCourse(courseId,token){
    return async() => {
        try{
            const response = await APIconnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{Authorization: `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }
            return response?.data?.data;
        }catch(e){
            console.log(e);
        }
    }
}

export function changeCourseStatus(formData,token){
    return async() => {
        let result = false;
        const toastId = toast.loading("Saving the Changes...");
        try{
            const response = await APIconnector("PUT",CHANGE_COURSE_STATUS,formData,{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error("Unable to change the status of Course");
            }
            toast.success("SuccessFully Saved the Changes");
            result = true;
        }catch(e){
            console.log(e);
            toast.error("Unable to Save the changes");
        }
        toast.dismiss(toastId);
        return result;
    }
}

export function fetchCatalogPageCourses(categoryId){
    return async() => {
        try{
            const response = await APIconnector("POST",CATALOGPAGEDATA_API,{categoryId});

            if(!response?.data?.success){
                throw new Error("Catalog data not found");
            }

            return response?.data?.coursesList;
        }catch(e){
            toast.error("Unable to load Catalog");
            return null;
        }
    }
}

export function createAndEditRatingAndReview(courseId,rating,review,token){
    return async() => {
        const toastId = toast.loading("Please Wait...");
        try{
            const response = await APIconnector("POST",CREATE_EDIT_RATING_API,{courseId,rating,review},{Authorization : `Bearer ${token}`});
            
            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            toast.success("Successfully Submitted your Rating and Review");
        }catch(e){
            console.log(e);
            toast.error("Cant add rating and review");
        }
        toast.dismiss(toastId);
    }
}

export function getStudentCourseRatingAndReview(courseId,token){
    return async() => {
        try{
            const response = await APIconnector("POST",GET_STUDENT_COURSE_RATING_AND_REVIEW,{courseId},{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }

            return response?.data;
        }catch(e){
            console.log(e);
            return null;
        }
    }
}

export function markLectureAsCompleted(data,token){
    return async() => {
        try{
            const response = await APIconnector("POST",LECTURE_COMPLETION_API,data,{Authorization : `Bearer ${token}`});

            if(!response?.data?.success){
                return false;
            }
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    }
}

export function getAllReviews(){
    return async() => {
        try{
            const response = await APIconnector("GET",REVIEWS_DETAILS_API);

            if(!response?.data?.success){
                throw new Error(response?.data?.message);
            }
            
            return response?.data?.allRatingsAndReviews;

        }catch(e){
            console.log(e);
            return null;
        }
    }
}