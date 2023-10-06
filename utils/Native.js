const Native = (inputX, inputY, ctx) => {
  const timeStart = performance.now();

  const [x1, x2] = inputX;
  const [y1, y2] = inputY;

  ctx.beginPath();
  ctx.moveTo(x1, 300 - y1);
  ctx.lineTo(x2, 300 - y2);
  ctx.strokeStyle = "#fff";
  ctx.stroke();

  const timeEnd = performance.now();
  return {
    pixels: [],
    m: (y2 - y1) / (x2 - x1),
    approxTime: timeEnd - timeStart,
  };
};

export default Native;
