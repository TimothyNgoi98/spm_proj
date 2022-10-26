import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roleskilldetails: []
}

export const details_jobroleskill_slice = createSlice({
    name: "jobroles_skill_details",
    initialState,
    reducers: {
        setRoleSkillDetails: (state, action) => {
            state.roleskilldetails = action.payload
        }
    }
})

export const { setRoleSkillDetails } = details_jobroleskill_slice.actions;
export default details_jobroleskill_slice.reducer



