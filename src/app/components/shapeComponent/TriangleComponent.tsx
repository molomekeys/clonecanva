"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer,RegularPolygon} from "react-konva"
import { useAppDispatch } from "@/hooks"
import { saveDragPosition } from "@/features/canva/rectangle-slice"
interface CircleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,y:number
    radius?:number
    id:string
   
}

const TriangleComponent = ({id,isSelect,onSelect,x,y,color,radius=30}:CircleProps) => {
    
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
    <RegularPolygon
   
    sides={3}
    radius={60}

points={[0, 0, 100, 0]} // Adjust the points to define the arrow shape



    onClick={onSelect}  onDragEnd={(e)=>{
     
     console.log(id)
     console.log(e.target.x())
       dispatch(saveDragPosition({id,x:e.target.x(),y:e.target.y()}))
    

   }}
    ref={circleRef} x={x} y={y}  
     onDblClick={onSelect} fill={color} draggable/>

{isSelect&&  circleRef.current&&  <Transformer flipEnabled={false} ref={trRef}/>}



  </>
  )
}
export default TriangleComponent