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
        updateCompleteLectures(state,value){
            state.completedLectures = [...state.completedLectures,value.payload]
        },
    }
})

export const {setCompleteLectures,setCourseDetails,setCourseSectionData,setTotalNoOfLectures,updateCompleteLectures} = courseDetailsSlice.actions;
export default courseDetailsSlice.reducer;