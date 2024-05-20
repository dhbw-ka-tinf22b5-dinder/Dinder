'use client'
import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "@/lib/slices/error.ts";
import loginReducer from "@/lib/slices/login.ts";
import advertisementReducer from "@/lib/slices/advertisement.ts";
export const store = configureStore({
	reducer: {
		login: loginReducer,
		error: errorReducer,
		advertisement: advertisementReducer
	},
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
