"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer,Arrow} from "react-konva"
interface CircleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,y:number
    radius?:number
    id:string
   
}
import { useAppDispatch } from "@/hooks"
import { saveDragPosition } from "@/features/canva/rectangle-slice"
const LineArcComponent = ({id,isSelect,onSelect,x,y,color,radius=30}:CircleProps) => {
    
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
    <Arrow  

points={[0, 0, 100, 0]} // Adjust the points to define the arrow shape


stroke="black"
strokeWidth={3}
    onClick={onSelect}  onDragEnd={(e)=>{
     
     console.log(id)
     console.log(e.target.x())
       dispatch(saveDragPosition({id,x:e.target.x(),y:e.target.y()}))
    

   }}
    ref={circleRef} x={x} y={y} radius={radius}  
     onDblClick={onSelect} fill={"black"} draggable/>

{isSelect&&  circleRef.current&&  <Transformer flipEnabled={false} ref={trRef}/>}



  </>
  )
}
export default LineArcComponent