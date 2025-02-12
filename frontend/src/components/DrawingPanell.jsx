import React, { useRef, useState } from "react";
import "./DrawingPanel.css";
import Row from "./Row";
import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingPanell(props) {
  const { selectedColor, panel, holding } = props;
  const panelRef = useRef();

  let rows = [];

  for (let i = 0; i < 28; i++) {
    rows.push(
      <Row
        key={i}
        width={28}
        selectedColor={selectedColor}
        holding={holding}
      ></Row>
    );
  }

  const sendData = async (a) => {
    const data = a;

    const url = "http://127.0.0.1:5000/img";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const data2 = await response.json();

    alert(await getValue());
  };

  const getValue = async () => {
    const response = await fetch("http://127.0.0.1:5000/value");
    const data = await response.json();
    return data.value;
  };

  function printAllPixels() {
    let a = "";
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 28; j++) {
        a =
          a +
          panelRef.current.childNodes[i].childNodes[j].style.backgroundColor[4];
      }
    }

    sendData(a);
  }
  function createPanel() {
    location.reload();
  }

  if (panel == false)
    return (
      <div className="main">
        <button className="btn" onClick={createPanel}>
          Reset
        </button>
        <div id="drawingPanel">
          <div ref={panelRef} id="pixels">
            {rows}
          </div>
        </div>

        <div className="guess_btn">
          <button className="btn" onClick={printAllPixels}>
            GUESS
          </button>
        </div>
      </div>
    );
  else return <div className="s"></div>;
}
