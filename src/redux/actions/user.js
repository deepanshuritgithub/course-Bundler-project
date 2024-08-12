import { server } from "../store.js";

import axios from "axios";

export const login = (email, password) => async(dispatch) =>{
    try {
        dispatch({type:"loginRequest"});
        
        const { data } = await axios.post(`${server}/login`, {email , password},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true, 
            // so jisme bhi cookies ka use aayega usme ya mandatory true dena hai otherwise kaam nahi kregaa , kyuki vha se cookie aayegi or uski ka use login krte time , create time chiye hmme jab token generate hogaa , vrna nahi doge to kya hoga browser pe request tabhi aayegi ye mandatory dena hai with creadienntials true otherwise tum khaoge postman pe request jari thi yha kyu nahi jarii 
        });
        // console.log(data);
        dispatch({type:"loginSuccess", payload: data});
    } catch (error) {
        
        dispatch({type:"loginFail", payload: error.response.data.message});
    }
}



//so jab mai refresh krungaa to vo authenticated rhegaa es se pta chlta rhegaa ussse  
export const loadUser = () => async(dispatch) =>{
    try {
        dispatch({type:"loadUserRequest"});
        
        const { data } = await axios.get(`${server}/me`,
            {
            withCredentials:true, 
            
        }
    );
        // console.log(data);
        dispatch({type:"loadUserSuccess", payload: data.user});
    } catch (error) {
        
        dispatch({type:"loadUserFail", payload: error.response.data.message});
    }
}



//so jab mai refresh krungaa to vo authenticated rhegaa es se pta chlta rhegaa ussse  
export const logout = () => async(dispatch) =>{
    try {
        dispatch({type:"logoutRequest"});
        
        const { data } = await axios.get(
        `${server}/logout`,
        {
            withCredentials:true,    
        }
    );
        // console.log(data);
        dispatch({type:"logoutSuccess", payload: data.message});
    } catch (error) {
        dispatch({type:"logoutFail", payload: error.response.data.message});
    }
}


export const register = (formdata) => async(dispatch) =>{
    try {
        dispatch({type:"registerRequest"});
        
        const { data } = await axios.post(`${server}/register`, formdata,{
            headers:{
                'Content-Type':'multipart/form-data',
                //so hmm yaha pe kya krna hai multipart/form data , so form data ayegaa or hm yha bhj denge 
            },
            withCredentials:true, 
        });
        // console.log(data);
        dispatch({type:"registerSuccess", payload: data.subscriptionId});
    } catch (error) {
        
        dispatch({type:"registerFail", payload: error.response.data.message});
    }
}



export const buySubscription = () => async(dispatch) =>{
    try {
        dispatch({type:"buySubscriptionRequest"});
        
        const { data } = await axios.get(`${server}/subscribe`,{
            withCredentials:true, 
            // so jisme bhi cookies ka use aayega usme ya mandatory true dena hai otherwise kaam nahi kregaa , kyuki vha se cookie aayegi or uski ka use login krte time , create time chiye hmme jab token generate hogaa , vrna nahi doge to kya hoga browser pe request tabhi aayegi ye mandatory dena hai with creadienntials true otherwise tum khaoge postman pe request jari thi yha kyu nahi jarii 
        });
        // console.log(data);
        dispatch({type:"buySubscriptionSuccess", payload: data.subscriptionId});
    } catch (error) {
        
        dispatch({type:"buySubscriptionFail", payload: error.response.data.message});
    }
}




export const cancelSubscription = () => async(dispatch) =>{
    try {
        dispatch({type:"cancelSubscriptionRequest"});
        
        const { data } = await axios.delete(`${server}/subscribe/cancel`,{
            withCredentials:true, 
            // so jisme bhi cookies ka use aayega usme ya mandatory true dena hai otherwise kaam nahi kregaa , kyuki vha se cookie aayegi or uski ka use login krte time , create time chiye hmme jab token generate hogaa , vrna nahi doge to kya hoga browser pe request tabhi aayegi ye mandatory dena hai with creadienntials true otherwise tum khaoge postman pe request jari thi yha kyu nahi jarii 
        });
        // console.log(data);
        dispatch({type:"cancelSubscriptionSuccess", payload: data.message});
    } catch (error) {
        
        dispatch({type:"cancelSubscriptionFail", payload: error.response.data.message});
    }
}














//so jab bhi hm get request kr rha hai to notice krna hm headers wagera nahi dete hai 
//so jab bhi kabhi form data se realted kaam krte hai tb hmme ultipart/formdata likhte hai headers mai 
//sirf apka post request mai hmmesha aata hai headers walaa 