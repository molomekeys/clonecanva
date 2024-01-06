"use client"
import { motion, useMotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector, } from "@/hooks"
import {changeText, saveNewState} from "../../../features/canva/do-unredo-canva"

const CustomInputComponent = () => {
const refTextArea=useRef<HTMLTextAreaElement>(null)
const valueSelected=useAppSelector((b)=>b.doUnredo.state)
const actualIndex=useAppSelector(v=>v.doUnredo.index)
const idSelected=useAppSelector(v=>v.selectedCanva)
const spanRef = useRef<HTMLSpanElement>(null);

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
const widthFramer=useMotionValue(width)
const heightFramer=useMotionValue(height)

useEffect(()=>{
    

},[isInitialState])

  return (
    <div>

    
    <motion.textarea  ref={refTextArea}
    transition={{duration:0}}
    animate={{width:widthFramer.get(),height:heightFramer.get()}}
      initial={{x:x,y:y,width:width,height:height}}
    onBlur={(e)=>{
        
       dispatch(changeText({
      id:findTheRight.id ,text:isInitialState
    }))

       }}
    style={{
        transformOrigin:"left top",scrollbarWidth:"none",
        fontSize:findTheRight?.fontSize,color:findTheRight?.color,
       }}
     value={isInitialState} onChange={(e)=>{
        setNewState(e.target.value)

        if(refTextArea.current)
   {
    // const spanWidth = refTextArea.current.offsetWidth;
    // refTextArea.current.style.width = `${spanWidth}px`;
//    refTextArea.current.style.width=refTextArea.current?.offsetWidth+"px"
//       refTextArea.current.style.height=refTextArea.current?.scrollHeight+"px"
      widthFramer.set(refTextArea.current?.scrollWidth)
      heightFramer.set(refTextArea.current?.scrollHeight)
   
}
    }}
    
    className="absolute bg-white   whitespace-nowrap  
      z-50 resize-none outline-none m-0 p-0 inset-0 overflow-auto"
     placeholder="hello les amis"/>

            </div>
  )
}
export default CustomInputComponent