import type { swipe } from "@/types/general.types.ts";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SwipeInterface {
    otherSwipes:swipe[],
    ownSwipes:swipe[]
}
const initialState: SwipeInterface={
    otherSwipes:[],
    ownSwipes:[]
};
export const swipeSlice = createSlice({
	name: "swipes",
	initialState,
	reducers: {
		swipeReducer(_state, action: PayloadAction<swipe[]>) {
			return {
                otherSwipes:action.payload,
                ownSwipes:_state.ownSwipes
            };
		},
        ownSwipeReducer(_state,action:PayloadAction<swipe[]>){
            return {
                otherSwipes:_state.otherSwipes,
                ownSwipes:action.payload
            };
        }
	},
});
export const { swipeReducer,ownSwipeReducer } = swipeSlice.actions;
export default swipeSlice.reducer;
