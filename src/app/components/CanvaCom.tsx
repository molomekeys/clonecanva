"use client"
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch } from '@/hooks';
import {unselectId} from "../../features/canva/selectedCanva-slice"
import {closeColorMenu} from "../../features/canva/menu-slice"
const CanvaCom = ({children}:{children:React.ReactNode}) => {
    const dispatch=useAppDispatch()
  return (
    <div className='flex flex-col  w-full items-center justify-center'>
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
    </Layer>
   </Stage>
   </div>
  )
}
export default CanvaCom