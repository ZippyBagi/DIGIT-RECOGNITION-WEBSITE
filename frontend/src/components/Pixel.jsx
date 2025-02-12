import React, { useState } from "react";
import "./Pixel.css";

export default function Pixel(props) {
  const { selectedColor ,holding} = props;

  const [pixelColor, setPixelColor] = useState("#000");
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);

  function applyColor() {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  }

  function changeColorOnHover() {
    setPixelColor(selectedColor);
    setOldColor(pixelColor);
  }

  function resetColor() {
    if(!holding){
        if (canChangeColor) {
            setPixelColor(oldColor);
          }
          setCanChangeColor(true);
    }
    
  }

  return (
    <div draggable="false"
      className="pixel"
      onClick={applyColor}
      onMouseEnter={changeColorOnHover}
      onMouseLeave={resetColor}
      style={{ backgroundColor: pixelColor }}
    ></div>
  );
}
