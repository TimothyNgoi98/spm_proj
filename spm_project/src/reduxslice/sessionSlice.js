import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    staff_id: "",
    staff_fname: "",
    staff_lname: "",
    dept: "",
    email: "",
    role_id: ""
}

export const const_session_slice = createSlice({
    name: "session_slice",
    initialState,
    reducers: {
        setstaffid: (state, action) => {
            state.staff_id = action.payload
        },
        setstafffname: (state, action) => {
            state.staff_fname = action.payload
        },
        setstafflname: (state, action) => {
            state.staff_lname = action.payload
        },
        setdept: (state, action) => {
            state.dept = action.payload
        },
        setemail: (state, action) => {
            state.email = action.payload
        },
        setroleid: (state, action) => {
            state.role_id = action.payload
        },

    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

// The list of reducers (Functions)
export const { setstaffid, setstafffname ,setstafflname, setdept, setemail, setroleid} = const_session_slice.actions;

export default const_session_slice.reducer