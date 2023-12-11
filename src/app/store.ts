"use client"
import { configureStore } from "@reduxjs/toolkit";
import rectangleReducer  from "../features/canva/rectangle-slice"
import selectedCanvaSlice from "@/features/canva/selectedCanva-slice";
import menuSelected from "../features/canva/menu-slice"
import doUnredoCanva from "@/features/canva/do-unredo-canva";
export const store =configureStore({
    reducer:{
        rectangle:rectangleReducer,
        selectedCanva:selectedCanvaSlice,
        menuSelected: menuSelected,doUnredo:doUnredoCanva
        
    }
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>