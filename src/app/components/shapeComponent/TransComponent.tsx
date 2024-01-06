"use client"
import Konva from "konva"
import { useEffect, useRef, useState } from "react"
import {Rect,Transformer} from "react-konva"
interface RectangleProps{
    onSelect:()=>void 
    isSelect :boolean,color:string
    id:string,
    x:number,height:number,width:number,y:number

   
   
}
import { useAppDispatch, useAppSelector } from "@/hooks"
import { saveDragPosition } from "@/features/canva/rectangle-slice"
import { changeOnDrag, changeScale, saveNewState } from "@/features/canva/do-unredo-canva"

const TransComponent = ({id,isSelect,onSelect,height,width,x,y,color}:RectangleProps) => {
    
    const dispatch=useAppDispatch()
    const trRef=useRef<Konva.Transformer>(null)
    const rectRef=useRef<Konva.Rect>(null)
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
    <Rect  onTransformEnd={()=>{

           // a caue 'dun probleme dans ma maniere d'ecrire height j'avais eu un probleme dans le scaling

        const node = rectRef.current;
        if(node)
        {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleY(1)
        node.scaleX(1)
       console.log(scaleX,scaleY)
          dispatch(changeScale({id:id,
            width:  width * scaleX,
            height:height * scaleY
            ,x:node.x(),y:node.y()
          }))
        
        }

    }}
     onDblTap={onSelect} onDragStart={(e)=>{
      let stage =e.currentTarget.getStage()
      const current=e.currentTarget
      

  
         }}
    ref={rectRef} x={x} y={y} onDragEnd={(e)=>{
     
      console.log(id)
      console.log(e.target.x())
        dispatch(changeOnDrag({id,x:e.target.x(),y:e.target.y()}))
        // dispatch(saveNewState(actualState))
     // a caue 'dun probleme dans ma maniere d'ecrire height j'avais eu un probleme dans le scaling

    }}
     onDblClick={onSelect} name="rectangle" width={width} height={height} 
     fill={color} draggable/>

{isSelect&&  rectRef.current&&  <Transformer ref={trRef}/>}



  </>
  )
}
export default TransComponent