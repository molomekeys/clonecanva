"use client"
import Image from 'next/image'
import dynamic from 'next/dynamic';

import React, { useRef, useState ,RefObject,MutableRefObject} from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '@/hooks';
import { Provider } from 'react-redux';
import { store } from './store';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';
const TransComponent = dynamic(() => import('./components/shapeComponent/TransComponent'), {
  ssr: false,
});
const TextComponent = dynamic(() => import('./components/TextComponent'), {
  ssr: false,
});
const CircleComponent = dynamic(() => import('./components/shapeComponent/CircleComponent'), {
  ssr: false,
});

const CanvaComponentNext=dynamic(()=>import("../canvaComponent/CanvaComponentNext"),{
  ssr:false
})


const TriangleComponent = dynamic(() => import('./components/shapeComponent/TriangleComponent'), {
  ssr: false,
});

const LineArcComponent= dynamic(() => import('./components/shapeComponent/LineArcComponent'), {
  ssr: false,
});



const ImageComponent=dynamic(()=>import("./components/shapeComponent/ImageComponent"),{
  ssr:false
})

import { useAppSelector } from '@/hooks';
import {setSelectedId} from "../features/canva/selectedCanva-slice" 
import ModifySelectedComponent from './components/ModifySelectedComponent';
import Konva from 'konva';

export default function Home() {
  

  const dispatch=useAppDispatch()
 const idSelected=useAppSelector((state)=>state.selectedCanva)
  const allRectangle=useAppSelector((state)=>state.rectangle)

  const filteredId=allRectangle.filter((e)=>{
    if (e?.id===idSelected)
    {
      return e
    }
      
    })

    const selectedCnva=useAppSelector(e=>e.doUnredo)

  const allTransComponent=selectedCnva.state[selectedCnva.index]?.map((e,i)=>{
    console.log(selectedCnva.index)

    switch(e?.typeOfShape)
    {
      case "rectangle":
    return <TransComponent  id={e.id}
    height={e.height} width={e.width}
     color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
     onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i}
    
    />
    break;
    case "text" :
    return <TextComponent  text={e.text} fontFamily={e.fontFamily}
    heigth={e.height} width={e.width}
     color={e.color} x={e.x} fontStyle={e.fontFamily}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} fontSize={e.fontSize}
    
    />
    break;
    case "image" :
    return <ImageComponent  
     id={e.id} url={e.url? e.url : ""}
    height={e.height} width={e.width}
     color={e.color} x={e.x} 
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i}
    
    />
    case "circle" :
    return <CircleComponent  id={e.id}
      radius={e.radius} color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} 
    
    />
    break;
    case "triangle" :
    return <TriangleComponent
    
    id={e.id}
      radius={e.radius} color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} 
    
    />
    break;
    case "arrow" :
    return <LineArcComponent  id={e.id}
      radius={e.radius} color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} 
    
    />
    break;
    }
  })


console.log(selectedCnva.state)
  const refTestMomo=useRef<Konva.Stage>(null)

  //function qui permet de sauvegarde le pdf
  function handleSavingPdf(){
    const momo =refTestMomo.current?.toDataURL()
    console.log(momo)
    console.log(refTestMomo)
    if(refTestMomo.current!=null)
    {
      console.log(refTestMomo.current)
      
      const momo =new jsPDF('p',"px",[refTestMomo.current.width(),
        refTestMomo.current.height()])
      momo.addImage(
        refTestMomo.current.toDataURL({ pixelRatio: 2 }),".jpeg",
        0,
        0,
        refTestMomo.current.width(),
        refTestMomo.current.height()
      );
      momo.save("example")
    }
  }
  return (
    
   
    <main className="flex  w-full bg-slate-200
     flex-col items-center justify-between gap-4 ">
      
      
      <div className='w-full gap-8'>
        <ModifySelectedComponent  savePdf={handleSavingPdf}/>
      </div>
      <section className='w-full flex  h-full
       bg-slate-200  items-center justify-center relative  '>
      {filteredId[0]?.typeOfShape==="text"&& 
           <div className='absolute bg-black z-40 '>
 
  <motion.textarea    value={filteredId[0].text&&filteredId[0].text}
  
  className=' bg-slate-300 text-slate-50 z-20 inset-0
    '> </motion.textarea>
    </div>}
    <div>
     
      </div>
 
      <CanvaComponentNext refOfStage={refTestMomo} >
      {allTransComponent}
      </CanvaComponentNext>
    </section>
    </main>
   
 
  )
}
