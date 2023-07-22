let grid;
let numRows, numCols;
let cellSize, charSize;
let cellSpeed;
let lastTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cellSize = 14;
  charSize = 12;
  cellSpeed = 2;
  numRows = floor((height * 0.8) / cellSize);
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
        yPos: y * cellSize,
        char: getRandomCharacter(),
        changeTime: 0,
      });
    }
    grid.push(row);
  }
}

function getRandomCharacter() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@&";
  return chars.charAt(floor(random(chars.length)));
}

function draw() {
  background(0);

  // Draw grid characters and handle character changes
  let currentTime = millis();
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let cell = grid[y][x];
      let d = dist(mouseX, mouseY, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);

      // Calculate the color based on mouse distance
      let fromColor = color(255); // White
      let toColor = color(0, 255, 0); // Green
      let cellColor = lerpColor(fromColor, toColor, map(d, 0, 60, 0, 1));

      // Change character based on mouse distance
      if (d < 60) {
        cell.char = getRandomCharacter();
        cell.changeTime = currentTime + random(200, 600); // Random change interval
      }

      // If it's time for the character to change, and it's not due to mouse proximity
      if (currentTime > cell.changeTime && d >= 60) {
        cell.char = getRandomCharacter();
        cell.changeTime = currentTime + random(200, 600); // Random change interval
      }

      // Draw cell with character
      textSize(charSize);
      textAlign(CENTER, CENTER);
      fill(cellColor);
      text(cell.char, cell.xPos + cellSize / 2, cell.yPos + cellSize / 2);
    }
  }

  // Move rows down and handle row creation at the top
  if (currentTime - lastTime >= 1000) {
    lastTime = currentTime;
    for (let y = numRows - 1; y >= 0; y--) {
      if (y > 0) {
        grid[y] = grid[y - 1];
      } else {
        let row = [];
        for (let x = 0; x < numCols; x++) {
          row.push({
            xPos: x * cellSize,
            yPos: -cellSize,
            char: getRandomCharacter(),
            changeTime: 0,
          });
        }
        grid[0] = row;
      }
    }
  }
}
