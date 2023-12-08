"use client"
import { useAppSelector,useAppDispatch } from "@/hooks"
import { addRectangle,addCircle,addBoldText ,addBigText,changeTextBold} from "@/features/canva/rectangle-slice"

const MenuComponents = () => {
    const ValueSelected=useAppSelector(state=>state.selectedCanva)
    const dispatch=useAppDispatch()
    
  return (
    <section className="flex flex-col p-4 bg-slate-400 w-full h-full">
<div className="flex flex-col gap-20 justify-start items-start w-full">
   

    <button onClick={()=>{
        dispatch(addBoldText())
    }}
    >Add Bold Header</button>
     <button onClick={()=>{
        dispatch(addBigText())
    }}
    >Add  Header</button>
         <button onClick={()=>{
        dispatch(changeTextBold(ValueSelected))
    }}
    >Transforme text to bold</button>
    <button onClick={()=>{
        dispatch(addRectangle())
    }}
    >Ajouter un rectangle</button>
     <button onClick={()=>{
        dispatch(addCircle())
    }}
    >Ajouter un Cercle</button>

</div>
    </section>
  )
}
export default MenuComponents