import { createReducer } from '@reduxjs/toolkit';


//initial state mai hm courses ki aaray mann rha hai jo ki empty array hogii , or yha pe hm initial state lectures ki empty or mann sakte hai 
export const courseReducer = createReducer({courses:[], lectures:[]},(builder) =>{
    builder
    .addCase('allCoursesRequest', (state) => {
      state.loading = true;
    })
    .addCase('allCoursesSuccess', (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    })
    .addCase('allCoursesFail', (state, action) => {
      state.loading = false; 
      state.error = action.payload;
    })


    .addCase('getCourseRequest', (state) => {
      state.loading = true;
    })
    .addCase('getCourseSuccess', (state, action) => {
      state.loading = false;
      state.lectures = action.payload;
    })
    .addCase('getCourseFail', (state, action) => {
      state.loading = false; 
      state.error = action.payload;
    })


    .addCase('addToPlaylistRequest', (state) => {
      state.loading = true;
    })
    .addCase('addToPlaylistSuccess', (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    })
    .addCase('addToPlaylistFail', (state, action) => {
      state.loading = false; 
      state.error = action.payload;
    })
    
  .addCase('clearError', (state) => {
    state.error = null;
  })
  .addCase('clearMessage', (state) => {
    state.message = null;
  });

    
});