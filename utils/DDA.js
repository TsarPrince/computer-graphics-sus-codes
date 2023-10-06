import put_pixel from "./put_pixel.js";

const DDA = (inputX, inputY, ctx) => {
  const timeStart = performance.now();
  const pixels = [];

  const [x1, x2] = inputX;
  const [y1, y2] = inputY;
  let x = x1;
  let y = y1;
  put_pixel(x, y, pixels, ctx);

  const m = (y2 - y1) / (x2 - x1);

  if (m == Infinity) {
    while (y != y2) {
      y++;
      put_pixel(x, y, pixels, ctx);
    }
  } else {
    if (m > -1 && m < 1) {
      while (x != x2) {
        x++;
        y += m;
        put_pixel(x, Math.round(y), pixels, ctx);
      }
    } else if (m >= 1) {
      while (y != y2) {
        y++;
        x += 1 / m;
        put_pixel(Math.round(x), y, pixels, ctx);
      }
    } else if (m <= -1) {
      while (y != y2) {
        y--;
        x -= 1 / m;
        put_pixel(Math.round(x), y, pixels, ctx);
      }
    }
  }
  const timeEnd = performance.now();
  return { pixels, m, approxTime: timeEnd - timeStart };
};

export default DDA;
