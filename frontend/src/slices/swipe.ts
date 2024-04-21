import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import {Advertisement} from "../types/general.types";

const initialState :Advertisement[]= [];
export const swipeSlice = createSlice({
    name: "swipe",
    initialState,
    reducers:{
        swipeReducer :(_state,action:PayloadAction<Advertisement[]>)=>{
            return action.payload;
        },
    },
});
export const {swipeReducer} = swipeSlice.actions;
export default swipeSlice.reducer;