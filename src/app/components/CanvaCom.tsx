"use client"
import React from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch } from '@/hooks';
import {unselectId} from "../../features/canva/selectedCanva-slice"
const CanvaCom = ({children}:{children:React.ReactNode}) => {
    const dispatch=useAppDispatch()
  return (
   <Stage  onMouseDown={()=>dispatch(unselectId())}
   nMouseUp={()=>dispatch(unselectId())}
   height={800} width={800} >
    <Layer>
        {children}
    </Layer>
   </Stage>
  )
}
export default CanvaCom