let svgImage; // Declare a variable to store the loaded SVG image
let canvasWidth, canvasHeight;

function preload() {
  // Load the SVG file during the preload phase
  svgImage = loadImage('G.svg');
}

function setup() {
  canvasWidth = windowWidth; // Set initial canvas width to match window width
  canvasHeight = windowHeight; // Set initial canvas height to match window height
  createCanvas(canvasWidth, canvasHeight);
  // Other setup code if needed
}

function draw() {
  background(255);
  
  // Update canvas size every tick to match window size
  if (canvasWidth !== windowWidth || canvasHeight !== windowHeight) {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
  }
  
  // Draw the loaded SVG image at the center of the canvas
  image(svgImage, width / 2 - svgImage.width / 2, height / 2 - svgImage.height / 2);
  
  // Apply animations or transformations to the SVG if needed
  // For example, you can use p5.js functions like translate(), rotate(), scale(), etc.
}
