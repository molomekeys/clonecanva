import { Image,Transformer } from "react-konva"
import useImage from "use-image"
import {useRef,useEffect} from "react"
import Konva from "konva"
interface ImageComponentProps{
    url:string
    onSelect:()=>void 
    isSelect :boolean,color:string
    id:string,
    x:number,heigth:number,width:number,y:number
}
const ImageComponent = ({url,isSelect,onSelect,id}:ImageComponentProps) => {
    const [image,setStatut]=useImage(url,"anonymous")
    const trRef=useRef<Konva.Transformer>(null)
    const refImage=useRef<Konva.Image>(null)
    console.log(id)
    console.log(isSelect)
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
      <Image image={image}    draggable onDblClick={onSelect}  
      ref={refImage}
      />

{isSelect&& <Transformer flipEnabled={false} 
      ref={trRef}/>}

  </>
  )
}
export default ImageComponent