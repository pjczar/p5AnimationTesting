const numRows = 10; // Number of rows in the grid
const numCols = 20; // Number of columns in the grid
const cellSize = 30; // Size of each cell in the grid
const cellSpeed = 0.2; // Speed at which cells move down (adjust as needed)

let grid = []; // 2D array to store characters and positions

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Calculate the position for the top-left corner of the grid to be centered at the bottom
  let gridYOffset = windowHeight * 0.1; // 80% height, adjust as needed
  let gridXOffset = (windowWidth - numCols * cellSize) / 2;
  for (let y = 0; y < numRows; y++) {
    grid.push([]);
    for (let x = 0; x < numCols; x++) {
      grid[y].push({
        char: getRandomCharacter(),
        xPos: gridXOffset + x * cellSize,
        yPos: gridYOffset + y * cellSize,
        changeTime: millis() + random(1000, 7000) // Random time for each cell to change
      });
    }
  }
}

function draw() {
  // Background
  background(0);

  // Draw grid characters and handle character changes
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let cell = grid[y][x];
      let d = dist(mouseX, mouseY, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);

      // Change character and fill color based on mouse distance
      if (d < 60) {
        cell.char = 'W';
        fill(255, 255, 255, map(d, 0, 60, 255, 100)); // Fade to white as distance decreases
      } else {
        cell.char = 'G';
        fill(0, 255, 0);
      }

      // Draw cell with character
      textSize(cellSize);
      textAlign(CENTER, CENTER);
      text(cell.char, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);
    }
  }

  // Move rows down and handle row creation at the top
  let currentTime = millis();
  for (let y = 0; y < numRows; y++) {
    let row = grid[y];
    for (let x = 0; x < numCols; x++) {
      let cell = row[x];
      if (currentTime > cell.changeTime) {
        cell.changeTime = currentTime + random(1000, 7000); // Reset change time
        cell.char = getRandomCharacter();
      }
      cell.yPos += cellSpeed;
      // If the row goes below the canvas, reset its position and characters
      if (cell.yPos > windowHeight + cellSize) {
        cell.yPos = -cellSize;
        cell.char = getRandomCharacter();
      }
    }
  }
}

// Function to get a random character
function getRandomCharacter() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&';
  return chars.charAt(floor(random(chars.length)));
}
