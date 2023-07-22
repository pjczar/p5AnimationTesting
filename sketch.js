let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 0.2; // Speed of the moving grid

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = ceil(width / gridSize) + 1;
  numRows = ceil(height / gridSize / 2) + 1;
  colorMode(HSB, 100); // Use HSB color mode for bright and saturated green
}

function draw() {
  background(0); // Black background
  let cellSize = gridSize - 2; // Adjust the cell size for padding
  
  // Draw the grid in the lower half of the window
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let x1 = x * gridSize - gridSize / 2;
      let y1 = y * gridSize + yOffset + height / 2;
      let x2 = x * gridSize + gridSize / 2;
      let y2 = y * gridSize + yOffset + gridSize + height / 2;
      
      // Apply perspective to vertical lines at the bottom
      if (y === numRows - 1) {
        x1 -= (numCols / 2 - x) * 5; // Adjust the multiplier for different proportions
        x2 += (numCols / 2 - x) * 5; // Adjust the multiplier for different proportions
      }
      
      // Random alphanumeric character for each cell
      let character = getRandomCharacter();
      
      // Fill the cell with bright green
      fill(80, 100, 100);
      
      // Apply glow effect using blendMode and filter
      blendMode(ADD); // Additive blend mode for glowing effect
      filter(BLUR, 5); // Blur filter to create the glow
      
      // Draw the cell
      rect(x1, y1, cellSize, cellSize);
      
      // Reset blendMode
      blendMode(BLEND);
      
      // Draw the alphanumeric character in the cell
      fill(0); // Black text color
      textSize(12);
      textAlign(CENTER, CENTER);
      text(character, x1 + cellSize / 2, y1 + cellSize / 2);
    }
  }
  
  // Calculate the offset for the moving grid
  yOffset += speed;
  if (yOffset >= gridSize) {
    yOffset = 0;
  }
}

// Function to get a random alphanumeric character
function getRandomCharacter() {
  let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let randomIndex = floor(random(characters.length));
  return characters.charAt(randomIndex);
}
