import put_pixel from "./put_pixel.js";

const Bresenham = (inputX, inputY, ctx) => {
  const timeStart = performance.now();
  const pixels = [];

  let [x1, x2] = inputX;
  let [y1, y2] = inputY;

  const m = (y2 - y1) / (x2 - x1);

  if (Math.abs(m) < 1) {
    if (x1 > x2) [x1, x2, y1, y2] = [x2, x1, y2, y1];
  } else {
    if (y1 > y2) [x1, x2, y1, y2] = [x2, x1, y2, y1];
  }

  const dy = Math.abs(y2 - y1);
  const dx = Math.abs(x2 - x1);
  let p = 2 * dy - dx;

  let x = x1;
  let y = y1;
  put_pixel(x, y, pixels, ctx);

  // CASE 1 : |m| = infinity

  if (Math.abs(m) == Infinity) {
    if (y > y2) [y, y2] = [y2, y];
    while (y != y2) {
      y++;
      put_pixel(x, y, pixels, ctx);
    }
  } else {
    // CASE 2.1 : |m| < 1

    if (Math.abs(m) < 1) {
      while (x != x2) {
        x++;
        if (p < 0) {
          p += 2 * dy;
          put_pixel(x, y, pixels, ctx);
        } else {
          m > 0 ? y++ : y--;
          p += 2 * dy - 2 * dx;
          put_pixel(x, y, pixels, ctx);
        }
      }
    } else {
      // CASE 2.2 : |m| >= 1

      while (y != y2) {
        y++;
        if (p < 0) {
          p += 2 * dx;
          put_pixel(x, y, pixels, ctx);
        } else {
          m > 0 ? x++ : x--;
          p += 2 * dx - 2 * dy;
          put_pixel(x, y, pixels, ctx);
        }
      }
    }
  }

  const timeEnd = performance.now();
  return { pixels, m, approxTime: timeEnd - timeStart };
};

export default Bresenham;
