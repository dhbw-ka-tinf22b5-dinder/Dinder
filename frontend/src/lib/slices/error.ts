import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { FrontendError } from "@/types/general.types.ts";
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
