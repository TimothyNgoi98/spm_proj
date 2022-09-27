import { configureStore  } from "@reduxjs/toolkit";

// Step 1: Import all the slices that you need here! #######################
import loginSlice from "../reduxslice/exampleSlice"

export const store = configureStore({
    // This reducer 
    reducer: {
        // Step 2: Add the imported files here. 
        login: loginSlice,
        // alan: alanSlice
    }
} 
// 

)

// This is the single store for your entire application, multiple stores are possible but not recommended. 
