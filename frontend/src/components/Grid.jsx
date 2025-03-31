import React, { useEffect } from "react";
import { COLORS } from "../colors.jsx";

const canvasheight = 500;
const canvaswidth = 500;

function circle(ctx, width, colour, iteration) {
  var radius = (iteration + 1) * width;
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = colour;
  ctx.stroke();
}

function line(ctx, width, colour, iteration, angle) {
  var radius1 = iteration * width;
  var radius2 = (iteration + 1) * width;
  ctx.beginPath();
  ctx.moveTo(
    ctx.canvas.width / 2 + radius1 * Math.cos(angle),
    ctx.canvas.height / 2 + radius1 * Math.sin(angle),
  );
  ctx.lineTo(
    ctx.canvas.width / 2 + radius2 * Math.cos(angle),
    ctx.canvas.height / 2 + radius2 * Math.sin(angle),
  );
  ctx.strokeStyle = colour;
  ctx.stroke();
}

function render(startingStitches) {
  var rows = 5;
  var stitches = startingStitches;
  var width = 50;
  var circlecolour = "black";
  var linecolour = "black";
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.canvas.width = canvaswidth;
  ctx.canvas.height = canvasheight;
  ctx.fillStyle = COLORS.light;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < rows; i++) {
    circle(ctx, width, circlecolour, i);
    for (let j = 0; j < (i + 1) * stitches; j++) {
      line(ctx, width, linecolour, i, (j * 2 * Math.PI) / ((i + 1) * stitches));
    }
  }
}

const Grid = ({ startingStitches }) => {
  useEffect(() => {
    render(startingStitches);
  }, [startingStitches]);

  return (
    <div className="chart-body">
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Grid;
