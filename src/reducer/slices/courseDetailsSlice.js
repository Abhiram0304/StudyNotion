import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    completedLectures : [],
    courseData : [],
    courseSectionData : [],
    totalNoOfLectures : 0,    
}

const courseDetailsSlice = createSlice({
    name : "courseDetails",
    initialState : initialState,
    reducers : {
        setCompleteLectures(state,value){
            state.completedLectures = value.payload
        },
        setCourseDetails(state,value){
            state.courseData = value.payload
        },
        setCourseSectionData(state,value){
            state.courseSectionData = value.payload
        },
        setTotalNoOfLectures(state,value){
            state.totalNoOfLectures = value.payload
        },
        updateCompleteCourse(state,value){
            state.completedLectures = [...completedLectures,value.payload]
        },
    }
})

export const {setCompletedCourse,setCourseDetails,setCourseSectionData,setTotalNoOfLectures,updateCompleteCourse} = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;