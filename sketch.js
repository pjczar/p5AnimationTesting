let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 2.7; // Speed of the moving grid (increased by a factor of 3)
let grid = []; // 2D array to store characters in each cell
let characterChangeDelay = 60; // Delay for character changes (0.5 seconds)
let characterChangeDuration = 30; // Duration of character change color effect
let characterChangeTimer = 0; // Timer for character changes
let columnsChanging = []; // Array to keep track of columns currently changing
let maxColumnsChanging = 7; // Maximum number of columns changing at the same time

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = ceil(width / gridSize) + 1;
  numRows = ceil(height / gridSize * 0.8) + 1; // Extend the grid to 80% of the window height
  colorMode(RGB, 255); // Use RGB color mode

  // Initialize the grid with random characters
  for (let y = 0; y < numRows; y++) {
    grid[y] = [];
    for (let x = 0; x < numCols; x++) {
      grid[y][x] = getRandomCharacter();
    }
  }

  // Initialize columnsChanging array
  for (let x = 0; x < numCols; x++) {
    columnsChanging[x] = false;
  }

  // Set an interval to initiate character changes in the top row every 1 second
  setInterval(initiateCharacterChanges, 1000);
}

function initiateCharacterChanges() {
  // Choose a random number of columns to change (between 3 and 7)
  let numColumnsToChange = floor(random(3, 8));

  // Choose random columns in the top row to change
  let columnsToChange = [];
  while (columnsToChange.length < numColumnsToChange) {
    let col = floor(random(numCols));
    if (!columnsToChange.includes(col)) {
      columnsToChange.push(col);
    }
  }

  // Initiate character changes in the chosen columns
  for (let i = 0; i < columnsToChange.length; i++) {
    let columnToChange = columnsToChange[i];
    columnsChanging[columnToChange] = true; // Mark the column as changing
    setTimeout(() => {
      // Set a delay for the character change color effect
      columnsChanging[columnToChange] = false; // Mark the column as not changing
      grid[0][columnToChange] = getRandomCharacter(); // Change the character in the top row
      // Propagate the character change down the column with random delays
      for (let y = 1; y < numRows; y++) {
        setTimeout(() => {
          grid[y][columnToChange] = getRandomCharacter();
        }, random(100, 500)); // Random delay between 0.1 and 0.5 seconds
      }
    }, characterChangeDuration);
  }
}

function draw() {
  background(0, 200, 0); // Set the background to bright green
  noStroke();

  // Calculate the size of each cell based on the canvas dimensions and number of rows/columns
  let cellWidth = width / numCols;
  let cellHeight = height / numRows;

  // Draw the grid cells
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      // Set the color for the cell (bright green)
      let cellColor = color(0, 255, 0);
      // If the cell is currently changing its character, make it white
      if (columnsChanging[x] && y === 0) {
        cellColor = color(255);
      }
      fill(cellColor);
      // Draw the cell rectangle
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      // Draw the character in the cell
      fill(0, 255, 0); // Set the character color to bright green
      textSize(24);
      textAlign(CENTER, CENTER);
      text(grid[y][x], x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2);
    }
  }

  // Only initiate character changes in the top row after a certain time interval
  if (millis() - lastCharacterChangeTime >= characterChangeInterval) {
    initiateCharacterChanges();
    lastCharacterChangeTime = millis();
  }
}


// Function to get a random alphanumeric character
function getRandomCharacter() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&!?';
  return chars.charAt(floor(random(chars.length)));
}
