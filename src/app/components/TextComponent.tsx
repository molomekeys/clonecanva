"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer,Text} from "react-konva"
interface RectangleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,heigth:number,width:number,y:number
    fontSize?:number
    fontStyle?:string
   
}
const TextComponent = ({isSelect,onSelect,heigth,width,x,y,color,fontSize=14,fontStyle="500"}:RectangleProps) => {
    
    const trRef=useRef<Konva.Transformer>(null)
    const textRef=useRef(null)
    useEffect(()=>{

        if(isSelect===true)
        {
            if(trRef.current&&textRef.current)
            {
            trRef.current?.nodes([textRef.current])

        }
     }
        else {

        }

    },[isSelect])
  
  return (
   <>
    <Text  onDblTap={onSelect}  fontStyle={fontStyle}
     ref={textRef} x={x} y={y}  text={"This is a demo "} fontSize={fontSize}
     onDblClick={onSelect} fill={color} draggable/>

{isSelect&&  textRef.current&&  <Transformer flipEnabled={false} ref={trRef}/>}



  </>
  )
}
export default TextComponent