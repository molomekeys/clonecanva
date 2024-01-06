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
import { changeOnDrag ,changeScale} from "@/features/canva/do-unredo-canva"
const CircleComponent = ({id,isSelect,onSelect,x,y,color,radius=30}:CircleProps) => {
    
    const trRef=useRef<Konva.Transformer>(null)
    const circleRef=useRef<Konva.Circle>(null)
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
    <Circle  name="circle"  onTransformEnd={()=>{
        const node = circleRef.current;
        if(node)
        {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        const newRadius = node.radius() * node.scaleX();
        node.scaleY(1)
        node.scaleX(1)
          dispatch(changeScale({id:id,
            width: Math.max(5, newRadius),
            height: Math.max(5,newRadius),x:node.x(),y:node.y()
          }))
        
        node.scaleX(1);
          node.scaleY(1)
        
      }
    }}
     onDblTap={onSelect}  onDragEnd={(e)=>{
     
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