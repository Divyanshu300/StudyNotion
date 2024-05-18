import { createSlice } from "@reduxjs/toolkit";

import {toast} from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 0,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name : "cart",
    initialState : initialState,
    reducers : {
        //add to cart
        addToCart : (state , action) => {
            const course = action.payload
            //check if it exists in the cart
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0) {
                //course is already in the cart , do not modify the quantity
                toast.error("Course already in the cart");
                return;
            }

            //if the course is not in the cart then add it to the cart
            state.cart.push(course);
            //update total quantity
            state.totalItems++;
            //update total price
            state.total += course.price;

            //update to localstorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            //show toast
            toast.success("Course added to cart");
        },
        //remove from cart
        removeFromCart : (state , action) => {
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index >= 0) {
                //if the course is found in the cart , remove it
                
                //decrease the total item count
                state.totalItems--;
                //decrese the total price 
                state.total -= state.cart[index].price;
                //remove from cart
                state.cart.splice(index , 1);//remove 1 element at position->index

                //update the localstorage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                //show toast
                toast.success("Course removed from cart");
            }
        },
        //reset cart 
        resetCart : (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            //update the loaclstorage
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        },
    },
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;