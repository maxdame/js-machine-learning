// This function creates a new row of elements in the container div
function createRow(container, studentName, samples) {
  // Create a new div element to serve as the row container.
  const row = document.createElement("div");
  // Add the "row" class to the row container element.
  row.classList.add("row");
  // Append the new row container to the provided container.
  container.appendChild(row);

  // Create a new div element to display the student name.
  const rowLabel = document.createElement("div");
  // Set the text content of the rowLabel element to the provided student name.
  rowLabel.innerHTML = studentName;
  // Add the "rowLabel" class to the rowLabel element.
  rowLabel.classList.add("rowLabel");
  // Append the rowLabel element to the new row container.
  row.appendChild(rowLabel);

  // Loop through the array of sample objects provided.
  for (let sample of samples) {
    // Extract the id and label properties from the sample object.
    const { id, label, user_id } = sample;

    const sampleContainer = document.createElement("div");
    sampleContainer.id = "sample_" + id;
    sampleContainer.onclick = () => handleClick(sample, false);
    sampleContainer.classList.add("sampleContainer");

    const sampleLabel = document.createElement("div");
    sampleLabel.innerHTML = label;
    sampleContainer.appendChild(sampleLabel);

    // Create a new img element.
    const img = document.createElement("img");
    // Set the source of the img element to the appropriate file path using constants.IMG_DIR and the sample id.
    img.src = constants.IMG_DIR + "/" + id + ".png";
    // Add the "thumb" class to the img element.
    img.classList.add("thumb");
    if (utils.flaggedUsers.includes(user_id)) {
      img.classList.add("blur");
    }

    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
}

function handleClick(sample, doScroll = true) {
  if (sample == null) {
    [...document.querySelectorAll(".emphasize")].forEach((e) => e.classList.remove("emphasize"));
    return;
  }
  const el = document.getElementById("sample_" + sample.id);
  if (el.classList.contains("emphasize")) {
    el.classList.remove("emphasize");
    chart.selectSample(null);
    return;
  }
  [...document.querySelectorAll(".emphasize")].forEach((e) => e.classList.remove("emphasize"));
  el.classList.add("emphasize");
  if (doScroll) {
    el.scrollIntoView({ behavior: "auto", block: "center" });
  }
  chart.selectSample(sample);
}

function toggleInput() {
  if (inputContainer.style.display == "none") {
    inputContainer.style.display = "block";
    sketchPad.triggerUpdate();
  } else {
    inputContainer.style.display = "none";
    chart.hideDynamicPoint();
  }
}
