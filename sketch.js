let numRows; // Number of rows in the grid
let numCols; // Number of columns in the grid
const cellSize = 14; // Size of each cell in the grid
const charSize = 12; // Size of the characters within each cell
const cellSpeed = 0.2; // Speed at which cells move down (adjust as needed)

let grid = []; // 2D array to store characters and positions

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Calculate the number of rows and columns based on the window size and cell size
  numRows = floor((windowHeight * 0.8) / cellSize);
  numCols = floor(windowWidth / cellSize);
  
  // Create the grid
  for (let y = 0; y < numRows; y++) {
    grid.push([]);
    for (let x = 0; x < numCols; x++) {
      grid[y].push({
        char: getRandomCharacter(),
        xPos: x * cellSize,
        yPos: y * cellSize,
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
      textSize(charSize);
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
      if (cell.yPos > windowHeight) {
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
