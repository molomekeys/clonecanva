"use client"
import React, { useRef, useState,Ref, forwardRef, LegacyRef, MutableRefObject, useEffect } from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch } from '@/hooks';
import {unselectId} from "../../features/canva/selectedCanva-slice"
import {closeColorMenu} from "../../features/canva/menu-slice"
import TextEditorComponent from './TextEditorComponent';
import CanvaRichTextImage from './CanvaRichTextImage';
import { StageConfig } from 'konva/lib/Stage';
import jsPDF, { jsPDFAPI } from 'jspdf';
import  Konva from "konva"


interface Canva {
  children:React.ReactNode
  refOfStage:React.RefObject<Konva.Stage>

}
interface Momo{

}
const CanvaCom = ({children,refOfStage}:Canva) => {
    const dispatch=useAppDispatch()

    
const [isImage,setIsImage]=useState("")
function updateImage(e:string)
{
  setIsImage(e)
}
const [valueOfText,setValueOfText]=useState("")
function updateTextVal(e:string)
{
  setValueOfText(e)
}


  return (
    <div 
     className='flex flex-col  h-full 
     w-full items-center justify-center relative'>




   <Stage ref={refOfStage}
     onClick={(e)=>{
  
    dispatch(unselectId())
    dispatch(closeColorMenu())
   }}
    scale={{x:1,y:1}}
    className='bg-slate-50'
   height={600} width={500} >
    <Layer   
   >
  
      {children}
        <CanvaRichTextImage imageUrl={isImage}/>
    </Layer>
   </Stage>
   </div>
  )
}
export default CanvaCom