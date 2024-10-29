import { configureStore } from "@reduxjs/toolkit";
import reducers from './authSlice'

const store = configureStore({
    reducer : {
        auth : reducers,
    },
    
})

export default store;