"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer,Text,Circle} from "react-konva"
interface CircleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,y:number
    radius?:number
    
   
}
const CircleComponent = ({isSelect,onSelect,x,y,color,radius=30}:CircleProps) => {
    
    const trRef=useRef<Konva.Transformer>(null)
    const circleRef=useRef(null)
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
    <Circle  onDblTap={onSelect}
    ref={circleRef} x={x} y={y} radius={radius}  text={"This is a demo "} 
     onDblClick={onSelect} fill={color} draggable/>

{isSelect&&  circleRef.current&&  <Transformer flipEnabled={false} ref={trRef}/>}



  </>
  )
}
export default CircleComponent