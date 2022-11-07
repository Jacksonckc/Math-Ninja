const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1000);
const CANVAS_HEIGHT = (canvas.height = 1000);
// const image = new Image();
// image.src = '../boom/boom.png';
// console.log(image);

// Questions
const questions = [
  { answer: 3, question: "1 + 2" },
  { answer: 4, question: "2 + 2" },
  { answer: 4, question: "3 + 1" },
];

let x = 0;
let y = 1000;
let frame = 0;
const frameIncrementSpeed = 4;
let lastTime = 0;
let timeQuestion = 120;
let idx = 0;

const animate = (timestamp) => {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  // console.log(deltaTime);
  console.log(timeQuestion);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.drawImage(image, frame * 200, 0, 200, 179, x, 10, 100, 100);
  ctx.fillText("1", 50, y);
  ctx.fillText("2", 100, y);
  ctx.fillText("3", 150, y);
  ctx.fillText("4", 200, y);
  ctx.fillText(questions[idx].question, 500, 500);
  ctx.font = "30px Arial";
  update();
  requestAnimationFrame(animate);
};

const update = () => {
  if (y < 0) {
    y = 1000;
  } else {
    y--;
  }

  // Questions
  if (timeQuestion % 121 === 0) {
    if (idx === questions.length - 1) {
      idx = 0;
    } else {
      idx += 1;
    }
    timeQuestion = 120;
  } else {
    timeQuestion--;
  }

  if (x % frameIncrementSpeed === 0) {
    if (frame > 5) {
      frame = 0;
    } else {
      frame++;
    }
  }
};

animate(0);

var c = document.getElementById("canvas");
var ctx2 = c.getContext("2d");
var ball = {
  radius: 50,
  x: 200,
  y: 150,
  color: "#00F",
  draw: function () {
    var arcStartAngle = 0;
    var arcEndAngle = 2 * Math.PI;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, arcStartAngle, arcEndAngle);
    ctx.fill();
  },
};
ball.draw();
