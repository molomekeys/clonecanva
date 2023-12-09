import { useAppDispatch } from "@/hooks"
import { addCircle,addRectangle } from "@/features/canva/rectangle-slice"
import { useDispatch } from "react-redux"
const ShapeMenuElement = () => {
    const dispatch=useDispatch()
  return (
   <section className="flex flex-col text-slate-50">


    <button
    onClick={()=>{
        dispatch(addRectangle())
    }}
    >Add a rectangle</button>
    <button  onClick={()=>{
        dispatch(addCircle())
    }}
    >Add a circle </button>
   </section>
  )
}
export default ShapeMenuElement