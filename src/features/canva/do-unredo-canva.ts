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
        stageInfo:{
           width:number ,heigth:number
        },
        index:number,state:RectangleSlice[][]
    }
    interface PayloadActionSpec{
        state:RectangleSlice[],newInfo:RectangleSlice
    }

    interface ChangeColor{
        id:string ,color:string
    }
    interface ChangeOnDrag{
        id:string ,x:number,y:number
    }


    interface changePosition{
        id:string ,x:number,y:number
    }

    const iniTialState:InitialState={stageInfo:{
        width:500,heigth:600
    },index:0,state:[[{ color:"#b2a102",x:300,y:200,height:50,
    width:50,typeOfShape:"text",id:v4(),text:"hello bro",fontSize:20}]]}

    
    const doUnRedoCanvaSlice=createSlice({name:"BigState",
        initialState:iniTialState,reducers:{
            saveNewState:(state,action:PayloadAction<PayloadActionSpec>)=>{

                    if(state.state.length>4)
                    {
                        const momoTest=[...state.state]
                      
                       const newArrayToPut=momoTest.slice(1)
                       return {stageInfo:state.stageInfo,index:state.state.length-1,state:[...newArrayToPut,[...momoTest[state.state.length-1],action.payload.newInfo]]}

                    }

                else if(state.index<state.state.length-1)

                {
                    const momoTest=[...state.state]
                    const newTest=momoTest[state.index]
                    return {stageInfo:state.stageInfo,index:1,state:[newTest,[...newTest,action.payload.newInfo]]}
                }
                else {
                const momo = state.index
                console.log(momo)
                const nonoIndex=state.state.length
                const newArray=[...state.state]
            
                const testBro=newArray[nonoIndex-1]


                const newArrayBro=testBro.concat(action.payload.newInfo)


                return {stageInfo:state.stageInfo,index:nonoIndex,state:[...state.state,newArrayBro]}
            }

            },goBackIndex:(state)=>{
                if(state.index===0)
                {
                    return {stageInfo:state.stageInfo,index:0,state:state.state}
                }
                else 
                {
                    const momo = state.index
                    return {stageInfo:state.stageInfo,index:momo-1,state:state.state}

                }
            },changeColor:(state,action:PayloadAction<ChangeColor>)=>{
                const {color,id}=action.payload

                const length=state.state.length

                if(state.index<state.state.length-1)

                {
                    const momoTest=[...state.state]
                        const newTest=momoTest[state.index]
                   
                    const momoBoum=momoTest[state.index].map((e)=>{
                        if(e.id===id)
                        {   

                            return {...e,color:color}
                        }
                        else {
                            return {...e}
                        }
                    })


                    return {stageInfo:state.stageInfo,index:1,state:[newTest,momoBoum]}
                }
                else {
                const newArrayTest=[...state.state]
                const momoBoum=newArrayTest[length-1].map((e)=>{
                    if(e.id===id)
                    {
                        return {...e,color:color}
                    }
                    else {
                        return {...e}
                    }
                })
                return {stageInfo:state.stageInfo,index:length,state:[...state.state,momoBoum]}
            }

            },putOnBottom:(state,action:PayloadAction<String>)=>{
                const id=action.payload

                const length=state.state.length

                if(state.index<state.state.length-1)

                {
                    const momoTest=[...state.state]
                        const newTest=momoTest[state.index]
                   
                    const momoBoum=momoTest[state.index].map((e)=>{
                        if(e.id===id)
                        {   
                            if(e.typeOfShape=="text")
                            {
                            let fontSize=e?.fontSize||0
                            return {...e,x:e.x,
                            y:(state.stageInfo.heigth-(fontSize))}
                        }
                        else  {
                         
                            return {...e,x:e.x,
                            y:(state.stageInfo.heigth-e.height)}
                        }
                        }
                        else {
                            return {...e}
                        }
                    })


                    return {stageInfo:state.stageInfo,index:1,state:[newTest,momoBoum]}
                }
                else {
                const newArrayTest=[...state.state]
                const momoBoum=newArrayTest[length-1].map((e)=>{
                    if(e.id===id)
                    {
                        if(e.typeOfShape=="text")
                        {
                        let fontSize=e?.fontSize||0
                        return {...e,x:e.x,
                        y:(state.stageInfo.heigth-fontSize)}
                    }
                    else {
                        
                        return {...e,x:e.x,
                        y:(state.stageInfo.heigth-e.height)}
                    }
                    }
                    else {
                        return {...e}
                    }
                })
                return {stageInfo:state.stageInfo,index:length,state:[...state.state,momoBoum]}
            }

            },putOnTop:(state,action:PayloadAction<String>)=>{
                const id=action.payload

                const length=state.state.length

                if(state.index<state.state.length-1)

                {
                    const momoTest=[...state.state]
                        const newTest=momoTest[state.index]
                   
                    const momoBoum=momoTest[state.index].map((e)=>{
                        if(e.id===id)
                        {   
                            if(e.typeOfShape=="text")
                            {
                            let fontSize=e?.fontSize||0
                            return {...e,x:e.x,
                            y:0}
                        }
                        else  {
                         
                            return {...e,x:e.x,
                            y:0}
                        }
                        }
                        else {
                            return {...e}
                        }
                    })


                    return {stageInfo:state.stageInfo,index:1,state:[newTest,momoBoum]}
                }
                else {
                const newArrayTest=[...state.state]
                const momoBoum=newArrayTest[length-1].map((e)=>{
                    if(e.id===id)
                    {
                        if(e.typeOfShape=="text")
                        {
                        let fontSize=e?.fontSize||0
                        return {...e,x:e.x,
                        y:(0)}
                    }
                    else {
                        
                        return {...e,x:e.x,
                        y:(0)}
                    }
                    }
                    else {
                        return {...e}
                    }
                })
                return {stageInfo:state.stageInfo,index:length,state:[...state.state,momoBoum]}
            }

            }
            ,goNextIndex:(state)=>{
                if(state.state.length===1)
                {
                    return state
                }
                else if(state.state.length-1===state.index){
                    return {stageInfo:state.stageInfo,index:state.index,state:[...state.state]}

                }
                else 
                {
                    const momo =state.index
                    return {stageInfo:state.stageInfo,index:momo+1,state:[...state.state]}

                }
            },changeOnDrag:(state,action:PayloadAction<ChangeOnDrag>)=>{
                const {x,y,id}=action.payload

                const length=state.state.length

                if(state.index<state.state.length-1)

                {
                    const momoTest=[...state.state]
                        const newTest=momoTest[state.index]
                   
                    const momoBoum=momoTest[state.index].map((e)=>{
                        if(e.id===id)
                        {   

                            return {...e,x:x,y:y}
                        }
                        else {
                            return {...e}
                        }
                    })


                    return {stageInfo:state.stageInfo,index:1,state:[newTest,momoBoum]}
                }
                else {
                const newArrayTest=[...state.state]
                const momoBoum=newArrayTest[length-1].map((e)=>{
                    if(e.id===id)
                    {
                        return {...e,x:x,y:y}
                    }
                    else {
                        return {...e}
                    }
                })
                return {stageInfo:state.stageInfo,index:length,state:[...state.state,momoBoum]}
            }

            }
        }
    })
    export  default doUnRedoCanvaSlice.reducer
    export const {putOnTop,putOnBottom,changeOnDrag,changeColor,goBackIndex,goNextIndex,saveNewState} = doUnRedoCanvaSlice.actions