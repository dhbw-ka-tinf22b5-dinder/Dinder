import type { Advertisement } from "@/types/general.types.ts";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AdvertisementData {
	Advertisement: Advertisement[];
	displayedAdvertisement: number;
}
const initialState: AdvertisementData = {
	Advertisement: [],
	displayedAdvertisement: 0,
};
export const advertisementSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		advertisementReducer: (_state, action: PayloadAction<Advertisement[]>) => {
			return {
				Advertisement: action.payload,
				displayedAdvertisement: _state.displayedAdvertisement,
			};
		},
		incrementDisplay: (state) => {
			if (state.displayedAdvertisement < state.Advertisement.length - 1) {
				state.displayedAdvertisement++;
			}
			return state;
		},
		decrementDisplay: (state) => {
			if (state.displayedAdvertisement > 0) {
				state.displayedAdvertisement--;
			}
			return state;
		},
	},
});
export const { advertisementReducer, incrementDisplay, decrementDisplay } =
	advertisementSlice.actions;
export default advertisementSlice.reducer;
