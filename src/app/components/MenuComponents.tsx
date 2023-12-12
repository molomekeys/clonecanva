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
import { CirclePicker, GithubPicker, SketchPicker, TwitterPicker } from "react-color";
import { changeColor } from "@/features/canva/do-unredo-canva";
import { FaSquare } from "react-icons/fa";

const MenuComponents = () => {
    const ValueSelected=useAppSelector(state=>state.selectedCanva)
    const dispatch=useAppDispatch()
    const valueMenu=useAppSelector(state=>state.menuSelected)

    const indexOfState=useAppSelector(st=>st.doUnredo)
    const selecTedId=useAppSelector(state=>state.selectedCanva)
  const allValues=useAppSelector(state=>state.rectangle)

  console.log(allValues)
  console.log(selecTedId)
  const filteredId=allValues.filter((e)=>{
  if (e?.id===selecTedId)
  {
    return e
  }
    
  })
  const merouaneArrayColor=indexOfState.state[indexOfState.index].map((e)=>{
    return e.color
  })
  const formatedArrayColor=new Set(merouaneArrayColor)
  const formatedMomo=Array.from(formatedArrayColor).map((e,i)=>{
   return <button  onClick={(momo)=>{
      dispatch(changeColor({color:e,id:selecTedId}))
    }}>
    <FaSquare 

    stroke="black" strokeWidth={2}

    size={50} color={e} key={i}/>
    </button>
  })
  const colorPalette = [
    '#000', '#FF7F00', '#545454', '#A6A6A6',
    '#D9D9D9', '#fff', '#FE3130', '#FF5756',
    '#FE65C3', '#CA6BE5', '#8C51FF', '#5E16EA',
    '#FF6666', '#FFB266', '#FFFF66', '#B2FF66',
    '#66FF66', '#66FFB2', '#66FFFF', '#66B2FF',
    '#6666FF', '#B266FF', '#FF66FF', '#FF66B2',
    '#999999', '#CCCCCC', '#E5E5E5', '#FFFFFF'
  ];
  
  const UnifiedcOLOR=colorPalette.map((e,i)=>{
    return  <button  onClick={(momo)=>{
      dispatch(changeColor({color:e,id:selecTedId}))
    }}>
   <FaSquare  
    stroke="black" strokeWidth={2}
  
  size={50} color={e} key={i}/>
  </button>
  })



  console.log(formatedArrayColor)

  return (
    <section className="flex w-full h-full ">
<div className={`flex flex-col text-slate-50 bg-[#18191A]   gap-6 
   ${(valueMenu.isOpen===true||valueMenu.isColor===true)? "w-fit " : "w-full "} `}>
   


         <div   onClick={()=>{
            dispatch(openMenu("photos"))}}
            className={`flex flex-col items-center  p-2 py-4 ${valueMenu.typeMenu==="photos"? "bg-[#252627] text-slate-200 font-semibold" : "bg-[#18191A] text-slate-500"} justify-center w-full`}
>
<SlPicture id="galeryShape"  size={20}/>
<label htmlFor="galeryShape" className="text-xs ">{`Photos`}</label>
</div>
     
     <div   onClick={()=>{
            dispatch(openMenu("element"))}}
className={`flex flex-col items-center gap-2 p-2 py-4   ${valueMenu.typeMenu==="element"? "bg-[#252627] text-slate-200 font-semibold" : "bg-[#18191A] text-slate-500"} justify-center w-full`}>
<LuShapes id="luShape"  size={20}/>
<label htmlFor="luShape" className="text-xs ">{`Élements`}</label>
</div>


<div   onClick={()=>{
            dispatch(openMenu("text"))}}
            className={`flex flex-col items-center gap-2 p-2 py-4  ${valueMenu.typeMenu==="text"? "bg-[#252627] text-slate-200 font-semibold" : "bg-[#18191A] text-slate-500"} justify-center w-full`}
>
<RiText id="riText"  size={20}/>
<label htmlFor="riText" className="text-xs ">Text</label>
</div>



</div>
{(valueMenu.isOpen===true||valueMenu.isColor===true)&&<div className="w-[400px] 
 bg-[#252627] relative flex flex-col ">
    
    
   {valueMenu.isOpen&& <button  onClick={()=>{
        dispatch(closeMenu())
    }}
    className="absolute  text-slate-70   top-1/2
     right-0  bg-white p-4 ">
        <IoIosArrowBack size={20}/>
    </button>}


    {(valueMenu.typeMenu==="element"&&valueMenu.isOpen===true)&&<ShapeMenuElement/>}
    {(valueMenu.typeMenu==="text"&&valueMenu.isOpen===true)&&<TextMenuElement/>}

    
    {(valueMenu.isColor&&ValueSelected.length>3)&&
    <div className="absolute  bg-slate-50 w-full  p-4
    h-full z-20 flex flex-col   ">
             <p className="text-xs text-left  font-semibold py-2 ">Couleurs du document</p>

    <div className="bg-transparent grid grid-cols-6 gap-2 ">
       {formatedMomo}
       </div>
       <p className="text-xs text-left  font-semibold py-2 ">Couleurs unis</p>

       <div className="bg-transparent grid grid-cols-6 gap-2">
       {UnifiedcOLOR}
       </div>
    
        </div>}

    
</div>}

    </section>
  )
}
export default MenuComponents