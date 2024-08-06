import { configureStore } from "@reduxjs/toolkit"

import {profileReducer, userReducer, subscriptionReducer} from "./reducers/userReducer"
// import {otherReducer} from "./reducers/otherReducer"
import {courseReducer} from "./reducers/courseReducer"



const store = configureStore({
    reducer:{
        user: userReducer,
        profile:profileReducer,
        course: courseReducer,
        subscription: subscriptionReducer,
    },
    devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Added devTools option
});

export default store;

export const server ="https://nodecoursebundlerr.onrender.com/api/v1";  //Link of our backend service 