import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditorComponent() {
  const [value, setValue] = useState('');
const refText=useRef(null)



  return<section> 
    <div className="">
    <ReactQuill  ref={refText}
  theme="snow" value={value} onChange={setValue} />
  
  </div>
  </section>;
}