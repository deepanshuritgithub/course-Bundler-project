import { server } from "../store.js";

import axios from "axios";


                                    //yha hm lenge name or email , or yha ye return kregaa ek or function ko 
export const updateProfile = (name, email) => async dispatch =>{
    try {
        dispatch({type:"updateProfileRequest"});
        
        const { data } = await axios.put(`${server}/updateprofile`, {name, email},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true, 
            
        });
        // console.log(data);
        dispatch({type:"updateProfileSuccess", payload: data.message});

    } catch (error) {

        dispatch({type:"updateProfileFail", payload: error.response.data.message});
    }
}


export const changePassword = (oldPassword, newPassword) => async dispatch =>{
    try {
        dispatch({type:"changePasswordRequest"});
        
        const { data } = await axios.put(`${server}/changepassword`, 
            {
            oldPassword, 
            newPassword
            },
            {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true, 
        });
        // console.log(data);
        dispatch({type:"changePasswordSuccess", payload: data.message});
        
    } catch (error) {

        dispatch({type:"changePasswordFail", payload: error.response.data.message});
    }
}

export const updateProfilePicture = (formdata) => async dispatch =>{
    try {
        dispatch({type:"updateProfilePictureRequest"});
        
        const { data } = await axios.put(`${server}/updateprofilepicture`,formdata,
            
            {
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true, 
            
        });
        // console.log(data);
        dispatch({type:"updateProfilePictureSuccess", payload: data.message});
    } catch (error) {
        
        dispatch({type:"updateProfilePictureFail", payload: error.response.data.message});
    }
}


export const forgetPassword = (email) => async dispatch =>{
    try {
        dispatch({type:"forgetPasswordRequest"});
        const config={
                headers:{
                    'Content-Type':'application/json'
                },
            withCredentials:true, 
            }

        const { data } = await axios.post(`${server}/forgetpassword`, 
            {
                email,
            },
            config
        );
        // console.log(data);
        dispatch({type:"forgetPasswordSuccess", payload: data.message});
        
    } catch (error) {
        
        dispatch({type:"forgetPasswordFail", payload: error.response.data.message});
    }
}


                            //ese kya kya lena hai hmme ek to token, 2sri chiz jo hmara password hoga new password  
export const resetPassword = (token, password) => async dispatch =>{
    try {
        dispatch({type:"resetPasswordRequest"});
        const config = {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true, 
        }
        const { data } = await axios.put(`${server}/resetpassword/${token}`, 
            {
                password,
            },
            config
            );
        // console.log(data);
        dispatch({type:"resetPasswordSuccess", payload: data.message});
        
    } catch (error) {

        dispatch({type:"resetPasswordFail", payload: error.response.data.message});
    }
}



export const addToPlaylist  = (id) => async dispatch =>{
    try {
        dispatch({type:"addToPlaylistRequest"});
        const config ={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,   
            }
        const { data } = await axios.post(`${server}/addtoplaylist`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            {
                id  
            },
            config,
        );
        console.log(data);
        dispatch({type:"addToPlaylistSuccess", payload: data.message});

    } catch (error) {

        dispatch({
            type:"addToPlaylistFail", 
            payload: error.response.data.message});
    }
}




export const removeFromPlaylist  = (id) => async dispatch =>{
    try {
        dispatch({type:"removeFromPlaylistRequest"});
        const config ={
            withCredentials:true,   
            }
        const { data } = await axios.delete(`${server}/removefromplaylist?id=${id}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        // console.log(data);
        dispatch({type:"removeFromPlaylistSuccess", payload: data.message});

    } catch (error) {
        
        dispatch({
            type:"removeFromPlaylistFail", 
            payload: error.response.data.message});
    }
}
