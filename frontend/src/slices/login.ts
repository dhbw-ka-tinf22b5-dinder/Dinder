import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/general.types";

const initialState: User = {
	userName: "",
};
export const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		loginReducer: (_state, action: PayloadAction<User>) => {
			return action.payload;
		},
	},
});
export const { loginReducer } = loginSlice.actions;
export default loginSlice.reducer;
