import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface InitialStateMenu{
    isOpen:boolean
    typeMenu : string
    isColor:boolean
    isPosition:boolean
}
const iniTialMenu:InitialStateMenu={
    isPosition:false,
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
        },
        openPositionMenu:(state)=>{
            return {...state,isPosition:!state.isPosition}
        },
        closePositionMenu:(state)=>{
            return {...state,isPosition:false}
        }

    }
})
export  default menuSlice.reducer
export const {openPositionMenu,closePositionMenu,closeMenu,openMenu,closeColorMenu,openColorMenu} = menuSlice.actions