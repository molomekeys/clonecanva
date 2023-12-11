import { useAppDispatch, useAppSelector } from "@/hooks"
import { addArcArrow,addTriangle, addCircle,addRectangle } from "@/features/canva/rectangle-slice"
import { saveNewState } from "@/features/canva/do-unredo-canva"
import { useDispatch } from "react-redux"
const ShapeMenuElement = () => {
    const dispatch=useDispatch()
    const valueState=useAppSelector(state=>state.rectangle)
    const momo=useAppSelector(state=>state.doUnredo.state)
    console.log(momo)
  return (
   <section className="flex flex-col text-slate-50">

<div className="grid grid-cols-3 gap-20">
    <button
    onClick={()=>{
        dispatch(addRectangle())
        dispatch(saveNewState(valueState))


    }}
    >Add a rectangle</button>
    <button  onClick={()=>{
        dispatch(addCircle())
        dispatch(saveNewState(valueState))
    }}
    >Add a circle </button>
     <button  onClick={()=>{
        dispatch(addArcArrow())
        dispatch(saveNewState(valueState))
    }}
    >Add Line </button>

<button  onClick={()=>{
        dispatch(addTriangle())
        dispatch(saveNewState(valueState))
    }}
    >Add Triangle </button>
    </div>
   </section>

  )
}
export default ShapeMenuElement