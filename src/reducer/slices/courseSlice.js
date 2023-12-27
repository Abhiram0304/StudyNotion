import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stage : 1,
    course : null,
    editCourse : false,
    paymentLoading : false,
}

const courseSlice = createSlice({
    name : "course",
    initialState,
    reducers : {
        setStage : (state,action) => {
            state.stage = action.payload
        },
        setCourse : (state,action) => {
            state.course = action.payload
        },
        setEditCourse : (state,action) => {
            state.editCourse = action.payload
        },
        setPaymentLoading : (state,action) => {
            state.paymentLoading = action.payload
        },
        resetCourseState : (state) => {
            state.stage = 1
            state.course = null
            state.editCourse = false
        },
    },
});

export const {setStage,setCourse,setEditCourse,setPaymentLoading,resetCourseState} = courseSlice.actions;

export default courseSlice.reducer;