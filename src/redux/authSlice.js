import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
       loading: false,
       user: null,
       userById: null,
       allUsers: [],
    }, reducers: {
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state,action) => {
            state.user = action.payload
        },
        setUserById:(state,action) => {
            state.userById = action.payload
        },
        setAllUsers:(state,action) => {
            state.allUsers = action.payload
        }
    }
})
export const { setLoading, setUser, setAllUsers, setUserById } = authSlice.actions
export default authSlice.reducer