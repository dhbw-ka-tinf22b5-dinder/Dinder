import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/general.types.ts";

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
