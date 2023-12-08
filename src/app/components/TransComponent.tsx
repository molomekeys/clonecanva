"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer} from "react-konva"
interface RectangleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    x:number,heigth:number,width:number,y:number
   
}
const TransComponent = ({isSelect,onSelect,heigth,width,x,y,color}:RectangleProps) => {
    
    const trRef=useRef<Konva.Transformer>(null)
    const rectRef=useRef(null)
    useEffect(()=>{

        if(isSelect===true)
        {
            if(trRef.current&&rectRef.current)
            {
            trRef.current?.nodes([rectRef.current])

        }
     }
        else {

        }

    },[isSelect])
  
  return (
   <>
    <Rect   onDblTap={onSelect}
    ref={rectRef} x={x} y={y} 
     onDblClick={onSelect} width={width} height={heigth} fill={color} draggable/>

{isSelect&&  rectRef.current&&  <Transformer ref={trRef}/>}



  </>
  )
}
export default TransComponent