import { createSlice,PayloadAction } from "@reduxjs/toolkit";
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
const initialState:RectangleSlice[]=[{
    color:"#b2a102",x:300,y:200,height:300,
    width:100,typeOfShape:"rectangle",id:v4()
}]
interface PayLoadSize{
fontSize:number 
idSelected:string
}
interface SavePositionActionPayload{
    id:string
    x:number 
    y:number
}
interface PayLoadColor{
    color:string 
    idSelected:string
    }
    interface PayLoadFont{
        color:string 
        idSelected:string
        }
const rectangleSlice=createSlice({
    name:"rectangle",initialState:initialState,
    reducers:{
        addRectangle:(state)=>{
            return [...state,{id:v4(),color:"#05a206",height:50,width:50,x:400,y:400,typeOfShape:"rectangle"}]
        },
        addTriangle:(state)=>{
            return [...state,{id:v4(),color:"#05a206",
            height:50,width:50,x:100,y:100,typeOfShape:"triangle"}]
        },
        addText:(state)=>{
            return [...state,{id:v4(),text:"hello bro ",color:"#000",height:20,width:20
            ,y:400,x:400,typeOfShape:"text",fontSize:20}]
        },
        addBigText:(state)=>{
            return [...state,{id:v4(),text:"hello bro ",color:"#000",height:20,width:20
            ,x:100,y:200,typeOfShape:"text",fontSize:30}]
        },
        addArcArrow:(state)=>{
            return [...state,{id:v4(),text:"hello bro ",color:"#000",height:20,width:20
            ,x:100,y:200,typeOfShape:"arrow",fontSize:30,}]
        },
        
        addBoldText:(state)=>{
            return [...state,{id:v4(),text:"hello bro ",color:"#000",height:20,width:20
            ,x:100,y:200,typeOfShape:"text",fontSize:20,fontFamily:"bold"}]
        },
        addCircle:(state)=>{

            return [...state,{id:v4(),color:"#b20a20",height:0,width:0
            ,x:100,y:200,typeOfShape:"circle",radius:70}]

        },
        changeTextBold:(state,action:PayloadAction<string>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload)
                {
                    return {...e,fontFamily:"bold"}
                }
                else {
                    return {...e}
                }
            })
            return [...filteredText]
        },
        increaseTextSize:(state,action:PayloadAction<string>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload)
                {
                    return {...e,fontSize:e.fontSize? e.fontSize+1 : 14}
                }
                else {
                    return {...e}
                }
            })
            return [...filteredText]
        },
        decreaseTextSize:(state,action:PayloadAction<string>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload)
                {
                    return {...e,fontSize:e.fontSize? e.fontSize-1 : 14}
                }
                else {
                    return {...e}
                }
            })
            return [...filteredText]
        },
        specifiqueTextSize:(state,action:PayloadAction<PayLoadSize>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload.idSelected)
                {
                    if(action.payload.fontSize<0)
                    {
                        return {...e,fontSize:1}
                    }
                    else {
                    return {...e,fontSize:action.payload.fontSize}
                }
                }
                else {
                    return {...e}
                }
            })
            return [...filteredText]
        },changeColor:(state,action:PayloadAction<PayLoadColor>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload.idSelected)
                {
                    
                    return {...e,color:action.payload.color}
                
                }
                else {
                    return {...e}
                }
            })
            return [...filteredText]
        }
        ,changeTextNormal:(state,action:PayloadAction<string>)=>{
            const filteredText=state.map((e)=>{
                if(e.id===action.payload)
                {
                    
                    return {...e,fontFamily:"500"}
                
                }
                else {
                    return {...e}
                }
               
               
            })
            return [...filteredText]
           
        },increaseIndex:(state,action:PayloadAction<string>)=>{
            const indexId=state.findIndex(e=>e?.id===action.payload)
            const maxLength=state.length
        console.log(indexId)
        console.log(maxLength)
            if(maxLength-1===indexId)
            {
                return state
            }
            else {

                let newArray=[...state]
                const newValue=newArray[indexId]
                const newValueSecond=newArray[indexId+1]
                newArray[indexId]=newValueSecond
                newArray[indexId+1]=newValue
             
                return newArray
            }

          
           
        },decreaseIndex:(state,action:PayloadAction<string>)=>{
            const indexId=state.findIndex(e=>e?.id===action.payload)
           
            if(0===indexId)
            {
                return [...state]
            }
            else {
                let newArray=[...state]
                const newValue=newArray[indexId]
                const newValueSecond=newArray[indexId-1]
                newArray[indexId]=newValueSecond
                newArray[indexId-1]=newValue
             
                return newArray
            }

          
           
        },saveDragPosition:
        (state,action:PayloadAction<SavePositionActionPayload>)=>{

            const {id,x,y}=action.payload
            const newArray=state.map((e)=>{
                if(e.id===id)
                {
                    
                return {...e,x:x,y:y}

                }
                else {
                    return {...e}
                }
    
            })
           
            return newArray


        }

    }

})
export const {addTriangle,addArcArrow,saveDragPosition,decreaseIndex,changeTextNormal,increaseIndex,changeColor,specifiqueTextSize,
    increaseTextSize,decreaseTextSize,changeTextBold,addRectangle,
    addText,addBoldText,addBigText,addCircle}=rectangleSlice.actions
export default rectangleSlice.reducer