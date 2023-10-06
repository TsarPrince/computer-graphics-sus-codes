import { useEffect, useRef, useState } from "react";
import setPrecision from "../utils/setPrecision";

export default function DDA_component({ heading, algorithm, inputX, inputY }) {
  const canvasRef = useRef();

  const [pixels, setPixels] = useState([]);
  const [m, setM] = useState();
  const [approxTime, setApproxTime] = useState();

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#252525";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const {
        pixels: _pixels,
        m: _m,
        approxTime: _approxTime,
      } = algorithm(inputX, inputY, ctx);

      setPixels(_pixels);
      setM(_m);
      setApproxTime(_approxTime);
    }
  }, [inputX, inputY]);

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} width={300} height={300}></canvas>
      <h1 className="text-xl font-medium">{heading}</h1>
      <p>Approximate time = {setPrecision(approxTime, 8)} ms</p>

      <p>Slope = {m?.toFixed(2)}</p>
      <p>#(pixels) = {pixels?.length}</p>

      <div className="inline-block max-h-[288px] overflow-y-scroll">
        <table className="border">
          <thead>
            <tr className="border-b text-left bg-slate-50">
              <th className="pl-4 py-2 pr-12 border-r">#</th>
              <th className="pl-4 py-2 pr-12">x</th>
              <th className="pl-4 py-2 pr-12">y</th>
            </tr>
          </thead>
          <tbody>
            {pixels?.map((point, key) => (
              <tr key={key} className="border-b even:bg-slate-50">
                <td className="py-2 pl-4 pr-12 border-r">{key + 1}</td>
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
