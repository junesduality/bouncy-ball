// Setup canvas
// Sets up a reference to the canvas element
const canvas = document.querySelector('canvas');
// ctx represents the drawing area of the canvas, thus allowing me to draw 2D shapes on it
const ctx = canvas.getContext('2d');
// Sets the width and height constants along with the canvas's width and height.
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// MODELING A BALL
function Ball(x, y, velX, velY, color, size) {
  // X and Y coordinates for postioning on the screen
  this.x = x;
  this.y = y;
  // Horizontal and vertical velocity for animation
  this.velX = velX;
  this.velY = velY;
  // Color DUH
  this.color = color;
  // The radius (distance from the middle of the cirlce to its circumference) of the ball in pixels
  this.size = size;
}

// DRAWING THE BALL
Ball.prototype.draw = function () {
  // beginPath() states that I want to draw a shape on the canvas
  ctx.beginPath();
  // fillSytle defines the color that I want the shape to be (it will be the same as the ball's color property)
  ctx.fillStyle = this.color;
  // arc() is used to trace and arc shape on the canvas
  // x and y position the arc's center, size represents the radius, and the last two parameters specify the start and end number of degrees aroud the circle that the arc is drawn between (2*PI = 360 deg in radians).
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  // fill() tells the computer to finish drawing the path started by beginPath(), and fill the area it takes up with the color specified in fillStyle
  ctx.fill();
};

// UPDATING THE BALL'S DATA
// I can now draw the ball onto the screen (canvas) but to move it around I must create an update function.
Ball.prototype.update = function () {
  // These series of if statements check to see if the ball has reached the edge of the canvas (the height and the width). If so, we reverse the velocity to make the ball travel in the opposite direction (if the ball is travelling upwards, then the vertical velocity (velY) is changed so that it starts to travel downwards (-velY))

  // The coordinates are in the center of the ball, but we don't want to reverse the velocity when the ball is halfway off the screen. By adding in the radius, I'm essentially saying that when the EDGE of the ball touches the edge of the window, reverse the velocity

  // right edge
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  // left edge
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  // bottom edge
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  // top edge
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  // Adds the velocities to both the x and y coordinates
  this.x += this.velX;
  this.y += this.velY;
};

// ANIMATING THE BALL
let balls = [];
// Create new ball objects until the array gets to 25 elements
while (balls.length < 25) {
  // The ball can only have a radius of 10 - 20 pixels
  let size = random(10, 20);
  // Creates a ball instance
  let ball = new Ball(
    // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    // Creates a random velocity
    random(-7, 7),
    random(-7, 7),
    // Generates a random color
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    size
  );
  // Pushes the ball instance into the array
  balls.push(ball);
}

function loop() {
  // Sets the canvas fill color to semi-transparent black so the previous few frames can shine through and produce a trail
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  // Draws a rectangle of the color across the whole width and height of the canvas. This covers up the previous fram's drawing before the next one is drawn
  ctx.fillRect(0, 0, width, height);
  // Loops through all the ball instances in the balls array so it can draw and update each one
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }
  // When this method is repeatedly run and passes the same function name, it creates a smooth animation by running it a set number of times.
  requestAnimationFrame(loop);
}

loop();