import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("red");
  const [isCycleActive, setIsCycleActive] = useState(true);

  useEffect(() => {
    const changeColor = (currentColor) => {
      switch (currentColor) {
        case "green":
          return "yellow";
        case "yellow":
          return "red";
        case "red":
        default:
          return "green";
      }
    };

    const intervalDuration = (currentColor) => {
      return currentColor === "yellow" ? 4000 / 3 : 4000;
    };

    let interval;
    if (isCycleActive) {
      interval = setInterval(() => {
        setColor((prevColor) => changeColor(prevColor));
      }, intervalDuration(color));
    }

    return () => {
      clearInterval(interval);
    };
  }, [color, isCycleActive]);

  const handleButtonClick = () => {
    setIsCycleActive((prevIsCycleActive) => !prevIsCycleActive);
  };

  const handleLightClick = (lightColor) => {
    if (!isCycleActive) {
      setColor(lightColor);
    }
  };

  return (
    <div className="traffic-light">
      <div
        className={`light red ${
          color === "red" ? "glow-red" : "gray"
        }`}
        onClick={() => handleLightClick("red")}
      />
      <div
        className={`light yellow ${
          color === "yellow" ? "glow-yellow" : "gray"
        }`}
        onClick={() => handleLightClick("yellow")}
      />
      <div
        className={`light green ${
          color === "green" ? "glow-green" : "gray"
        }`}
        onClick={() => handleLightClick("green")}
      />
      <button onClick={handleButtonClick}>
        {isCycleActive ? "Stop" : "Resume"} Cycle
      </button>
    </div>
  );
}

export default App;
