import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "@/lib/slices/error.ts";
import loginReducer from "@/lib/slices/login.ts";
export const makeStore =() =>{
	return configureStore({
	reducer: {
		login: loginReducer,
		error: errorReducer,
	},
})};
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
