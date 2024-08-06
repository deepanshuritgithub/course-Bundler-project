import { server } from "../store.js";

import axios from "axios";

export const getAllCourses = (category="", keyword="") => async dispatch =>{
    try {
        dispatch({type:"allCoursesRequest"});
        const config ={
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,   
            }
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        console.log(data);
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
        const { data } = await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        console.log(data);
        dispatch({type:"allCoursesSuccess", payload: data.courses});

    } catch (error) {

        dispatch({
            type:"allCoursesFail", 
            payload: error.response.data.message});
    }
}


export const getCourseLectures = (id) => async dispatch =>{
    try {
        dispatch({type:"getCoursesRequest"});
        const config ={
            withCredentials:true,   
            }
        const { data } = await axios.get(`${server}/course/${id}`,//yha pe esme address pass krne ki bhi jrurat nahi hai login ho ya na ho doesn't matter... 
            config,
        );
        // console.log(data);
        dispatch({type:"getCoursesSuccess", payload: data.lectures});

    } catch (error) {

        dispatch({
            type:"getCoursesFail", 
            payload: error.response.data.message});
    }
}
