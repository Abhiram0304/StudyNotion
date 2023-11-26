import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[], 
    totalPrice:localStorage.getItem("totalPrice") ? JSON.parse(localStorage.getItem("totalPrice")) : (0),
    totalItems : localStorage.getItem("totalItems") ? (JSON.parse(localStorage.setItem("totalItems"))) : (0),
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart : (state,action) => {
            const course = action.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);

            if(index>=0){
                toast.error("Course already in Cart");
                return;
            }

            state.cart.push(course);

            state.totalItems++;

            state.totalPrice = state.totalItems + course.price;

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));

            toast.success("Course added to Cart");
        },
        removeFromCart : (state,action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index>=0){
                state.totalItems--;
                state.totalPrice = state.totalPrice - state.cart[index].price;
                state.cart.splice(index,1);
                
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));

                toast.success("Course removed from Cart");
            }
        },
        resetCart : (state) => {
            state.cartItems = [];
            state.totalItems = 0;
            state.totalPrice = 0;   
            
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
            localStorage.setItem("totalPrice",JSON.stringify(state.totalPrice));
        }
    }
})

export const {addToCart,totalItems,totalPrice} = cartSlice.actions;
export default cartSlice.reducer;