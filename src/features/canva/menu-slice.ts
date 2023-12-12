import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface InitialStateMenu{
    isOpen:boolean
    typeMenu : string
    isColor:boolean
}
const iniTialMenu:InitialStateMenu={
    isOpen:false,
    typeMenu:"",isColor:false
}
const menuSlice=createSlice({
    name:"menu",
    initialState:iniTialMenu,reducers:{
        openMenu:(state,action:PayloadAction<string>)=>{
            return {...state,typeMenu:action.payload,isOpen:true}
        },closeMenu:(state)=>{
            return {...state,isOpen:false,typeMenu:""}
        },
        openColorMenu:(state)=>{
            return {...state,isColor:!state.isColor}
        },
        closeColorMenu:(state)=>{
            return {...state,isColor:false,}
        }

    }
})
export  default menuSlice.reducer
export const {closeMenu,openMenu,closeColorMenu,openColorMenu} = menuSlice.actions