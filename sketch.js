let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 0.1; // Speed of the moving grid
let grid = []; // 2D array to store characters in each cell

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = ceil(width / gridSize) + 1;
  numRows = ceil(height / gridSize / 2) + 1;
  colorMode(HSB, 100); // Use HSB color mode for bright and saturated colors

  // Initialize the grid with random characters
  for (let y = 0; y < numRows; y++) {
    grid[y] = [];
    for (let x = 0; x < numCols; x++) {
      grid[y][x] = getRandomCharacter();
    }
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
      
      // Fill the cell with bright green
      fill(80, 100, 100);
      
      // Add a slight shadow effect
      let shadowColor = color(80, 100, 100, 80); // Green with alpha value 80
      let shadowOffset = 2; // Shadow offset in pixels
      translate(shadowOffset, shadowOffset); // Translate to create the shadow effect
      rect(x1, y1, cellSize, cellSize);
      translate(-shadowOffset, -shadowOffset); // Reset translation
      
      // Draw the alphanumeric character in the cell
      fill(0, 100, 100); // Bright green text color
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
  }
}

// Function to get a random alphanumeric character
function getRandomCharacter() {
  let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let randomIndex = floor(random(characters.length));
  return characters.charAt(randomIndex);
}
