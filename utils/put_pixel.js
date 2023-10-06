const put_pixel = (x, y, pixels, ctx) => {
  pixels.push({ x, y });
  ctx.beginPath();
  ctx.arc(x, 300 - y, 1, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
};

export default put_pixel;
