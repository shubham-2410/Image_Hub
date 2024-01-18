import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import imageSlice from "../slices/imageSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    gallery: imageSlice,

})

export default rootReducer;