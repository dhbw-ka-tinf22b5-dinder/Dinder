import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../slices/login';
import  errorReducer from '../slices/error';
export const store = configureStore({
  reducer: {
    login: loginReducer,
    error: errorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;