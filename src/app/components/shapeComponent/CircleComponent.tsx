"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer,Text,Circle} from "react-konva"
interface CircleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,y:number
    radius?:number
    id:string
   
}
import { useAppDispatch } from "@/hooks"
import { changeOnDrag } from "@/features/canva/do-unredo-canva"
const CircleComponent = ({id,isSelect,onSelect,x,y,color,radius=30}:CircleProps) => {
    
    const trRef=useRef<Konva.Transformer>(null)
    const circleRef=useRef(null)
    const dispatch=useAppDispatch()
    useEffect(()=>{

        if(isSelect===true)
        {
            if(trRef.current&&circleRef.current)
            {
            trRef.current?.nodes([circleRef.current])

        }
     }
        else {

        }

    },[isSelect])
  
  return (
   <>
    <Circle  onDblTap={onSelect}  onDragEnd={(e)=>{
     
     console.log(id)
     console.log(e.target.x())
       dispatch(changeOnDrag({id,x:e.target.x(),y:e.target.y()}))
    

   }}
    ref={circleRef} x={x} y={y} radius={radius}  
     onDblClick={onSelect} fill={color} draggable/>

{isSelect&&  circleRef.current&&  <Transformer flipEnabled={false} ref={trRef}/>}



  </>
  )
}
export default CircleComponent