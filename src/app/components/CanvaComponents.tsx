
"use client"

import { useEffect, useState,useRef } from 'react';
import { Stage, Layer, Rect, Circle,Text,Group } from 'react-konva';
import {motion, useMotionValue} from 'framer-motion'
import {v4} from 'uuid'
import Konva from 'konva';
interface StatProps{
id:string,
x:number,
y:number
}
interface TextShape{
    id:string,
    x:number,
    y:number,
    text:string,
    fontSize:number
    }
export default function CanvaComponents () {
    const [isAddedShape,setIsAddedShape]=useState<StatProps[]>([])
    const [isAddedTextShape,setIsAddedTextShape]=useState<TextShape[]>([])
    const [isSelectedText,setIsSelectedText]=useState(false)
    const [textChange,setTextChange]=useState("Add text")

    const handlePressing=(e:KeyboardEvent)=>{
        e?.preventDefault()
        const key=e.key
        if(isSelectedText)
        {
      
            setTextChange((prev)=>{

                switch(key)
                {
                case "Backspace" :
                 return prev.slice(0,-1)
                 break;
                 case " " :
                 return prev+" "
                 break;
                 case "Enter" :
                    return prev+"\n"
                    break;
                 
                    default:
                        if(key.length<2)
                        {
                        return prev+key
                    }
                    else {
                    return prev
                }
                }
            })

        
     
        }
    }

//     useEffect(()=>{
      
// if(isSelectedText){
// window.addEventListener("keydown",handlePressing)

// console.log("true event")
// }
// else {
//     console.log("false event")
//   window.removeEventListener("keydown",handlePressing)
//   }

  

//     },[isSelectedText])
useEffect(()=>{

},[isSelectedText])
    console.log(isSelectedText)
const [isInputData,setIsInputData]=useState("")
const xArea=useMotionValue(0)
const yArea=useMotionValue(0)
const rectRef = useRef<Konva.Text>(null);
const CanvaRef = useRef<Konva.Stage>(null);
const trRef=useRef(null)
    function addRect(){
        setIsAddedShape((e)=>{
            return [...e,{id:v4(),x:100,y:200}]
        })
    }
    function addText(){
        setIsAddedTextShape((e)=>{
            return [...e,{id:v4(),x:100,y:200,text:"Hello my main",fontSize:20}]
        })
    }
    const allReactangle=isAddedShape.map((e)=>{
        return <Rect x={e.x} y={e.y} fill="blue" height={40}  width={30} draggable/>
    })
    const allReactText=isAddedTextShape.map((e)=>{
        return   isSelectedText===false&&<Text   
         ref={rectRef}
              onDblClick={(momo)=>{
                if(rectRef.current!=null&&CanvaRef.current!=null)
                {
                    console.log(rectRef.current)
                    console.log(CanvaRef.current)
                    const absPosition=rectRef.current.absolutePosition()
                    const MOR=CanvaRef.current.offset()
                    
                    
                xArea.set(absPosition.x)
                yArea.set(absPosition.y+100)
            setIsSelectedText(e=>!e)


        }}} 

        onClick={()=>{
            console.log("click")
            setIsSelectedText(true)
        }}
         x={e.x} y={e.y} fill="blue" fontSize={e.fontSize}
         text={textChange} draggable/>
    
        
    })
  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
   <section className='flex flex-col w-[500px] bg-slate-400'>
<button onClick={()=>setIsSelectedText((e)=>!e)}> Deselect</button>
<button onClick={()=>{
    if(isSelectedText)
    {
        window.addEventListener("keydown",handlePressing)

    }
    else {
      window.removeEventListener("keydown",handlePressing)
    }

}}>Arreter d'ecouter </button>
    <button onClick={addRect}>Add a Rect </button>
    <button onClick={addText}>Add a text </button>
    <input placeholder='add text' className='w-48' onChange={(e)=>{
        setIsInputData(e.target.value)
    }}/>
   <Stage ref={CanvaRef} onClick={()=>setIsSelectedText(false)}
    width={window.innerWidth} height={window.innerHeight}>
      <Layer   >
        <Rect width={50} height={50} fill="red" onClick={()=>{
            
        }} />
        <Circle x={200} y={200} stroke="black" radius={50} />
        {...allReactangle}
        {...allReactText}
      </Layer>
      
    </Stage>
{isSelectedText&&    <motion.textarea  
 value={textChange}
 onChange={(e)=>{
    setTextChange(e.target.value)
}}
  initial={{x:xArea.get(),y:yArea.get()}}
 className='absolute z-40 min-h-fit resize-none h-max bg-opacity-0  bg-white border-none min-h-48  w-48 '>hELLO BRo</motion.textarea>
}    </section>
  );
}