import type { swipe } from "@/types/general.types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: swipe[] = [];
export const swipeSlice = createSlice({
	name: "swipes",
	initialState,
	reducers: {
		swipeReducer(_state, action: PayloadAction<swipe[]>) {
			return action.payload;
		},
	},
});
export const { swipeReducer } = swipeSlice.actions;
export default swipeSlice.reducer;
