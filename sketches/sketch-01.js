import canvasSketch from "canvas-sketch";

const settings = {
  dimensions: [1080, 1080],
};

const colors = ["red", "green", "blue"];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const sketch = () => {
  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = width * 0.005;

    const w = width * 0.1;
    const h = height * 0.1;

    const gap = width * 0.03;

    const ix = width * 0.17;
    const iy = height * 0.17;

    const off = width * 0.02;

    let x, y;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        x = ix + (w + gap) * i;
        y = iy + (h + gap) * j;

        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.stroke();

        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.rect(x + off / 2, y + off / 2, w - off, h - off);
          // ctx.fillStyle = colors[getRandomInt(0, 3)];
          // ctx.fill();
          ctx.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);
