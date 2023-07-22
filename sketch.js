let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 0.1; // Speed of the moving grid
let grid = []; // 2D array to store characters in each cell
let characterChangeDelay = 20; // Delay for character changes
let characterChangeDuration = 30; // Duration of character change color effect
let characterChangeTimer = 0; // Timer for character changes
let columnChanging = []; // Array to keep track of whether a column is changing

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

  // Initialize columnChanging array
  for (let x = 0; x < numCols; x++) {
    columnChanging[x] = false;
  }
}

function draw() {
  background(0); // Black background
  let cellSize = gridSize - 2; // Adjust the cell size for padding

  // Draw the green line at the middle of the window
  stroke(0, 255, 0); // Green color for the line
  strokeWeight(40); // Line weight
  line(0, height / 2, width, height / 2);

  // Draw the grid in the lower half of the window
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let x1 = x * gridSize - gridSize / 2;
      let y1 = y * gridSize + yOffset + height / 2;

      // Fill the cell with black
      fill(0);

      // Draw the alphanumeric character in the cell
      fill(0, 255, 0); // Green text color
      if (columnChanging[x]) {
        fill(255); // White text color during character change
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
      let columnToChange = floor(random(numCols)); // Select a random column to change
      columnChanging[columnToChange] = true; // Mark the column as changing
      setTimeout(() => {
        // Set a delay for the character change color effect
        columnChanging[columnToChange] = false; // Mark the column as not changing
        grid[0][columnToChange] = getRandomCharacter(); // Change the character in the top row
      }, characterChangeDuration);
      characterChangeTimer = characterChangeDelay; // Restart the character change timer
    }
  }
}

// Function to get a random alphanumeric character
function getRandomCharacter() {
  let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let randomIndex = floor(random(characters.length));
  return characters.charAt(randomIndex);
}
