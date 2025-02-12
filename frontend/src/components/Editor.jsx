import React, { useState } from "react";
import "./Editor.css";
import { CirclePicker } from "react-color";
import DrawingPanell from "./DrawingPanell";


export default function Editor() {
  const [selectedColor, setColor] = useState("#ffff");
  const [hidePanel, setHidePanel] = useState(false);
  const [holding, setHolding] = useState(false);

  function changeColor(color) {
    setColor(color.hex);
  }
  

  document.body.onmousedown = function () {
    setHolding(true);
  };
  document.body.onmouseup = function () {
    setHolding(false);
  };

  return (
    <div id="editor">
      <h1>AI Number Recognizer - By ZippyBagi</h1>
      <h2>After you finish your drawing press guess!</h2>

      <CirclePicker
        color={selectedColor}
        colors={["#000", "#ffff"]}
        onChangeComplete={changeColor}
      ></CirclePicker>

      <DrawingPanell
        holding={holding}
        selectedColor={selectedColor}
        panel={hidePanel}
      ></DrawingPanell>

      
    </div>
  );
}
