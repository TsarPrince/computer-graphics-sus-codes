import { useState } from "react";
import DrawLine from "../components/DrawLine";
import RangeSlider from "../components/RangeSlider";
import DDA from "../utils/DDA";
import Bresenham from "../utils/Bresenham";
import Native from "../utils/Native";

// const DEFAULT_X = [65, 25], DEFAULT_Y = [100, 30]; // m = 1.75 cursed case
// const DEFAULT_X = [25, 65], DEFAULT_Y = [30, 100]; // m = 1.75
const DEFAULT_X = [25, 65], DEFAULT_Y = [80, 100]; // m = 0.5
// const DEFAULT_X = [25, 65], DEFAULT_Y = [130, 100]; // m = -0.75
// const DEFAULT_X = [125, 90], DEFAULT_Y = [30, 100]; // m = -2

export default function Home() {
  const [inputX, setInputX] = useState(DEFAULT_X);
  const [inputY, setInputY] = useState(DEFAULT_Y);
  return (
    <div>
      <div className="flex">
        <DrawLine
          heading={"Digital Differential Analyzer"}
          algorithm={DDA}
          inputX={inputX}
          inputY={inputY}
        />
        <DrawLine
          heading={"Bresenham's"}
          algorithm={Bresenham}
          inputX={inputX}
          inputY={inputY}
        />
        <DrawLine
          heading={"JS Native algorithm"}
          algorithm={Native}
          inputX={inputX}
          inputY={inputY}
        />
      </div>

      <div className="flex space-x-4 mt-8">
        <span>x_range</span>
        <RangeSlider
          min={0}
          max={300}
          defaultValue={DEFAULT_X}
          updateInput={setInputX}
        />
      </div>
      <div className="flex space-x-4 mt-8">
        <span>y_range</span>
        <RangeSlider
          min={0}
          max={300}
          defaultValue={DEFAULT_Y}
          updateInput={setInputY}
        />
      </div>
    </div>
  );
}
