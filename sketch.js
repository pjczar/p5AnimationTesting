let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 0.9; // Speed of the moving grid (increased by a factor of 3)
let grid = []; // 2D array to store characters in each cell
let characterChangeDelay = 20; // Delay for character changes
let characterChangeDuration = 30; // Duration of character change color effect
let characterChangeTimer = 0; // Timer for character changes
let columnsChanging = []; // Array to keep track of columns currently changing
let maxColumnsChanging = 7; // Maximum number of columns changing at the same time

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = ceil(width / gridSize) + 1;
  numRows = ceil(height / gridSize / 2) + 1;
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
}

function draw() {
  background(0); // Black background
  let cellSize = gridSize - 2; // Adjust the cell size for padding



  // Draw the grid in the lower half of the window
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let x1 = x * gridSize - gridSize / 2;
      let y1 = y * gridSize + yOffset + height / 2;

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

  // Chain reaction of character changes
  if (characterChangeTimer > 0) {
    characterChangeTimer--;
    if (characterChangeTimer === 0) {
      let columnsToChange = getRandomColumns(maxColumnsChanging);
      for (let i = 0; i < columnsToChange.length; i++) {
        let columnToChange = columnsToChange[i];
        columnsChanging[columnToChange] = true; // Mark the column as changing
        setTimeout(() => {
          // Set a delay for the character change color effect
          columnsChanging[columnToChange] = false; // Mark the column as not changing
          grid[0][columnToChange] = getRandomCharacter(); // Change the character in the top row
          // Propagate the character change down the column
          for (let y = 1; y < numRows; y++) {
            grid[y][columnToChange] = getRandomCharacter();
          }
        }, characterChangeDuration);
      }
      characterChangeTimer = characterChangeDelay; // Restart the character change timer
    }
  }
}

// Function to get a random alphanumeric character
function getRandomCharacter() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&!?';
  return chars.charAt(floor(random(chars.length)));
}

// Function to get an array of random column indices
function getRandomColumns(numColumns) {
  let columns = [];
  while (columns.length < numColumns) {
    let col = floor(random(numCols));
    if (!columns.includes(col)) {
      columns.push(col);
    }
  }
  return columns;
}
