let svgImage; // Declare a variable to store the loaded SVG image

function preload() {
  // Load the SVG file during the preload phase
  svgImage = loadImage('images/racecar1.svg');
  svgImage2 = loadImage('images/racecar2.svg');
}

function setup() {
  createCanvas(400, 400);
  // Other setup code if needed
}

function draw() {
  background(255);
  
  // Draw the loaded SVG image at the center of the canvas
  image(svgImage, width / 2 - svgImage.width / 2, height / 2 - svgImage.height / 2);
  image(svgImage2, width / 3 - svgImage.width / 3, height / 3 - svgImage.height / 3);
  
  // Apply animations or transformations to the SVG if needed
  // For example, you can use p5.js functions like translate(), rotate(), scale(), etc.
}
