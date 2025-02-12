import { useState } from "react";
import "./App.css";
import Editor from "./Editor"


function App() {
  const [val, setVal] = useState("X");

  const getValue = async () => {
    const response = await fetch("http://127.0.0.1:5000/value");
    const data = await response.json();
    setVal(data.value);
  };

  return (
    <div className="App">
      <Editor></Editor>
    </div>
  );
}

export default App;
