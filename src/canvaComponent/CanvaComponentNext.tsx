"use client"
import React, { useRef, useState,Ref, forwardRef, LegacyRef, MutableRefObject, useEffect } from 'react';
import { Layer, Stage } from 'react-konva';
import { useAppDispatch ,useAppSelector} from '@/hooks';
import {unselectId} from "../features/canva/selectedCanva-slice"
import {closeColorMenu, closeInputMenu,closeMenu, closePositionMenu} from "../features/canva/menu-slice"
import {motion} from "framer-motion"
import  Konva from "konva"

import CanvaRichTextImage from '../app/components/CanvaRichTextImage';
import jsPDF from 'jspdf';
import CustomInputComponent from '@/app/components/shapeComponent/CustomInputComponent';
type GuideInfo = {
  lineGuide: number;
  diff: number;
  snap: string;
  offset: number;
};

interface Canva {
  children:React.ReactNode
  refOfStage:React.RefObject<Konva.Stage>

}
interface Momo{

}

function getLineGuideStops(skipShape:Konva.Node,layer:Konva.Layer) {
  // we can snap to stage borders and the center of the stage


  var vertical = [0, 500 / 2, 500];
  var horizontal = [0,600 / 2, 600];

  // and we snap over edges and center of each object on the canvas

  layer?.children.forEach((guideItem) => {
    if((guideItem.attrs?.name!="circle"||guideItem.attrs.name!="rectangle")&&
    guideItem._id==skipShape._id)
{
return
}
    var box = guideItem.getClientRect();
    // and we can snap to all edges of shapes
    vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
    horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
  });
  return {
    vertical: vertical.flat(),
    horizontal: horizontal.flat(),
  };
}

// what points of the object will trigger to snapping?
// it can be just center of the object
// but we will enable all edges and center
function getObjectSnappingEdges(node:Konva.Node) {
  var box = node.getClientRect();
  var absPos = node.absolutePosition();

  return {
    vertical: [
      {
        guide: Math.round(box.x),
        offset: Math.round(absPos.x - box.x),
        snap: 'start',
      },
      {
        guide: Math.round(box.x + box.width / 2),
        offset: Math.round(absPos.x - box.x - box.width / 2),
        snap: 'center',
      },
      {
        guide: Math.round(box.x + box.width),
        offset: Math.round(absPos.x - box.x - box.width),
        snap: 'end',
      },
    ],
    horizontal: [
      {
        guide: Math.round(box.y),
        offset: Math.round(absPos.y - box.y),
        snap: 'start',
      },
      {
        guide: Math.round(box.y + box.height / 2),
        offset: Math.round(absPos.y - box.y - box.height / 2),
        snap: 'center',
      },
      {
        guide: Math.round(box.y + box.height),
        offset: Math.round(absPos.y - box.y - box.height),
        snap: 'end',
      },
    ],
  };
}

// find all snapping possibilities
function getGuides(lineGuideStops: ReturnType <typeof getLineGuideStops>, 
itemBounds:ReturnType<typeof getObjectSnappingEdges>) {
  let GUIDELINE_OFFSET=5
  var resultV:GuideInfo[] = [];
  var resultH:GuideInfo[] = [];

  lineGuideStops.vertical.forEach((lineGuide) => {
    itemBounds.vertical.forEach((itemBound) => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      // if the distance between guild line and object snap point is close we can consider this for snapping
      if (diff < GUIDELINE_OFFSET) {
        resultV.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  lineGuideStops.horizontal.forEach((lineGuide) => {
    itemBounds.horizontal.forEach((itemBound) => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      if (diff < GUIDELINE_OFFSET) {
        resultH.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset,
        });
      }
    });
  });

  var guides = [];

  // find closest snap
  var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
  var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
  if (minV) {
    guides.push({
      lineGuide: minV.lineGuide,
      offset: minV.offset,
      orientation: 'V',
      snap: minV.snap,
    });
  }
  if (minH) {
    guides.push({
      lineGuide: minH.lineGuide,
      offset: minH.offset,
      orientation: 'H',
      snap: minH.snap,
    });
  }
  return guides;
}

function drawGuides(guides:ReturnType<typeof getGuides>,layer:Konva.Layer) {
  guides.forEach((lg) => {
    if (lg.orientation === 'H') {
      var line = new Konva.Line({
        points: [-6000, 0, 6000, 0],
        stroke: 'rgb(0, 161, 255)',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [4, 6],
      });
      layer.add(line);
      line.absolutePosition({
        x: 0,
        y: lg.lineGuide,
      });
    } else if (lg.orientation === 'V') {
      var line = new Konva.Line({
        points: [0, -6000, 0, 6000],
        stroke: 'rgb(0, 161, 255)',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [4, 6],
      });
      layer.add(line);
      line.absolutePosition({
        x: lg.lineGuide,
        y: 0,
      });
    }
  });
}



const CanvaComponentsext = ({children,refOfStage}:Canva) => {
    const dispatch=useAppDispatch()

    
const [isImage,setIsImage]=useState("")
function updateImage(e:string)
{
  setIsImage(e)
}
const [valueOfText,setValueOfText]=useState("")
function updateTextVal(e:string)
{
  setValueOfText(e)
}

const isOpenTextMenu=useAppSelector(b=>b.menuSelected.isInputOpen)

const [isClicking,setIsClicking]=useState("")
  return (
    <div  onClick={(e)=>{
    
    e.cancelable=true
   
     }}
     className='flex flex-col  h-full 
     w-full items-center justify-center relative'>

<div
onClick={(e)=>{

  e.preventDefault()

 if(isOpenTextMenu)
 {
  dispatch(closeInputMenu())
  refOfStage.current?.children[0].children.map((e)=>{
    e.show()
   })

 }
 else {
  dispatch(closeColorMenu())
  dispatch(closePositionMenu())
  dispatch(unselectId())
 }
  
}}
className='absolute z-20  inset-0 w-full h-full '>

</div>
<div className='relative z-10  w-full h-full 
 flex items-center justify-center'>
  <div className='w-fit h-fit relative z-30 bg-blue-800 flex flex-col'>
  {isOpenTextMenu&&<CustomInputComponent  />}

   <Stage ref={refOfStage}
     onClick={(e)=>{
      
  e.cancelBubble=true
   
  if(isOpenTextMenu)
  {
   dispatch(closeInputMenu())
   refOfStage.current?.children[0].children.map((e)=>{
     e.show()
    })
 
  }
  else {
   dispatch(closeColorMenu())
   dispatch(closePositionMenu())
   dispatch(unselectId())
  }
     }}
    scale={{x:1,y:1}}
    className='bg-white'
   height={600} width={500} >
    <Layer    onDragEnd={(e)=>{
      const stage=e.currentTarget.getLayer()
      stage?.find(".guid-line").forEach((e)=>{
        e.destroy()
      })
      

    }}
     onDragMove={(e)=>{
   
     const actualShapeMoved=e.target
     const stage=actualShapeMoved.getStage()
      const layer=e.currentTarget.getLayer()
      console.log(layer?.children)
      if(stage&&layer)
      {
        layer.find('.guid-line').forEach((l) => l.destroy());

        // find possible snapping lines
        var lineGuideStops = getLineGuideStops(e.target,layer);
        // find snapping points of current object
        var itemBounds = getObjectSnappingEdges(e.target);

        // now find where can we snap current object
        var guides = getGuides(lineGuideStops, itemBounds);

        // do nothing of no snapping
        if (!guides.length) {
          return;
        }

        drawGuides(guides,layer);

        var absPos = e.target.absolutePosition();
        // now force object position
        guides.forEach((lg) => {
          switch (lg.snap) {
            case 'start': {
              switch (lg.orientation) {
                case 'V': {
                  absPos.x = lg.lineGuide + lg.offset;
                  break;
                }
                case 'H': {
                  absPos.y = lg.lineGuide + lg.offset;
                  break;
                }
              }
              break;
            }
            case 'center': {
              switch (lg.orientation) {
                case 'V': {
                  absPos.x = lg.lineGuide + lg.offset;
                  break;
                }
                case 'H': {
                  absPos.y = lg.lineGuide + lg.offset;
                  break;
                }
              }
              break;
            }
            case 'end': {
              switch (lg.orientation) {
                case 'V': {
                  absPos.x = lg.lineGuide + lg.offset;
                  break;
                }
                case 'H': {
                  absPos.y = lg.lineGuide + lg.offset;
                  break;
                }
              }
              break;
            }
          }
        });
        e.target.absolutePosition(absPos);
      }

    

      }
    }
   >
  
      {children}
    </Layer>
   </Stage>
   </div>
   </div>
   </div>
  )
}
export default CanvaComponentsext