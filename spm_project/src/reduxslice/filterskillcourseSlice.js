import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    test: [],
    jobrole_id: "",
    jobrole_name: ""
    // {skill_id: 1, course_map: [1.2.3.4.5]}
}

export const transfer_existing_skill_slice = createSlice({
    name: "transfer_existing_skill",
    initialState,
    reducers: {
        courseSkillTransfer: (state, action) => {
            // State.<Sth> This sth refers to the initial state one of the ojbect name of the key. 
            state.test = action.payload
        },
        courseSkillAppend: (state, action) =>{
            state.test.push(action.payload)
        },
        
        initialiseJobroleId: (state,action) => {
            state.jobrole_id = action.payload
        },
        initialiseJobroleName: (state,action) => {
            state.jobrole_name = action.payload
        }
        // courseAppendTransfer: ()
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { courseSkillTransfer,courseSkillAppend, initialiseJobroleId, initialiseJobroleName}  = transfer_existing_skill_slice.actions;

export default transfer_existing_skill_slice.reducer
