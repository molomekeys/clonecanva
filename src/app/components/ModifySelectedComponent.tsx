"use client"
import { useAppSelector,useAppDispatch } from "@/hooks"
import { useDispatch } from "react-redux"
import { BlockPicker,GithubPicker,TwitterPicker } from 'react-color';

import {changeColor,changeTextNormal,changeTextBold,decreaseTextSize,increaseTextSize,specifiqueTextSize} from "../../features/canva/rectangle-slice"
const ModifySelectedComponent = () => {

    const selecTedId=useAppSelector(state=>state.selectedCanva)
  const allValues=useAppSelector(state=>state.rectangle)
const dispatch=useDispatch()
  console.log(allValues)
  console.log(selecTedId)
  const filteredId=allValues.filter((e)=>{
  if (e.id===selecTedId)
  {
    return e
  }
    
  })
  console.log(filteredId)
  return (
    <div className="  fixed bg-slate-50 h-fit py-6 px-4  w-full gap-20  z-20 flex text-slate-800">
       
       <div className="flex gap-4 items-center justify-center">
       <p>undo</p>
        <p>do</p>
       </div>
      {selecTedId.length>1&&  <div className="flex justify-between items-center w-full">
     {filteredId[0].typeOfShape==="text"&&   
     <div className="flex gap-8 items-center justify-center">
     <div className="flex w-22">
          
       
        <button   className="w-1/5 bg-gray-300 text-lg"
        onClick={()=>{
                dispatch(decreaseTextSize(selecTedId))
            }} >-</button>
             <input   onChange={(e)=>dispatch(specifiqueTextSize({fontSize:Number(e.target.value),idSelected:selecTedId}))}
             onBlur={(e)=>dispatch(specifiqueTextSize({fontSize:Number(e.target.value),idSelected:selecTedId}))}
             className="w-full text-center" 
              value={filteredId[0]?.fontSize} />
             <button  className="w-1/5 bg-gray-300 text-lg"
             onClick={()=>{
                dispatch(increaseTextSize(selecTedId))
            }} >+</button>
        </div>
        <p className={filteredId[0].fontFamily==="bold"? "font-bold": ""} onClick={()=>{
            
            
            filteredId[0].fontFamily==="bold"?  dispatch(changeTextNormal(selecTedId))
             : dispatch(changeTextBold(selecTedId))


        }}>G</p>
        
        </div>
        }
        <div className="m-4">
        <GithubPicker onChangeComplete={(colorSelected)=>{
        dispatch(changeColor({color:colorSelected.hex,idSelected:selecTedId}))

       }}
        color={filteredId[0]?.color}/>
            </div>
        <div className="flex items-center justify-between w-full gap-20">
      
     
        <p>{filteredId[0]?.x}</p>
        <p>{filteredId[0]?.y}</p>
        <p>{filteredId[0]?.fontFamily}</p>
    
        </div>
        </div>}
        </div>
  )
}
export default ModifySelectedComponent