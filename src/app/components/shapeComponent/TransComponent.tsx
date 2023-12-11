"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer} from "react-konva"
interface RectangleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    id:string,
    x:number,heigth:number,width:number,y:number

   
   
}
import { useAppDispatch, useAppSelector } from "@/hooks"
import { saveDragPosition } from "@/features/canva/rectangle-slice"
import { saveNewState } from "@/features/canva/do-unredo-canva"

const TransComponent = ({id,isSelect,onSelect,heigth,width,x,y,color}:RectangleProps) => {
    
    const dispatch=useAppDispatch()
    const trRef=useRef<Konva.Transformer>(null)
    const rectRef=useRef(null)
    const actualState=useAppSelector(state=>state.rectangle)
    console.log(id)
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
    <Rect   onDblTap={onSelect} onDragStart={(e)=>{
        console.log('wesh')
         }}
    ref={rectRef} x={x} y={y} onDragEnd={(e)=>{
     
      console.log(id)
      console.log(e.target.x())
        dispatch(saveDragPosition({id,x:e.target.x(),y:e.target.y()}))
        dispatch(saveNewState(actualState))
     

    }}
     onDblClick={onSelect} width={width} height={heigth} fill={color} draggable/>

{isSelect&&  rectRef.current&&  <Transformer ref={trRef}/>}



  </>
  )
}
export default TransComponent