"use client"
import { Image,Transformer } from "react-konva"
import useImage from "use-image"
import {useRef,useEffect} from "react"
import { useAppDispatch } from "@/hooks"    
import { changeScale } from "@/features/canva/do-unredo-canva"
import Konva from "konva"
import { useDispatch } from "react-redux"
interface ImageComponentProps{
    url:string
    onSelect:()=>void 
    isSelect :boolean,color:string
    id:string,
    x:number,height:number,width:number,y:number
}
const ImageComponent = ({url,isSelect,onSelect,id,height,width,x,y}:ImageComponentProps) => {
    const [image,setStatut]=useImage(url,"anonymous")
    const trRef=useRef<Konva.Transformer>(null)
    const refImage=useRef<Konva.Image>(null)
    console.log(id)
    console.log(isSelect)
    const dispatch=useDispatch()
    useEffect(()=>{

        if(isSelect)
        {
            if(trRef.current&&refImage.current)
            {
            trRef.current?.nodes([refImage.current])

        }
     }
        else {

        }

    },[isSelect])
    if(setStatut==="loading")
    {
        return <></>
    }
  return (<>
      <Image image={image}   width={width} x={x} height={height}
y={y}      
      onTransformEnd={()=>{
        const node = refImage.current;
        if(node)
        {
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
      
        node.scaleY(1)
        node.scaleX(1)
         
        const width=node.width(
            
        )
        const height=node.height()

        dispatch(changeScale({id:id,
            width:  width * scaleX,
            height:height * scaleY
            ,x:node.x(),y:node.y()
          }))
        
        
      }
    }}
      draggable onDblClick={onSelect}  
      ref={refImage}
      />

{isSelect&& <Transformer flipEnabled={false} 
      ref={trRef}/>}

  </>
  )
}
export default ImageComponent