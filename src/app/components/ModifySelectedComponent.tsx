"use client"
import { useAppSelector,useAppDispatch } from "@/hooks"
import { useDispatch } from "react-redux"
import { BlockPicker,GithubPicker,TwitterPicker } from 'react-color';
import { MdOutlineFormatColorText } from "react-icons/md";

import {increaseIndex,decreaseIndex,changeColor,changeTextNormal,changeTextBold,decreaseTextSize,increaseTextSize,specifiqueTextSize} from "../../features/canva/rectangle-slice"
import { openColorMenu } from "@/features/canva/menu-slice";
import { GrUndo,GrRedo } from "react-icons/gr";
import { goBackIndex,goNextIndex,putOnBottom, putOnCenterHorizontal, putOnCenterVertical, putOnLeft, putOnRight, putOnTop } from "@/features/canva/do-unredo-canva";
import { FaFileDownload } from "react-icons/fa";

interface ModifySelected{
  savePdf:()=>void
}

const ModifySelectedComponent = ({savePdf}:ModifySelected) => {

    const selecTedId=useAppSelector(state=>state.selectedCanva)
  const allValues=useAppSelector(state=>state.rectangle)
  const indexValMo=useAppSelector(s=>s.doUnredo)
const dispatch=useDispatch()
  console.log(allValues)
  console.log(selecTedId)
  const filteredId=allValues?.filter((e)=>{
  if (e?.id===selecTedId)
  {
    return e
  }
    
  })
  console.log(filteredId)
  return (
    <div className=" relative justify-between
      bg-slate-50 h-10 px-4  w-full  gap-2 
       z-20 flex text-slate-800">
       
       <div className="flex gap-4 items-center  max-w-fit
        justify-center ">
       <button className={`${indexValMo.index>0? "text-slate-500" : "text-slate-300"}`} onClick={()=>{
        dispatch(goBackIndex())
       }}>
        <GrUndo size={20}/>
       </button>
       <button className={`${indexValMo.index<indexValMo.state.length-1? "text-slate-500" : "text-slate-300"}`}
        onClick={()=>{
        dispatch(goNextIndex())
       }}>
        <GrRedo size={20}/>
       </button>


       </div>
      {selecTedId.length>1&&  
      
      //ceci c'est pour garantir que un element à ete selectionner
      <div className="flex justify-between items-center w-full pl-2 gap-4">


        {filteredId[0]?.id&&        <>        <p onClick={()=>{
        dispatch(increaseIndex(selecTedId))
     }}>Avancer</p>
       <p onClick={()=>{
        dispatch(decreaseIndex(selecTedId))
     }} className="whitespace-nowrap">Reculer</p>
     </>}
     {filteredId[0]?.typeOfShape==="text"&&   
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
        <div className="" onClick={()=>{
            dispatch(openColorMenu())
        }}>
        <MdOutlineFormatColorText size={20}/>
            </div>

            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnBottom(selecTedId))
        }}>
       <p>put on bottom</p>
       
            </div>
            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnRight(selecTedId))
        }}>
       <p>put on right</p>
       
            </div>
            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnTop(selecTedId))
        }}>
       <p>put on top</p>
       
            </div>
            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnLeft(selecTedId))
        }}>
       <p>put on left</p>
       
            </div>
            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnCenterVertical(selecTedId))
        }}>
       <p>put on center vertical</p>
       
            </div>
            <div className="" onClick={()=>{
              console.log("coucou")
            dispatch(putOnCenterHorizontal(selecTedId))
        }}>
       <p>put on center horizontal</p>
       
            </div>
       
        </div>}
        <div className="flex  ">

        <button  
         >
          <FaFileDownload  onClick={()=>{
            console.log("slt")
            savePdf()}}
          size={20}/>
        </button>
       </div>
        </div>
  )
}
export default ModifySelectedComponent