import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {v4} from "uuid"
type RectangleSlice=string


const initialState=""
const selectedCanvaSlice=createSlice({
    name:"selectedCanva",initialState:initialState,
    reducers:{
    
    setSelectedId:(state,action:PayloadAction<string>)=>{
        return action.payload
    }
    ,unselectId:()=>{
        return ""
    }
}})
export const {setSelectedId,unselectId}=selectedCanvaSlice.actions
export default selectedCanvaSlice.reducer