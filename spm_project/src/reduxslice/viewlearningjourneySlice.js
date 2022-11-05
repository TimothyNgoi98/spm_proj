import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current_learningjourney: 0,
    jobrole_id : "",
    saved_courses: []
}

export const view_learning_journeySlice = createSlice({
    name: "viewlj",
    initialState,
    reducers: {
        setcurrent_learningjourney: (state, action) => {
            state.current_learningjourney = action.payload
        },
        setjobrole_id: (state, action) => {
            state.jobrole_id = action.payload
        },
        setsaved_courses : (state,action) => {
            state.saved_courses = action.payload
        }
    }
})


// What is the difference between return / state.push
// We dont mutate, in immer js, they take state.push as copying a old one and adding a it to a new one.
// What is return in reducers? 
// We can change the state directly via state.login = payload.actions 

export const { setcurrent_learningjourney, setjobrole_id,setsaved_courses} = view_learning_journeySlice.actions;

export default view_learning_journeySlice.reducer
