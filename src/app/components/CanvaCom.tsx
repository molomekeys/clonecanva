"use client"
import React, { useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch } from '@/hooks';
import {unselectId} from "../../features/canva/selectedCanva-slice"
import {closeColorMenu} from "../../features/canva/menu-slice"
import TextEditorComponent from './TextEditorComponent';
import CanvaRichTextImage from './CanvaRichTextImage';
const CanvaCom = ({children}:{children:React.ReactNode}) => {
    const dispatch=useAppDispatch()

const [isImage,setIsImage]=useState("")
function updateImage(e:string)
{
  setIsImage(e)
}

  return (
    <div className='flex flex-col  w-full items-center justify-center relative'>
  
  <TextEditorComponent updateImage={updateImage}/>
   <Stage    onClick={(e)=>{
    
    dispatch(unselectId())
    dispatch(closeColorMenu())
   }}
    scale={{x:1,y:1}}
    className='bg-slate-50'
   height={700} width={700} >
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