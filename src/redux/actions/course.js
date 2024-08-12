import { server } from "../store.js";

import axios from "axios";

export const getAllCourses = (category="", keyword="") => async dispatch =>{
    try {
        dispatch({type:"allCoursesRequest"});
        const config ={
        
            withCredentials:true,   
            }
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        // console.log(data);
        dispatch({type:"allCoursesSuccess", payload: data.courses});

    } catch (error) {

        dispatch({
            type:"allCoursesFail", 
            payload: error.response.data.message});
    }
}


export const addToPlaylist = (category="", keyword="") => async dispatch =>{
    try {
        dispatch({type:"allCoursesRequest"});
        const config ={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,   
            }
        const { data } = await axios.post(`${server}/courses?keyword=${keyword}&category=${category}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        // console.log(data);
        dispatch({type:"allCoursesSuccess", payload: data.courses});

    } catch (error) {

        dispatch({
            type:"allCoursesFail", 
            payload: error.response.data.message});
    }
}


export const getCourseLectures = (id) => async (dispatch) =>{
    try {
        dispatch({type:"getCourseRequest"});
        
        //so maine btya na jisme bhi logged in or user isauthenticated , mtlb jo cookies se token hai , vo mandatory hai , with credentials to true dena hai
        const { data } = await axios.get(`${server}/course/${id}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            {
                withCredentials : true,   
            }
        );
        
        // console.log(data);
        dispatch({type:"getCourseSuccess", payload: data.lectures});
        
    } catch (error) {

        dispatch({
            type:"getCourseFail", 
            payload: error.response.data.message});
    }
}












//doubt in get all courses