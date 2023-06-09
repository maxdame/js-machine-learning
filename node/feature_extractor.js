// Require the `constants` and `features` modules from the "../common" directory
const constants = require("../common/constants.js");
const featureFunctions = require("../common/featureFunctions.js");

// Import the built-in Node.js fs module for interacting with the file system
const fs = require("fs");

console.log("EXTRACTING FEATURES...");

// Parse the `samples` JSON file into an array of objects
const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

// Loop through each object in the `samples` array
for (const sample of samples) {
  // Read the JSON file for the current sample's ID and parse it into an array of `paths`
  const paths = JSON.parse(fs.readFileSync(constants.JSON_DIR + "/" + sample.id + ".json"));

  const functions = featureFunctions.inUse.map((f) => f.function);
  sample.point = functions.map((f) => f(paths));

  // Add a `point` property to the current sample, which is an array containing the results of the `features.getPathCount` and `features.getPointCount` methods
  // sample.point = [featureFunctions.getPathCount(paths), featureFunctions.getPointCount(paths)];
}

// Define an array of feature names
const featureNames = featureFunctions.inUse.map((f) => f.name);

// Write the extracted features to a JSON file
fs.writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((s) => {
      return {
        point: s.point,
        label: s.label,
      };
    }),
  })
);

// Write the extracted features to a JavaScript file
fs.writeFileSync(
  constants.FEATURES_JS,
  `const features = 
  ${JSON.stringify({ featureNames, samples })};`
);

console.log("COMPLETED");
