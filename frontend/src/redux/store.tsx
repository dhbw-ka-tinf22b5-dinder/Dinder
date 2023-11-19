import {Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import userReducer from "./usersSlice";
// ...

export const store  = configureStore({
  reducer: {
    users:userReducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
