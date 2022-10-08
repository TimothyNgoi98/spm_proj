import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    transfer: []
}

export const transfer_selected_skill_slice = createSlice({
    name: "transfer_selected_skill",
    initialState,
    reducers: {
        setTransfer: (state, action) => {
            // State.<Sth> This sth refers to the initial state one of the ojbect name of the key. 
            state.transfer = action.payload
        }
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { setTransfer } = transfer_selected_skill_slice.actions;

export default transfer_selected_skill_slice.reducer
