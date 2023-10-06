import put_pixel from "./put_pixel.js";

const DDA = (inputX, inputY, ctx) => {
  const timeStart = performance.now();
  const pixels = [];

  let [x1, x2] = inputX;
  let [y1, y2] = inputY;
  let x = x1;
  let y = y1;

  const m = (y2 - y1) / (x2 - x1);

  // CASE 1 : |m| = infinity

  if (Math.abs(m) == Infinity) {
    if (y > y2) [y, y2] = [y2, y];
    put_pixel(x, y, pixels, ctx);

    while (y != y2) {
      y++;
      put_pixel(x, y, pixels, ctx);
    }
  } else {
    // CASE 2.1 : |m| < 1

    if (Math.abs(m) < 1) {
      if (x > x2) [x, y, x2, y2] = [x2, y2, x, y];
      put_pixel(x, y, pixels, ctx);
      while (x != x2) {
        x++;
        y += m;
        put_pixel(x, Math.round(y), pixels, ctx);
      }
    } else {
      // CASE 2.2 : |m| >= 1

      if (y > y2) [x, y, x2, y2] = [x2, y2, x, y];
      put_pixel(x, y, pixels, ctx);
      while (y != y2) {
        y++;
        x += 1 / m;
        put_pixel(Math.round(x), y, pixels, ctx);
      }
    }
  }
  const timeEnd = performance.now();
  return { pixels, m, approxTime: timeEnd - timeStart };
};

export default DDA;
