import React, { useState } from "react";
import SlowList from "./SlowList";

function App() {
  const [text, setText] = useState("hello");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="display-2">Experimental</h1>
      <label>Type something: </label>
      <input value={text} onChange={handleChange} />
      <br />
      <SlowList text={text} />
    </div>
  );
}

export default App;
