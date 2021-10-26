// @ts-check

import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.3;
    const h = height * 0.3;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(30);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.fillRect(-w * 0.5, -h * 0.5, w, h);
    ctx.fill();
    ctx.restore();
  };
};

canvasSketch(sketch, settings);
