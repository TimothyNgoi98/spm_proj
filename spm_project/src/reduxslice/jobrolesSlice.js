import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jobrole_desc: "",
    jobrole_id: "",
    jobrole_name: ""
}

export const jobroles_slice = createSlice({
    name: "jobroles_data",
    initialState,
    reducers: {
        setjobrole_desc: (state, action) => {
            state.jobrole_desc = action.payload
        },
        setjobrole_id: (state, action) => {
            state.jobrole_id = action.payload
        },
        setjobrole_name: (state, action) => {
            state.jobrole_name = action.payload
        }
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { setjobrole_desc, setjobrole_id, setjobrole_name } = jobroles_slice.actions;

export default jobroles_slice.reducer
