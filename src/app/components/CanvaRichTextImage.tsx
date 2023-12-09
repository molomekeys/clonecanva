import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const url = 'https://konvajs.github.io/assets/yoda.jpg';

interface CanvaRichTextProps{
    imageUrl:string
}
export default function CanvaRichText({imageUrl}:CanvaRichTextProps) {  
  const [image] = useImage(imageUrl);

  // "image" will be DOM image element or undefined

  return (
    <Image image={image} draggable />
  );
}