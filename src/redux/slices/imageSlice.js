import { createSlice } from "@reduxjs/toolkit";

const preData = localStorage.getItem("imgArr");

let parsedData;

try {
    // console.log("Data from localStorage:", preData);

    parsedData = preData && preData !== "undefined" && preData !== null ? JSON.parse(preData) : null;
} catch (error) {
    console.error("Error parsing JSON:", error);
    console.log("Invalid JSON data:", preData);
    parsedData = null;
}

const initialState = {
    imgArr: parsedData,
};


const imageSlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        setImgArr: (state, action) => {
            state.imgArr = action.payload;
        },
        pushOneImgArr: (state, action) => {
            state.imgArr.push(action.payload);
        },
        incrementCount: (state, action) => {
            const index = action.payload;
            if (index >= 0 && index < state.imgArr.length) {
                state.imgArr[index].count += 1;
            }
        },
    },
});

export const { setImgArr, pushOneImgArr, incrementCount } = imageSlice.actions;
export default imageSlice.reducer;
