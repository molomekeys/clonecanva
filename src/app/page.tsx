"use client"
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { Layer, Stage } from 'react-konva';
import { useState } from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '@/hooks';
import { Provider } from 'react-redux';
import { store } from './store';

const CanvaComponents = dynamic(() => import('./components/CanvaComponents'), {
  ssr: false,
});
const TransComponent = dynamic(() => import('./components/TransComponent'), {
  ssr: false,
});
const TextComponent = dynamic(() => import('./components/TextComponent'), {
  ssr: false,
});
const CircleComponent = dynamic(() => import('./components/CircleComponent'), {
  ssr: false,
});




import Konva from 'react-konva';

const DynamicLayer = dynamic(() => Promise.resolve(Konva.Layer), {
  ssr: false,
});

const DynamicStage = dynamic(() => Promise.resolve(Konva.Stage), {
  ssr: false,
});



import { useAppSelector } from '@/hooks';
import {addRectangle,addText,addBigText,addCircle} from "../features/canva/rectangle-slice"
import {setSelectedId,unselectId} from "../features/canva/selectedCanva-slice" 
import ModifySelectedComponent from './components/ModifySelectedComponent';
export default function Home() {
  const dispatch=useAppDispatch()
 const idSelected=useAppSelector((state)=>state.selectedCanva)
  const allRectangle=useAppSelector((state)=>state.rectangle)

  const rectangles=[{
   

  },{}]
  console.log(allRectangle)
  
  const allTransComponent=allRectangle.map((e,i)=>{

    switch(e.typeOfShape)
    {
      case "rectangle":
    return <TransComponent 
    heigth={e.height} width={e.width}
     color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
     onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i}
    
    />
    break;
    case "text" :
    return <TextComponent heigth={e.height} width={e.width}
     color={e.color} x={e.x} fontStyle={e.fontFamily}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} fontSize={e.fontSize}
    
    />
    break;
    case "circle" :
    return <CircleComponent   radius={e.radius} color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} 
    
    />
    break;
    }
  })


  const infoOfSelected=allRectangle.filter((e)=>{
    return e.id===idSelected
  })
  console.log(infoOfSelected)
  return (
    <Provider store={store}>
    <main className="flex min-h-screen w-full
     flex-col items-center justify-between ">
      
      
      <div className='w-full'>
        <ModifySelectedComponent/>
      </div>
      <section className='w-full flex  bg-slate-100 p-10  items-center justify-center border-2 b '>
    <DynamicStage  width={700}   className="bg-white"
      height={700}
     onClick={()=>dispatch(unselectId())} >
      <DynamicLayer  
       width={window.innerWidth}
      height={window.innerHeight} >
      {...allTransComponent}
      </DynamicLayer>
    </DynamicStage>
    </section>
    </main>
    </Provider>
  )
}
