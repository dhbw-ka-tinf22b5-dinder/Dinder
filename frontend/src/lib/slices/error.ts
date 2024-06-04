import type {FrontendError} from "@/types/general.types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const initialState: FrontendError = {
	error: false,
	errorMessage: "",
};
export const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		errorReducer: (_state, action: PayloadAction<FrontendError>) => {
			return action.payload;
		},
	},
});
export const { errorReducer } = errorSlice.actions;
export default errorSlice.reducer;
