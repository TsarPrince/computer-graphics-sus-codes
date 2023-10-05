import { useEffect, useRef, useState } from "react";
import RangeSlider from "../components/RangeSlider";
import DDA from "../utils/DDA";

const DEFAULT_X = [25, 165];
const DEFAULT_Y = [30, 100];

export default function Home() {
  const canvasRef = useRef();

  const [inputX, setInputX] = useState(DEFAULT_X);
  const [inputY, setInputY] = useState(DEFAULT_Y);
  const [pixels, setPixels] = useState([]);
  const [m, setM] = useState();
  const [approxTime, setApproxTime] = useState();

  useEffect(() => {
    if (canvasRef.current) {
      console.log();
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#252525";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const {
        pixels: _pixels,
        m: _m,
        approxTime: _approxTime,
      } = DDA(inputX, inputY, ctx);

      setPixels(_pixels);
      setM(_m);
      setApproxTime(_approxTime);
    }
  }, [inputX, inputY]);

  return (
    <div>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <h1 className="text-xl font-medium">DDA line drawing algorithm</h1>
      <p>Approximate time = {approxTime} ms</p>
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
          max={150}
          defaultValue={DEFAULT_Y}
          updateInput={setInputY}
        />
      </div>
      <p>Slope = {m?.toFixed(2)}</p>
      <p>#(pixels) = {pixels?.length}</p>

      <div className="inline-block max-h-[300px] overflow-y-scroll">
        <table className="border">
          <thead>
            <tr className="border-b text-left bg-slate-50">
              <th className="pl-4 py-2 pr-12">x</th>
              <th className="pl-4 py-2 pr-12">y</th>
            </tr>
          </thead>
          <tbody>
            {pixels?.map((point, key) => (
              <tr key={key} className="border-b even:bg-slate-50">
                <td className="py-2 pl-4 pr-12">{point.x}</td>
                <td className="py-2 pl-4 pr-12">{point.y}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
