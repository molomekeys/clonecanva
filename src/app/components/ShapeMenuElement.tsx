import { useAppDispatch } from "@/hooks"
import { addArcArrow,addTriangle, addCircle,addRectangle } from "@/features/canva/rectangle-slice"
import { useDispatch } from "react-redux"
const ShapeMenuElement = () => {
    const dispatch=useDispatch()
  return (
   <section className="flex flex-col text-slate-50">

<div className="grid grid-cols-3 gap-20">
    <button
    onClick={()=>{
        dispatch(addRectangle())
    }}
    >Add a rectangle</button>
    <button  onClick={()=>{
        dispatch(addCircle())
    }}
    >Add a circle </button>
     <button  onClick={()=>{
        dispatch(addArcArrow())
    }}
    >Add Line </button>

<button  onClick={()=>{
        dispatch(addTriangle())
    }}
    >Add Triangle </button>
    </div>
   </section>

  )
}
export default ShapeMenuElement