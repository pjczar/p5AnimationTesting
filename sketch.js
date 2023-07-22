let gridSize = 20; // Size of each grid cell
let numCols, numRows; // Number of columns and rows in the grid
let yOffset = 0; // Y offset for the moving grid
let speed = 0.5; // Speed of the moving grid
let middleLineColor; // Color for the middle line

function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = ceil(width / gridSize) + 1;
  numRows = ceil(height / gridSize / 2) + 1;
  middleLineColor = color(random(255), random(255), random(255));
}

function draw() {
  background(0); // Black background
  
  // Calculate the position of the middle line
  let middleY = height / 2;
  
  // Draw the grid in the lower half of the window
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let x1 = x * gridSize - gridSize/2;
      let y1 = y * gridSize + yOffset + middleY;
      let x2 = x * gridSize + gridSize/2;
      let y2 = y * gridSize + yOffset + gridSize + middleY;
      
      // Apply perspective to vertical lines at the bottom
      if (y === numRows - 1) {
        x1 -= (numCols/2 - x) * 2;
        x2 += (numCols/2 - x) * 2;
      }
      
      // Draw the grid lines
      let color1 = color(random(255), random(255), random(255));
      let color2 = color(random(255), random(255), random(255));
      let inter = map(y, 0, numRows - 1, 0, 1);
      let c = lerpColor(color1, color2, inter);
      stroke(c);
      noFill();
      strokeWeight(1); // Smaller stroke weight for grid lines
      rect(x1, y1, x2 - x1, y2 - y1);
    }
  }
  
  // Draw a thick line at the middle position above the grid
  middleLineColor = color(random(255), random(255), random(255));
  stroke(middleLineColor); // Randomly change the color of the middle line
  strokeWeight(10); // Thick stroke
  line(0, middleY, width, middleY);
  
  // Calculate the offset for the moving grid
  yOffset += speed;
  if (yOffset >= gridSize) {
    yOffset = 0;
  }
}
