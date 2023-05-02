// Define an empty `features` object
const features = {};

// Add a `getPathCount` method to the `features` object
features.getPathCount = (paths) => {
  // Return the length of the `paths` array
  return paths.length;
};

// Add a `getPointCount` method to the `features` object
features.getPointCount = (paths) => {
  // Flatten the `paths` array into a one-dimensional array of `points`
  const points = paths.flat();
  // Return the length of the `points` array
  return points.length;
};

// If the "module" object exists (i.e., the code is running in a Node.js environment), export the "features" object
if (typeof module !== "undefined") {
  module.exports = features;
}
