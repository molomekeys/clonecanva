import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface InitialStateMenu{
    isOpen:boolean
    typeMenu : string
    isColor:boolean
    isPosition:boolean
    x:number ,y:number
    isInputOpen:boolean,width:number,height:number
}
const iniTialMenu:InitialStateMenu={
    isPosition:false, x:0,y:0,width:0,height:0,
    isOpen:false,isInputOpen:false,
    typeMenu:"",isColor:false
}
type openInputMenu={
    x:number 
    y:number
    width:number 
    height:number
}
const menuSlice=createSlice({
    name:"menu",
    initialState:iniTialMenu,reducers:{

        
        openInputMenu:(state,action:PayloadAction<openInputMenu>)=>{
           
            return {...state,isInputOpen:true,...action.payload}
        },closeInputMenu:(state)=>{
            return {...state,isInputOpen:false}
        }
        ,
        openMenu:(state,action:PayloadAction<string>)=>{
            return {...state,typeMenu:action.payload,isOpen:true}
        },closeMenu:(state)=>{
            return {...state,isOpen:false,typeMenu:"",isColor:false}
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
export const {closeInputMenu,openInputMenu,openPositionMenu,closePositionMenu,closeMenu,openMenu,closeColorMenu,openColorMenu} = menuSlice.actions