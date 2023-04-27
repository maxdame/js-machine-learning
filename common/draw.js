// Create an empty object called "draw"
const draw = {};

// Add a method called "path" to the "draw" object
// Takes a 2D rendering context, an array of points that define the path, and an optional color
draw.path = (ctx, path, color = "#111111") => {
  // Set the stroke style of the context to the specified color
  ctx.strokeStyle = color;
  // Set the line width of the context to 3
  ctx.lineWidth = 3;
  // Begin a new path in the context
  ctx.beginPath();
  // Move the drawing cursor to the first point in the path
  ctx.moveTo(...path[0]);
  // Loop through the remaining points in the path and draw a line to each one
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(...path[i]);
  }
  // Set the line cap style of the context to "round"
  ctx.lineCap = "round";
  // Set the line join style of the context to "round"
  ctx.lineJoin = "round";
  // Draw the path on the canvas
  ctx.stroke();
};

// Add a method called "paths" to the "draw" object with more than one path
// Takes a 2D rendering context, an array of paths, and an optional color
draw.paths = (ctx, paths, color = "#111111") => {
  // Loop through each path in the array and draw it on the canvas using the "path" method
  for (const path of paths) {
    draw.path(ctx, path, color);
  }
};

module.exports = draw;
