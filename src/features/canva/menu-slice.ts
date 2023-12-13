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
            if(state.isColor===false)
            {
            return {...state,isColor:!state.isColor,typeMenu:"color"}
        }
        else {
            return {...state,isColor:!state.isColor,typeMenu:""}

        }
        },
        closeColorMenu:(state)=>{
            return {...state,isColor:false,typeMenu:""}
        },
        openPositionMenu:(state)=>{
            return {...state,isPosition:!state.isPosition,typeMenu:"position"}
        },
        closePositionMenu:(state)=>{
            return {...state,isPosition:false,typeMenu:""}
        }

    }
})
export  default menuSlice.reducer
export const {openPositionMenu,closePositionMenu,closeMenu,openMenu,closeColorMenu,openColorMenu} = menuSlice.actions