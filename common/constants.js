// Define an object called constants that will hold constant values
const constants = {};

// Define properties on the constants object (file pathways)
constants.DATA_DIR = "../data";
constants.RAW_DIR = constants.DATA_DIR + "/raw";
constants.DATASET_DIR = constants.DATA_DIR + "/dataset";
constants.JSON_DIR = constants.DATASET_DIR + "/json";
constants.IMG_DIR = constants.DATASET_DIR + "/img";
constants.SAMPLES = constants.DATASET_DIR + "/samples.json";
constants.FEATURES = constants.DATASET_DIR + "/features.json";
constants.JS_OBJECTS = "../common/js_objects";
constants.SAMPLES_JS = constants.JS_OBJECTS + "/samples.js";
constants.FEATURES_JS = constants.JS_OBJECTS + "/features.js";

// If the "module" object exists (i.e., the code is running in a Node.js environment), export the "constants" object
if (typeof module !== "undefined") {
  module.exports = constants;
}
