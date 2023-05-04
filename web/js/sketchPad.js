class SketchPad {
  constructor(container, onUpdate = null, size = 400) {
    // Create a new canvas element with the specified dimensions and style
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
      background-color:#f6f6f6;
      box-shadow: 0px 0px 10px 2px #f6f6f6;
      `;
    // Add the canvas to the specified container element
    container.appendChild(this.canvas);

    // Add a line break to the container
    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    // Add a div to the container
    const controls = document.createElement("div");
    controls.setAttribute("id", "controls");
    container.appendChild(controls);

    // Add an "undo" button to the container
    this.undoBtn = document.createElement("button");
    this.undoBtn.setAttribute("id", "undoBtn");
    this.undoBtn.innerHTML = "UNDO";
    controls.appendChild(this.undoBtn);

    // Add a "redo" button to the container
    this.redoBtn = document.createElement("button");
    this.redoBtn.setAttribute("id", "redoBtn");
    this.redoBtn.innerHTML = "REDO";
    controls.appendChild(this.redoBtn);

    // Add a "clear" button to the container
    this.clearBtn = document.createElement("button");
    this.clearBtn.setAttribute("id", "clearBtn");
    this.clearBtn.innerHTML = "CLEAR";
    controls.appendChild(this.clearBtn);

    // Get the 2D rendering context for the canvas
    this.ctx = this.canvas.getContext("2d");

    // Initialize instance variables
    this.lastPath = [];
    this.paths = [];
    this.isDrawing = false;

    // Call the redraw method to draw the canvas
    this.#redraw();

    this.onUpdate = onUpdate;

    this.reset();

    // Add event listeners for mouse and touch events
    this.#addEventListeners();
  }

  reset() {
    this.lastPath = [];
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  // Private method to add event listeners for the canvas
  #addEventListeners() {
    // When the mouse is pressed down on the canvas, add a new path to the list of paths being drawn
    this.canvas.onmousedown = (e) => {
      const mouse = this.#getMouse(e);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };
    // When the mouse is moved on the canvas while drawing, add the current mouse position to the last path in the list of paths
    this.canvas.onmousemove = (e) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(e);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw();
      }
    };
    // When the mouse is released on the canvas, stop drawing
    document.onmouseup = () => {
      this.isDrawing = false;
    };
    // When a touch starts on the canvas, call the mouse down event with the first touch location
    this.canvas.ontouchstart = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousedown(loc);
    };
    // When a touch moves on the canvas, call the mouse move event with the current touch location
    this.canvas.ontouchmove = (e) => {
      const loc = e.touches[0];
      this.canvas.onmousemove(loc);
    };
    // When a touch ends on the canvas, call the mouse up event
    document.ontouchend = () => {
      document.onmouseup();
    };
    // Add event listener for "undo" button click, which pops the last path from the paths array
    // and pushes it onto the lastPath array, then redraws the canvas
    this.undoBtn.onclick = () => {
      this.lastPath.push(this.paths.pop());
      this.#redraw();
    };

    // Add event listener for "redo" button click, which pops the last path from the lastPath array and pushes it onto the paths array, then redraws the canvas
    // Only allow redo if there is something in the lastPath array
    this.redoBtn.onclick = () => {
      if (this.lastPath.length >= 0) {
        this.paths.push(this.lastPath.pop());
        this.#redraw();
      }
    };

    // Add event listener for "clear" button click, which resets the paths and lastPath arrays, then redraws the canvas
    this.clearBtn.onclick = () => {
      if (this.lastPath.length >= 0) {
        this.paths = [];
        this.lastPath = [];
        this.#redraw();
      }
    };
  }

  #redraw() {
    // Clears the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draws all of the paths that have been stored
    draw.paths(this.ctx, this.paths);
    // Disables the undo button if there are no paths to undo, redo or clear, otherwise enables it
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
    if (this.lastPath.length > 0) {
      this.redoBtn.disabled = false;
    } else {
      this.redoBtn.disabled = true;
    }
    if (this.lastPath.length > 0 || this.paths.length > 0) {
      this.clearBtn.disabled = false;
    } else {
      this.clearBtn.disabled = true;
    }
    if (this.onUpdate) {
      this.onUpdate(this.paths);
    }
    this.triggerUpdate();
  }

  triggerUpdate() {
    if (this.onUpdate) {
      this.onUpdate(this.paths);
    }
  }

  #getMouse = (e) => {
    // Gets the coordinates of the mouse click/touch relative to the canvas
    const rect = this.canvas.getBoundingClientRect();
    return [Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top)];
  };
}
