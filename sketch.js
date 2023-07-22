let numRows, numCols;
let cellSize = 30;
let grid = [];
let columnsChanging = [];
let changeInterval = 1000; // Time interval (in milliseconds) for changing a column

function setup() {
  createCanvas(windowWidth, windowHeight);
  numRows = floor(height / cellSize);
  numCols = floor(width / cellSize);

  // Initialize the grid with random characters
  for (let y = 0; y < numRows; y++) {
    grid.push([]);
    for (let x = 0; x < numCols; x++) {
      grid[y].push(getRandomCharacter());
    }
  }

  // Initialize the columnsChanging array
  for (let i = 0; i < numCols; i++) {
    columnsChanging.push(false);
  }
}

function draw() {
  background(0, 200, 0); // Set the background to bright green
  noStroke();

  // Draw the grid cells
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      // Set the color for the cell (bright green)
      let cellColor = color(0, 255, 0);
      // If the entire column is currently changing characters, make it white
      if (columnsChanging[x]) {
        cellColor = color(255);
      }
      fill(cellColor);
      // Draw the cell rectangle
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      // Draw the character in the cell
      fill(0, 255, 0); // Set the character color to bright green
      textSize(24);
      textAlign(CENTER, CENTER);
      text(grid[y][x], x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
    }
  }
}

function initiateColumnChange() {
  // Choose a random column index to change
  let colToChange = floor(random(numCols));
  // Set the flag for the chosen column to true
  columnsChanging[colToChange] = true;

  // Set a timer to revert the column back to normal after the changeInterval
  setTimeout(() => {
    columnsChanging[colToChange] = false;
  }, changeInterval);
}

function mouseMoved() {
  // Change the color of characters in a radius around the mouse cursor
  let mouseGridX = floor(mouseX / cellSize);
  let mouseGridY = floor(mouseY / cellSize);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let distance = dist(mouseX, mouseY, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      // Calculate the new color based on the distance from the mouse cursor
      let newColor = color(255 - distance, 255, 255 - distance);
      fill(newColor);
      text(grid[y][x], x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
    }
  }
}

function getRandomCharacter() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&!@';
  return characters[floor(random(characters.length))];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = floor(height / cellSize);
  numCols = floor(width / cellSize);
}
