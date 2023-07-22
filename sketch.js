let squareSize = 100; // Size of the square

function setup() {
  createCanvas(400, 400);
  // Other setup code if needed
}

function draw() {
  background(255);
  
  // Draw a square at the center of the canvas
  fill(255, 0, 0); // Red fill color
  rectMode(CENTER);
  rect(width / 2, height / 2, squareSize, squareSize);
  
  // Apply animations or transformations to the square if needed
  // For example, you can use p5.js functions like translate(), rotate(), scale(), etc.
}
