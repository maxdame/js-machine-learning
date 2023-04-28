// Import the draw module from a file path
const draw = require("../common/draw.js");

// Import the constants module from a file path
const constants = require("../common/constants.js");

// Import the utils module from a file path
const utils = require("../common/utils.js");

// Import the createCanvas function from the canvas module
const { createCanvas } = require("canvas");

// Create a new canvas with a width of 800 pixels and a height of 800 pixels
const canvas = createCanvas(400, 400);

// Get the 2D rendering context for the canvas
const ctx = canvas.getContext("2d");

// Import the built-in Node.js fs module for interacting with the file system
const fs = require("fs");

// If the DATASET_DIR path exists,
if (fs.existsSync(constants.DATASET_DIR)) {
  // Loop through the contents of the DATASET_DIR and remove each file recursively
  fs.readdirSync(constants.DATASET_DIR).forEach((fileName) =>
    fs.rmSync(constants.DATASET_DIR + "/" + fileName, { recursive: true })
  );

  // Remove the DATASET_DIR itself
  fs.rmdirSync(constants.DATASET_DIR);
}

// Create a new directory at the DATASET_DIR path
fs.mkdirSync(constants.DATASET_DIR);

// Create new directories at the JSON_DIR and IMG_DIR paths
fs.mkdirSync(constants.JSON_DIR);
fs.mkdirSync(constants.IMG_DIR);

// Log a message to the console
console.log("GENERATING DATASET ...");

// Retrieve an array of file names from the constants.RAW_DIR directory
const fileNames = fs.readdirSync(constants.RAW_DIR);

// Create an empty samples array to hold data from each file
const samples = [];

// Initialize a variable id to keep track of unique identifiers
let id = 1;

// Iterate over each file name in the fileNames array
fileNames.forEach((fn) => {
  // Read the content of the current file into the content variable
  const content = fs.readFileSync(constants.RAW_DIR + "/" + fn);

  // Parse the content of the current file as JSON and extract the session, student, and drawings properties
  const { session, student, drawings } = JSON.parse(content);

  // Iterate over each label in the drawings object
  for (let label in drawings) {
    // Add a new object to the samples array containing id, label, student_name, and user_id properties
    samples.push({
      id,
      label,
      student_name: student,
      user_id: session,
    });

    // Write the drawings[label] object as a JSON file with the name "id.json" in the JSON_DIR directory
    const paths = drawings[label];
    fs.writeFileSync(constants.JSON_DIR + "/" + id + ".json", JSON.stringify(paths));

    // Generate a PNG image file from the drawings[label] object and save it with the name "id.png" in the IMG_DIR directory
    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);

    utils.printProgress(id, fileNames.length * 8);

    // Increment the id counter
    id++;
  }
});

// Write the samples array as a JSON file with the name "samples.json" in the DATASET_DIR directory
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));


fs.writeFileSync(constants.SAMPLES_JS, "const samples =" + JSON.stringify(samples) + ";");

// Define a function called generateImageFile with parameters outFile and paths
function generateImageFile(outFile, paths) {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set background color
  ctx.fillStyle = "white";

  // Fill canvas with defined background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the paths on the canvas using the draw.paths method
  draw.paths(ctx, paths);

  // Convert the canvas to a PNG image buffer
  const buffer = canvas.toBuffer("image/png");

  // Write the image buffer as a file with the name "outFile" in the IMG_DIR directory
  fs.writeFileSync(outFile, buffer);
}
