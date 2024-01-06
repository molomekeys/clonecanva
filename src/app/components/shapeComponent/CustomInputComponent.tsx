"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { useAppDispatch, useAppSelector, } from "@/hooks"
import {changeText, saveNewState} from "../../../features/canva/do-unredo-canva"

const CustomInputComponent = () => {

const valueSelected=useAppSelector((b)=>b.doUnredo.state)
const actualIndex=useAppSelector(v=>v.doUnredo.index)
const idSelected=useAppSelector(v=>v.selectedCanva)
const findTheRight=valueSelected[actualIndex].filter((b)=>{
  if(b.id===idSelected&&b.text&&b.typeOfShape==="text")
  {
   
    return b
  }
  else{
    return
  }
})[0]
const [isInitialState,setNewState]=useState(findTheRight?.text||"")
const dispatch=useAppDispatch()
const  {x,y,width,height}=useAppSelector(e=>e.menuSelected)


  return (
    <motion.textarea   initial={{x:x,y:y,width:width,height:height}}
    onBlur={(e)=>{
        
       dispatch(changeText({
      id:findTheRight.id ,text:isInitialState
    }))

       }}
    style={{
        transformOrigin:"left top",
        fontSize:findTheRight?.fontSize,color:findTheRight?.color,
       }}
     value={isInitialState} onChange={(e)=>{
        setNewState(e.target.value)
    }}
    
    className="absolute bg-white  z-50 resize-none outline-none m-0 p-0 inset-0 overflow-hidden"
     placeholder="hello les amis"/>
  )
}
export default CustomInputComponent