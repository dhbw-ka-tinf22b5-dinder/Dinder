import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../slices/error";
import loginReducer from "../slices/login";
export const store = configureStore({
	reducer: {
		login: loginReducer,
		error: errorReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
