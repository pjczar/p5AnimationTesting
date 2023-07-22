let svgImage; // Declare a variable to store the loaded SVG image
let canvasWidth, canvasHeight;
let posX, posY;
let speedX, speedY;

function preload() {
  // Load the SVG file during the preload phase
  svgImage = loadImage('G.svg');
}

function setup() {
  canvasWidth = windowWidth; // Set initial canvas width to match window width
  canvasHeight = windowHeight; // Set initial canvas height to match window height
  createCanvas(canvasWidth, canvasHeight);
  
  posX = width / 2; // Initial X position at the center of the canvas
  posY = height / 2; // Initial Y position at the center of the canvas
  speedX = random(-2, 2); // Random initial horizontal speed
  speedY = random(-2, 2); // Random initial vertical speed
}

function draw() {
  background(255);
  
  // Update canvas size every tick to match window size
  if (canvasWidth !== windowWidth || canvasHeight !== windowHeight) {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    resizeCanvas(canvasWidth, canvasHeight);
  }
  
  // Move the ball
  posX += speedX;
  posY += speedY;
  
  // Bounce the ball when it reaches the canvas edges
  if (posX <= 0 || posX >= width) {
    speedX *= -1;
  }
  if (posY <= 0 || posY >= height) {
    speedY *= -1;
  }
  
  // Draw the loaded SVG image at the position of the bouncing ball
  image(svgImage, posX - svgImage.width / 2, posY - svgImage.height / 2);
}
