import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import {saveNewState} from "../../features/canva/do-unredo-canva"
import { useAppDispatch, useAppSelector } from "@/hooks"
import {useDebounce} from "use-debounce"
interface typeResponse {
alt:string 
height:number 
id:number
src:{
    large:string 
    medium:string 
    original:string 
    small:string
}

}
const ImageMenuElement = () => {
    const dispatch=useAppDispatch()

const [isLookingImage,setIsLookingImage]=useState("")
const [value] = useDebounce(isLookingImage, 750);

console.log(isLookingImage)
  const {isLoading,data,refetch}=useQuery(["images",value],async()=>
  {
    const momo=await fetch(isLookingImage.length>1? 
        `https://api.pexels.com/v1/search?query=${isLookingImage}&per_page=20`
        :`https://api.pexels.com/v1/curated?per_page=20`,{
        headers:
        {
            Authorization:process.env.NEXT_PUBLIC_PEXELS_API_KEY!
        }
    }).then(e=>e.json())
    return momo.photos as typeResponse[]
  },)
  console.log(data)
  const allImages=data&&data.map((e)=>{
    return (
        <div  onClick={()=>{
dispatch(saveNewState({
    newInfo:{
        typeOfShape:"image",url:e.src.medium
        ,color:"",height:200,width:200,id:e.id.toString(),x:250,y:250,
    }
}))
        }}
        
        className="aspect-square w-full h-full">
            <img
             key={e.id} className="object-fit-cover w-full h-full"
            src={e.src.medium}/>
        </div>
    )
  })

  return (
    <div className="w-full h-full flex flex-col text-slate-800 p-4 gap-4">
       <input   onBlur={()=>refetch()}
       value={isLookingImage}
        onChange={(e)=>{
        setIsLookingImage(e.target.value)
       
       }}
     
    
       className="w-full border-2 bg-slate-50 border-slate-800  rounded-lg py-1 px-2" placeholder="Chercher une imagine"/>
      
       <section className="grid grid-cols-2 gap-8 place-items-center overflow-x-scroll overflow-y-scroll">
      {allImages}
       </section>
    </div>
  )
}
export default ImageMenuElement