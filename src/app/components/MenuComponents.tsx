"use client"
import { useAppSelector,useAppDispatch } from "@/hooks"
import { addRectangle,addCircle,addBoldText,addText ,addBigText,changeTextBold} from "@/features/canva/rectangle-slice"
import  { GrTemplate } from "react-icons/gr";
import { LuShapes } from "react-icons/lu";
import { RiText } from "react-icons/ri";
import {openMenu,closeMenu} from "../../features/canva/menu-slice"
import { IoIosArrowBack } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import ShapeMenuElement from "./ShapeMenuElement";
import TextMenuElement from "./TextMenuElement";
import { CirclePicker, SketchPicker, TwitterPicker } from "react-color";
import { changeColor } from "@/features/canva/rectangle-slice";
const MenuComponents = () => {
    const ValueSelected=useAppSelector(state=>state.selectedCanva)
    const dispatch=useAppDispatch()
    const valueMenu=useAppSelector(state=>state.menuSelected)

    const selecTedId=useAppSelector(state=>state.selectedCanva)
  const allValues=useAppSelector(state=>state.rectangle)

  console.log(allValues)
  console.log(selecTedId)
  const filteredId=allValues.filter((e)=>{
  if (e.id===selecTedId)
  {
    return e
  }
    
  })

  return (
    <section className="flex w-full h-full ">
<div className={`flex flex-col text-slate-50 bg-slate-900 
   ${valueMenu.isOpen||valueMenu.isColor? "w-fit " : "w-full "} `}>
   


         <div   onClick={()=>{
            dispatch(openMenu("photos"))}}
            className={`flex flex-col items-center gap-2  p-6 ${valueMenu.typeMenu==="photos"? "bg-slate-800" : "bg-slate-900"} justify-center w-full`}
>
<SlPicture id="galeryShape"  size={30}/>
<label htmlFor="galeryShape" className="text-xs font-semibold">{`Photos`}</label>
</div>
     
     <div   onClick={()=>{
            dispatch(openMenu("element"))}}
className={`flex flex-col items-center gap-2  p-6 ${valueMenu.typeMenu==="element"? "bg-slate-800" : "bg-slate-900"} justify-center w-full`}>
<LuShapes id="luShape"  size={30}/>
<label htmlFor="luShape" className="text-xs font-semibold">{`Élements`}</label>
</div>


<div   onClick={()=>{
            dispatch(openMenu("text"))}}
            className={`flex flex-col items-center gap-2  p-6 ${valueMenu.typeMenu==="text"? "bg-slate-800" : "bg-slate-900"} justify-center w-full`}
>
<RiText id="riText"  size={30}/>
<label htmlFor="riText" className="text-xs font-semibold">Text</label>
</div>



</div>
{(valueMenu.isOpen===true||valueMenu.isColor===true)&&<div className="w-[400px] 
 bg-slate-800 relative flex flex-col ">
    
    
   {valueMenu.isOpen&& <button  onClick={()=>{
        dispatch(closeMenu())
    }}
    className="absolute  text-slate-70   top-1/2
     right-0  bg-white p-4 ">
        <IoIosArrowBack size={20}/>
    </button>}


    {valueMenu.typeMenu==="element"&&<ShapeMenuElement/>}
    {valueMenu.typeMenu==="text"&&<TextMenuElement/>}
    {(valueMenu.isColor&&ValueSelected.length>1)&&
    <div className="absolute gap-4  bg-slate-50 w-full 
    h-full z-20 flex flex-col items-center justify-center">
       
       <TwitterPicker    onChangeComplete={(e)=>{
        dispatch(changeColor({color:e.hex,idSelected:ValueSelected}))
       }}
       color={filteredId[0]?.color}
        triangle="hide" className="bg-slate-50 "/> 
       <CirclePicker    onChangeComplete={(e)=>{
        dispatch(changeColor({color:e.hex,idSelected:ValueSelected}))
       }}
       color={filteredId[0]?.color}/>
       <SketchPicker  onChangeComplete={(e)=>{
        dispatch(changeColor({color:e.hex,idSelected:ValueSelected}))
       }}
        color={filteredId[0]?.color}/>
        </div>}

    
</div>}

    </section>
  )
}
export default MenuComponents