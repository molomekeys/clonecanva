"use client"
import { configureStore } from "@reduxjs/toolkit";
import rectangleReducer  from "../features/canva/rectangle-slice"
import selectedCanvaSlice from "@/features/canva/selectedCanva-slice";
export const store =configureStore({
    reducer:{
        rectangle:rectangleReducer,selectedCanva:selectedCanvaSlice}
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>