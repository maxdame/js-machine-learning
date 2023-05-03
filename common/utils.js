// Define an empty object named "utils"
const utils = {};

// Defines an array "banned" user ids, which is used to blur inapproriate submissions
utils.flaggedUsers = [];

utils.styles = {
  car: { color: "gray", text: "🚗" },
  fish: { color: "red", text: "🐠" },
  house: { color: "yellow", text: "🏠" },
  tree: { color: "green", text: "🌳" },
  bicycle: { color: "cyan", text: "🚲" },
  guitar: { color: "blue", text: "🎸" },
  pencil: { color: "magenta", text: "✏️" },
  clock: { color: "lightgray", text: "🕒" },
};

// Define a method "formatPercent" on the "utils" object that takes a number "n" as input and returns the percentage value with two decimal places
utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

// Define a method "printProgress" on the "utils" object that takes two numbers "count" and "max" as input and prints the progress on the console.
// The progress is displayed in the format "count/max (percentage)"
utils.printProgress = (count, max) => {
  // Clear the current line on the console
  process.stdout.clearLine();
  // Move the cursor to the beginning of the line on the console
  process.stdout.cursorTo(0);
  // Calculate the percentage value of the progress
  const percent = utils.formatPercent(count / max);
  // Write the progress on the console in the format "count/max (percentage)"
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

// This function groups an array of objects by a specified key
utils.groupBy = (objArray, key) => {
  // Create an empty object to hold the groups
  const groups = {};
  // Iterate over each object in the input array
  for (let obj of objArray) {
    // Get the value of the specified key for the current object
    const val = obj[key];
    // If the value doesn't exist in the groups object, create an empty array for it
    if (groups[val] == null) {
      groups[val] = [];
    }
    // Add the current object to the array for the corresponding value in the groups object
    groups[val].push(obj);
  }
  // Return the object of grouped arrays
  return groups;
};

// If the "module" object exists (i.e., the code is running in a Node.js environment), export the "utils" object
if (typeof module !== "undefined") {
  module.exports = utils;
}
