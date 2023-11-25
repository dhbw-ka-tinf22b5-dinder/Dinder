import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import {User,Error} from "../types/general.types";

const initialState :User= {
    userName: "test1",
};
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers:{
        loginReducer :(state,action:PayloadAction<User>)=>{
            return action.payload;
        },
    },
});
export const {loginReducer} = loginSlice.actions;
export default loginSlice.reducer;