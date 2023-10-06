import put_pixel from "./put_pixel.js";

const Bresenham = (inputX, inputY, ctx) => {
  const timeStart = performance.now();
  const pixels = [];

  const [x1, x2] = inputX;
  const [y1, y2] = inputY;
  let x = x1;
  let y = y1;
  put_pixel(x, y, pixels, ctx);

  const dy = y2 - y1;
  const dx = x2 - x1;
  const m = dy / dx;
  let p = 2 * dy - dx;

  if (m == Infinity) {
    while (y != y2) {
      y++;
      put_pixel(x, y, pixels, ctx);
    }
    const timeEnd = performance.now();
    return { pixels, m, approxTime: timeEnd - timeStart };
  }

  if (m <= -1) {
    p = -2 * dx - dy;
    while (y != y2) {
      y--;
      if (p < 0) {
        x += 1;
        p += -2 * dx - 2 * dy;
        put_pixel(x, y, pixels, ctx);
      } else {
        p += -2 * dx;
        put_pixel(x, y, pixels, ctx);
      }
    }
    const timeEnd = performance.now();
    return { pixels, m, approxTime: timeEnd - timeStart };
  }
  if (m > -1 && m <= 0) {
    while (x != x2) {
      x++;
      if (p < 0) {
        y -= 1;
        p += 2 * dy + 2 * dx;
        put_pixel(x, y, pixels, ctx);
      } else {
        p += 2 * dy;
        put_pixel(x, y, pixels, ctx);
      }
    }
    const timeEnd = performance.now();
    return { pixels, m, approxTime: timeEnd - timeStart };
  }

  if (m > 0 && m <= 1) {
    while (x != x2) {
      x++;
      if (p < 0) {
        p += 2 * dy;
        put_pixel(x, y, pixels, ctx);
      } else {
        y += 1;
        p += 2 * dy - 2 * dx;
        put_pixel(x, y, pixels, ctx);
      }
    }
    const timeEnd = performance.now();
    return { pixels, m, approxTime: timeEnd - timeStart };
  }

  if (m > 1) {
    while (y != y2) {
      y++;
      if (p < 0) {
        p += 2 * dx;
        put_pixel(x, y, pixels, ctx);
      } else {
        x += 1;
        p += 2 * dx - 2 * dy;
        put_pixel(x, y, pixels, ctx);
      }
    }
    const timeEnd = performance.now();
    return { pixels, m, approxTime: timeEnd - timeStart };
  }
};

export default Bresenham;
