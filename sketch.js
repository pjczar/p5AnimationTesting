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
  background(0); // Black background
  let cellSize = gridSize - 2; // Adjust the cell size for padding

  // Draw the grid in the window
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let x1 = x * gridSize - gridSize / 2;
      let y1 = y * gridSize + yOffset + (height * 0.2) / 2; // Start the grid at 20% of the window height

      // Fill the cell with black
      fill(0);

      // Draw the alphanumeric character in the cell
      let colChanging = columnsChanging[x];
      if (y === 0 && colChanging) {
        fill(255); // White text color during character change
      } else {
        fill(0, colChanging ? 255 : 150, 0); // Bright green text color if column is changing
      }
      textSize(12);
      textAlign(CENTER, CENTER);
      text(grid[y][x], x1 + cellSize / 2, y1 + cellSize / 2);
    }
  }

  // Calculate the offset for the moving grid
  yOffset += speed;
  if (yOffset >= gridSize) {
    yOffset = 0;
    // Shift the characters in the grid when a new line appears at the top
    for (let y = numRows - 1; y > 0; y--) {
      grid[y] = grid[y - 1].slice();
    }
    // Generate a new line of characters at the top
    grid[0] = [];
    for (let x = 0; x < numCols; x++) {
      grid[0][x] = getRandomCharacter();
    }
    characterChangeTimer = characterChangeDelay; // Start the character change timer
  }
}

// Function to get a random alphanumeric character
function getRandomCharacter() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&!?';
  return chars.charAt(floor(random(chars.length)));
}
