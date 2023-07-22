let numRows, numCols;
let cellSize, charSize;
let grid = [];
let cellSpeed = 0.2; // Doubled the speed

function setup() {
  createCanvas(windowWidth, windowHeight);
  numRows = floor(windowHeight / 14);
  numCols = floor(windowWidth / 14);
  cellSize = 14;
  charSize = 12;

  // Create grid and initialize characters
  for (let y = 0; y < numRows; y++) {
    let row = [];
    for (let x = 0; x < numCols; x++) {
      row.push({
        char: getRandomCharacter(),
        xPos: x * cellSize,
        yPos: y * cellSize,
        changeTime: 0,
      });
    }
    grid.push(row);
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

      // Calculate the color based on mouse distance
      let fromColor = color(0, 255, 0); // Green
      let toColor = color(255); // White
      let cellColor = lerpColor(fromColor, toColor, map(d, 0, 60, 0, 1));

      // Change character based on mouse distance
      if (d < 60) {
        cell.char = getRandomCharacter();
      }

      // Draw cell with character
      textSize(charSize);
      textAlign(CENTER, CENTER);
      fill(cellColor); // Apply the calculated color
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
        cell.changeTime = currentTime + random(100, 500); // Reset change time
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


function getRandomCharacter() {
  let characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()';
  return characters.charAt(floor(random(characters.length)));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = floor(windowHeight / 14);
  numCols = floor(windowWidth / 14);

  // Reset grid and initialize characters
  grid = [];
  for (let y = 0; y < numRows; y++) {
    let row = [];
    for (let x = 0; x < numCols; x++) {
      row.push({
        char: getRandomCharacter(),
        xPos: x * cellSize,
        yPos: y * cellSize,
        changeTime: 0,
      });
    }
    grid.push(row);
  }
}
