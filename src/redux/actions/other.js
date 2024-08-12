import { server } from "../store.js";

import axios from "axios";

export const contactUs = (name,email,message) => async (dispatch) =>{
    try {
        dispatch({type:"contactRequest"});
        
        const config ={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,   
        };  
        
        // title , description, category , createdBy
        const { data } = await axios.post(`${server}/contact`, 
            {name, email, message},
            config
        );
        dispatch({type:"contactSuccess", payload: data.message});
        
    } catch (error) {

        dispatch({
            type:"contactFail", 
            payload: error.response.data.message});
    }
}

export const courseRequest = (name,email,course) => async (dispatch) =>{
    try {
        dispatch({type:"courseRequestRequest"});
        
        const config ={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,   
        };  
        
        const { data } = await axios.post(`${server}/courserequest`, 
            {name, email, course},
            config
        );
        console.log(data);
        dispatch({type:"courseRequestSuccess", payload: data.message});
        
    } catch (error) {

        dispatch({
            type:"courseRequestFail", 
            payload: error.response.data.message});
    }
}
