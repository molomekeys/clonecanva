import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {v4} from "uuid"
interface RectangleSlice{



    color:string
    width:number
    height:number
    x:number 
    y:number
    typeOfShape:string
    fontSize?:number
    radius?:number
    id:string
    fontFamily?:string
    text?:string
    }
    interface InitialState{
        index:number,state:RectangleSlice[][]
    }
    interface PayloadActionSpec{
        state:RectangleSlice[],newInfo:RectangleSlice
    }
    const iniTialState:InitialState={index:0,state:[[{ color:"#b2a102",x:300,y:200,height:300,
    width:100,typeOfShape:"rectangle",id:v4()}]]}

    
    const doUnRedoCanvaSlice=createSlice({name:"BigState",
        initialState:iniTialState,reducers:{
            saveNewState:(state,action:PayloadAction<PayloadActionSpec>)=>{

                const momo = state.index
                console.log(momo)
                const nonoiNDEX=state.state.length
                const newArray=[...state.state]
                const testBro=newArray[nonoiNDEX-1]


                const newArrayBro=testBro.concat(action.payload.newInfo)


                return {index:momo+1,state:[...state.state,newArrayBro]}
                

            },goBackIndex:(state)=>{
                if(state.index===0)
                {
                    return {index:0,state:state.state}
                }
                else 
                {
                    const momo = state.index
                    return {index:momo-1,state:state.state}

                }
            }
            ,goNextIndex:(state)=>{
                if(state.state.length===1)
                {
                    return state
                }
                else if(state.state.length-1===state.index){
                    return {index:state.index,state:[...state.state]}

                }
                else 
                {
                    const momo =state.index
                    return {index:momo+1,state:[...state.state]}

                }
            }
        }
    })
    export  default doUnRedoCanvaSlice.reducer
    export const {goBackIndex,goNextIndex,saveNewState} = doUnRedoCanvaSlice.actions