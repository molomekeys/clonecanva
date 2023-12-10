import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {motion} from "framer-motion"
import html2canvas from 'html2canvas';

interface TextEditorProps{
    updateImage:(e:string)=>void
    value:string 
    updateVal:React.Dispatch<React.SetStateAction<string>>
}
export default function TextEditorComponent({updateImage,value,updateVal}:TextEditorProps) {
const refText=useRef<ReactQuill|null>(null)


async function generateImage(){
    if(refText.current!=null)
    {
        const urlToChange=await html2canvas(refText.current?.getEditor().root,{backgroundColor:"rgba(0,0,0,0)"}).then((e)=>e.toDataURL())
        updateImage(urlToChange)
    }
}

  return<section> 
    <button onClick={generateImage}>Click to test</button>
    <motion.div 
    className="flex flex-col 
    bg-transparent min-w-[40px] p-20  z-20 top-1/2 left-1/2">

    <ReactQuill  ref={refText} onBlur={generateImage}
  theme="snow" value={value} onChange={(e)=>updateVal(e)} />
  
  </motion.div>
  </section>;
}