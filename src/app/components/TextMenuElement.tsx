import { useAppDispatch } from "@/hooks"
import { addBigText,addText,} from "@/features/canva/rectangle-slice"
import { useDispatch } from "react-redux"
const TextMenuElement = () => {
    const dispatch=useDispatch()
  return (
   <section className="flex flex-col text-slate-50">


    <button
    onClick={()=>{
        dispatch(addBigText())
    }}
    >Add a Header</button>
    <button  onClick={()=>{
        dispatch(addText())
    }}
    >Add a paragraph </button>
   </section>
  )
}
export default TextMenuElement