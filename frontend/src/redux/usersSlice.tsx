import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { client } from "./client";
import {User} from '../types/general.types';
import { RootState } from "./store";

const API_URL = "https://jsonplaceholder.typicode.com";

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState()


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    console.log("fetching users")
    const response = await client.get(API_URL + "/users");
    console.log(response.data)
    return response.data;
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
      }
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state: RootState) => state.users)
