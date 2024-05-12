import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Error } from "@/types/general.types.ts";
const initialState: Error = {
	error: false,
	errorMessage: "",
};
export const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		errorReducer: (_state, action: PayloadAction<Error>) => {
			return action.payload;
		},
	},
});
export const { errorReducer } = errorSlice.actions;
export default errorSlice.reducer;