import utils from './utils';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let gravity = 1;
let friction = 0.8;
const colors = ['#FD4A4C', '#0098db', '#E5E4DB', '#2d2d2d'];

let gravitySlider = document.getElementById('gravity');
let frictionSlider = document.getElementById('bounciness');
let button = document.querySelector('button');

canvas.width = window.innerWidth * 0.98;
canvas.height = window.innerHeight * 0.98;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

// Event Listeners
addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

button.addEventListener('click', function(event) {
  init();
});

gravitySlider.addEventListener('change', function(e) {
  gravity = e.target.value / 10;
  init();
});
frictionSlider.addEventListener('change', function(e) {
  friction = e.target.value / 10;
  init();
});
// Objects
function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
}

Ball.prototype.update = function() {
  if (this.y + this.radius + this.dy > canvas.height) {
    this.dy = -this.dy * friction;
  } else {
    this.dy += gravity;
  }

  if (
    this.x + this.radius + this.dx > canvas.width ||
    this.x - this.radius <= 0
  ) {
    this.dx = -this.dx;
  }

  this.x += this.dx;
  this.y += this.dy;
  this.draw();
};

Ball.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  c.fillStyle = this.color;
  c.fill();
  c.stroke();
  c.closePath();
};

// Implementation
let objects;
// let ball = new Ball(canvas.width / 2, canvas.height / 2, 0, 2, 30, 'red');

function init() {
  objects = [];
  gravitySlider.value = gravity * 10;
  frictionSlider.value = friction * 10;
  document.querySelector('#gravitylabel span').innerText = gravity;
  document.querySelector('#bouncinesslabel span').innerText = friction * 10;

  for (let i = 0; i < 700; i++) {
    let radius = utils.randomIntFromRange(8, 20);
    let x = utils.randomIntFromRange(radius, canvas.width - radius);
    let y = utils.randomIntFromRange(0, canvas.height - radius);
    let dx = utils.randomIntFromRange(-2, 2);
    let dy = utils.randomIntFromRange(-2, 2);
    let color = utils.randomColor(colors);
    objects.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // ball.update();

  objects.forEach(object => {
    object.update();
  });
}

init();
animate();
