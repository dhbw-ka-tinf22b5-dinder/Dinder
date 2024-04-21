import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../slices/login';
import  errorReducer from '../slices/error';
import swipeReducer from "../slices/swipe";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    error: errorReducer,
    swipe: swipeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;