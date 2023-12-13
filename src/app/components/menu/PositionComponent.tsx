import { CiAlignBottom, CiAlignCenterH, CiAlignCenterV, CiAlignLeft, CiAlignRight, CiAlignTop } from "react-icons/ci";
import { putOnBottom,putOnCenterVertical,putOnCenterHorizontal,putOnLeft,putOnTop,putOnRight } from "@/features/canva/do-unredo-canva"; 
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks";
const PositionComponent = () => {
    const dispatch=useDispatch()
    const selectedId=useAppSelector(e=>e.selectedCanva)
  return (
    <div className="flex flex-col w-full h-full gap-4 p-4 ">
        <p className={`"text-slate-400 font-semibold text-sm" `}>Aligner sur la page</p>
    <div className="flex flex-row font-semibold text-sm flex-wrap
     gap-4 w-full  gap-4 ">

    <div className="w-2/5 flex items-center p-2   hover:bg-slate-200 rounded-lg"
    onClick={()=>{
        dispatch(putOnTop(selectedId))
    }}
    
    >
        <CiAlignTop size={30} fontWeight="800"/>
        <label>Haut </label>
    </div>
    <div className="w-2/5 flex items-center p-2 hover:bg-slate-200 rounded-lg"
    onClick={()=>{
        dispatch(putOnLeft(selectedId))
    }}
    >
        <CiAlignLeft size={30}/>
        <label>Gauche </label>
    </div>
    <div className="w-2/5 flex items-center p-2 hover:bg-slate-200 rounded-lg"
    onClick={()=>{
        dispatch(putOnCenterHorizontal(selectedId))
    }}
    >
        <CiAlignCenterV size={30}/>
        <label>Centre </label>
    </div>
    <div className="w-2/5 flex items-center p-2 hover:bg-slate-200 rounded-lg"
    onClick={()=>{
        dispatch(putOnCenterVertical(selectedId))
    }}
    >
        <CiAlignCenterH size={30}/>
        <label>Centre </label>
    </div>
 

    <div onClick={()=>{
        dispatch(putOnBottom(selectedId))
    }}
    className="w-2/5 flex items-center p-2 hover:bg-slate-200 rounded-lg">
        <CiAlignBottom size={30}/>
        <label>Bas </label>
    </div>
  
    <div  onClick={()=>{
        dispatch(putOnRight(selectedId))
    }}
    className="w-2/5 flex items-center p-2 hover:bg-slate-200 rounded-lg">
        <CiAlignRight size={30}/>
        <label>Droite </label>
    </div>

    </div>
    </div>
  )
}
export default PositionComponent