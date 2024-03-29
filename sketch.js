let grid;
let numRows, numCols;
let cellSize, charSize;
let cellSpeed;
let lastTime = 0;
let mouseRadius = 50;
let mouseChangeDelay = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = 14;
  charSize = 12;
  cellSpeed = 1.5;
  numRows = floor((height * 1.2) / cellSize) + 2; // Extend grid beyond window height
  numCols = floor(width / cellSize);
  createGrid();
}

function createGrid() {
  grid = [];
  for (let y = 0; y < numRows; y++) {
    let row = [];
    for (let x = 0; x < numCols; x++) {
      row.push({
        xPos: x * cellSize,
        yPos: y * cellSize - cellSize * 1.2, // Shift the grid up outside the window
        char: getRandomCharacter(),
        changeTime: 0,
        isMouseAffected: false,
      });
    }
    grid.push(row);
  }
}

function getRandomCharacter() {
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&!';
  return characters.charAt(floor(random(characters.length)));
}

function draw() {
  background(0);

  // Draw grid cells
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let cell = grid[y][x];
      let d = dist(mouseX, mouseY, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);

      // Character change and mouse color handling
      if (d < mouseRadius) {
        if (!cell.isMouseAffected) {
          cell.char = getRandomCharacter();
          cell.isMouseAffected = true;
          cell.changeTime = millis();
        }
        let mouseChangeColor = map(d, 0, mouseRadius, 255, 0);
        fill(255, mouseChangeColor);
      } else {
        if (millis() - cell.changeTime < mouseChangeDelay) {
          let changeColor = map(millis() - cell.changeTime, 0, mouseChangeDelay, 255, 0);
          fill(0, 255, 0, changeColor);
        } else {
          fill(0, 255, 0);
        }
      }

      // Draw black cell
      rect(cell.xPos, cell.yPos, cellSize, cellSize);
      
      // Draw green or white character
      fill(255);
      textSize(charSize);
      textAlign(CENTER, CENTER);
      text(cell.char, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);
    }
  }

  // Move rows down and handle row creation at the top
  if (millis() - lastTime >= 1000 / cellSpeed) {
    lastTime = millis();
    for (let y = numRows - 1; y >= 0; y--) {
      if (y > 0) {
        grid[y] = grid[y - 1];
      } else {
        let row = [];
        for (let x = 0; x < numCols; x++) {
          row.push({
            xPos: x * cellSize,
            yPos: -cellSize, // New rows generated outside the window
            char: getRandomCharacter(),
            changeTime: 0,
            isMouseAffected: false,
          });
        }
        grid[0] = row;
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  numRows = floor((height * 1.2) / cellSize) + 2;
  numCols = floor(width / cellSize);
  createGrid();
}
