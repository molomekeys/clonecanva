import { useAppDispatch } from "@/hooks"
import { addBigText,addText,} from "@/features/canva/rectangle-slice"
import { useDispatch } from "react-redux"
import { saveNewState } from "@/features/canva/do-unredo-canva"
import { v4 } from "uuid"
const TextMenuElement = () => {
    const dispatch=useDispatch()
  return (
   <section className="flex flex-col text-slate-50">

<div className="flex flex-col gap-6 p-4 items-center w-full ">
    <button className="text-5xl text-cemter "
    onClick={()=>{
        dispatch(saveNewState({
            newInfo:{
                fontSize:76,x:100,y:300,color:"black",height:0,
                width:0,id:v4(),typeOfShape:"text",text:"Hello world"
                ,fontFamily:"Calibri"
            }
        }))
    }}
    >Add a Header</button>
     <button className="text-3xl text-cemter "
    onClick={()=>{
        dispatch(saveNewState({
            newInfo:{
                fontSize:44,x:200,y:300,color:"black",height:0,
                width:0,id:v4(),typeOfShape:"text",text:"Hello world"
                ,fontFamily:"Calibri"
            }
        }))
    }}
    >Add a sub Header</button>
    <button className="text-lg text-cemter "
      onClick={()=>{
     dispatch(saveNewState({
        newInfo:{
            fontSize:30,x:200,y:300,color:"black",height:0,
            width:0,id:v4(),typeOfShape:"text",text:"Hello world"
            ,fontFamily:"Calibri"
        }
    }))
    }}
    >Add a paragraph </button>
    </div>
   </section>
  )
}
export default TextMenuElement