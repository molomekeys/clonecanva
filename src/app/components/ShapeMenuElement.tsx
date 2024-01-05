import { useAppDispatch, useAppSelector } from "@/hooks"
import { addArcArrow,addTriangle, addCircle,addRectangle } from "@/features/canva/rectangle-slice"
import { saveNewState } from "@/features/canva/do-unredo-canva"
import { useDispatch } from "react-redux"
import {v4} from "uuid"
import { MdCircle, MdLineAxis, MdLineStyle, MdRectangle } from "react-icons/md";
import { WiDirectionRight} from "react-icons/wi";

const ShapeMenuElement = () => {
    const dispatch=useDispatch()
    const valueState=useAppSelector(state=>state.rectangle)
    const momo=useAppSelector(state=>state.doUnredo.state)
    console.log(momo)
  return (
   <section className="flex flex-col text-slate-50">

<div className="grid grid-cols-3 gap-10 px-10">
    <button
    onClick={async()=>{
      
        dispatch(saveNewState({newInfo:{id:v4(),color:"#05a206",height:50,width:50,x:400,y:400,typeOfShape:"rectangle"}}))


    }}
    ><MdRectangle size={100}/></button>
    <button  onClick={async()=>{
      
       dispatch(saveNewState({newInfo:{id:v4(),color:"#05a206",
       height:50,width:50,x:400,y:400,typeOfShape:"circle",radius:30}}))
    }}>
   <MdCircle size={100}/> </button>
     <button  onClick={async ()=>{
      

      dispatch(saveNewState({newInfo:
        {id:v4(),text:"hello bro ",color:"#000",height:20,width:20
        ,x:100,y:200,typeOfShape:"arrow",fontSize:30,}
    
    }))
   }
    }



    > <WiDirectionRight size={150}/> </button>

{/* <button  onClick={async()=>{
        await dispatch(addTriangle())
        dispatch(saveNewState(valueState))
    }}
    >Add Triangle </button> */}
    </div>
   </section>

  )
}
export default ShapeMenuElement