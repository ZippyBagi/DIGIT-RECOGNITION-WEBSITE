import React, { useRef } from "react";
import "./Row.css"
import Pixel from "./Pixel";

export default function Row(props) {
    const {selectedColor,holding } = props;
    const myref = useRef();
  
    let pixels = [];
    
    


    for (let i = 0; i < 28; i++) {
      pixels.push(<Pixel key={i} selectedColor={selectedColor} holding={holding} />);
    }
  
    return <div className="row" ref={myref}>{pixels}</div>;
  }