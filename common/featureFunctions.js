// Define an empty `features` object
const featureFunctions = {};

// Add a `getPathCount` method to the `features` object
featureFunctions.getPathCount = (paths) => {
  // Return the length of the `paths` array
  return paths.length;
};

// Add a `getPointCount` method to the `features` object
featureFunctions.getPointCount = (paths) => {
  // Flatten the `paths` array into a one-dimensional array of `points`
  const points = paths.flat();
  // Return the length of the `points` array
  return points.length;
};

featureFunctions.getWidth = (paths) => {
  const points = paths.flat();
  const x = points.map((p) => p[0]);
  const min = Math.min(...x);
  const max = Math.max(...x);
  return max - min;
};

featureFunctions.getHeight = (paths) => {
  const points = paths.flat();
  const y = points.map((p) => p[1]);
  const min = Math.min(...y);
  const max = Math.max(...y);
  return max - min;
};

featureFunctions.inUse = [
  { name: "Path Count", function: featureFunctions.getPathCount },
  { name: "Point Count", function: featureFunctions.getPointCount },
  // { name: "Width", function: featureFunctions.getWidth },
  // { name: "Height", function: featureFunctions.getHeight },
];

// If the "module" object exists (i.e., the code is running in a Node.js environment), export the "features" object
if (typeof module !== "undefined") {
  module.exports = featureFunctions;
}
