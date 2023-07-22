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
      grid[y].push({
        char: getRandomCharacter(),
        yPos: -y * cellSize // Start above the top of the canvas
      });
    }
  }

  // Initialize the columnsChanging array
  for (let i = 0; i < numCols; i++) {
    columnsChanging.push(false);
  }
}

function draw() {
  background(0); // Set the background to black
  noStroke();

  // Draw the grid cells
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      // Set the color for the cell (black)
      let cellColor = color(0);
      // If the entire column is currently changing characters, make it white
      if (columnsChanging[x]) {
        cellColor = color(255);
      }
      fill(cellColor);
      // Draw the cell rectangle
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
      // Draw the character in the cell
      let cell = grid[y][x];
      let textColor = color(0, 255, 0); // Set the character color to green
      if (columnsChanging[x] || dist(mouseX, mouseY, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2) < 60) {
        // If the column is changing or the mouse is within 60 pixels, set the text color to white
        textColor = color(255);
      }
      fill(textColor);
      textSize(24);
      textAlign(CENTER, CENTER);
      text(cell.char, x * cellSize + cellSize / 2, cell.yPos + cellSize / 2);

      // Move the character down
      cell.yPos += 1;
      // If the character goes off the screen, reset it to the top
      if (cell.yPos > height) {
        cell.yPos = -cellSize;
      }
    }
  }
}

function initiateColumnChange() {
  // Choose a random number of columns to change (between 2 and 7)
  let numColumnsToChange = floor(random(2, 8));

  // Choose random columns to change
  for (let i = 0; i < numColumnsToChange; i++) {
    let colToChange = floor(random(numCols));
    columnsChanging[colToChange] = true;
    setTimeout(() => {
      columnsChanging[colToChange] = false;
    }, changeInterval);
  }
}

function mouseMoved() {
  // Change the color of characters in a radius around the mouse cursor
  let mouseGridX = floor(mouseX / cellSize);
  let mouseGridY = floor(mouseY / cellSize);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let distance = dist(mouseX, mouseY, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2);
      // Calculate the new color based on the distance from the mouse cursor
      let textColor = color(0, 255, 0); // Set the character color to green
      if (columnsChanging[x] || distance < 60) {
        // If the column is changing or the mouse is within 60 pixels, set the text color to white
        textColor = color(255);
      }
      fill(textColor);
      text(grid[y][x].char, x * cellSize + cellSize / 2, grid[y][x].yPos + cellSize / 2);
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
