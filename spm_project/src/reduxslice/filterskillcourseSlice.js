import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    test: []
}

export const transfer_existing_skill_slice = createSlice({
    name: "transfer_existing_skill",
    initialState,
    reducers: {
        courseSkillTransfer: (state, action) => {
            // State.<Sth> This sth refers to the initial state one of the ojbect name of the key. 
            state.test = action.payload
        }
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { courseSkillTransfer } = transfer_existing_skill_slice.actions;

export default transfer_existing_skill_slice.reducer
