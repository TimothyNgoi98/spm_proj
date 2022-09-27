import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    login: "",
    password: "",
    email: "",
    fullname: ""
}

export const login_detail_slice = createSlice({
    name: "login_data",
    initialState,
    reducers: {
        setlogin: (state, action) => {
            state.login = action.payload
        },
        setpassword: (state, action) => {
            state.password = action.payload
        },
        setemail: (state, action) => {
            state.email = action.payload
        },
        setfullname: (state, action) => {
            state.fullname = action.payload
        },
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { setlogin, setpassword, setemail, setfullname } = login_detail_slice.actions;

export default login_detail_slice.reducer
