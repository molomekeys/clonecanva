"use client"
import Image from 'next/image'
import dynamic from 'next/dynamic';

import { useState } from 'react';
import { v4 } from 'uuid';
import { useAppDispatch } from '@/hooks';
import { Provider } from 'react-redux';
import { store } from './store';

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

const CanvaCom = dynamic(() => import('./components/CanvaCom'), {
  ssr: false,
});

const TriangleComponent = dynamic(() => import('./components/shapeComponent/TriangleComponent'), {
  ssr: false,
});

const LineArcComponent= dynamic(() => import('./components/shapeComponent/LineArcComponent'), {
  ssr: false,
});






import { useAppSelector } from '@/hooks';
import {setSelectedId} from "../features/canva/selectedCanva-slice" 
import ModifySelectedComponent from './components/ModifySelectedComponent';
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
    heigth={e.height} width={e.width}
     color={e.color} x={e.x}
    y={e.y} isSelect={e.id===idSelected}
     onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i}
    
    />
    break;
    case "text" :
    return <TextComponent  text={e.text}
    heigth={e.height} width={e.width}
     color={e.color} x={e.x} fontStyle={e.fontFamily}
    y={e.y} isSelect={e.id===idSelected}
    onSelect={()=>dispatch(setSelectedId(e.id))} 
     key={i} fontSize={e.fontSize}
    
    />
    break;
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


  const infoOfSelected=allRectangle.filter((e)=>{
    return e?.id===idSelected
  })

  console.log(allTransComponent)
  return (
    <Provider store={store}>
    <main className="flex  w-full bg-slate-200
     flex-col items-center justify-between gap-4 ">
      
      
      <div className='w-full gap-8'>
        <ModifySelectedComponent/>
      </div>
      <section className='w-full flex  h-full
       bg-slate-200  items-center justify-center relative  '>
      {filteredId[0]?.typeOfShape==="text"&& 
           <div className='absolute bg-black z-40 '>
 
  <motion.textarea   value={filteredId[0].text&&filteredId[0].text}
  
  className=' bg-slate-300 text-slate-50 z-20 inset-0
    '> </motion.textarea>
    </div>}
 <CanvaCom >
      {allTransComponent}
      </CanvaCom>
    </section>
    </main>
    </Provider>
  )
}
