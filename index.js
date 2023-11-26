const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeElement = document.querySelector("#time");
const board = document.querySelector("#board");
let time = 0;
let score = 0;
const colors = [
  "#FF69B4",
  "#FF69B4",
  "#8A2BE2",
  "#00FF7F",
  "#FF7F50",
  "#ffff00",
];
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});
function startGame() {
  setInterval(decreaseTime, 1000);
  setTime(time);
  createCircle();
}
function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}
function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}
function finishGame() {
  timeElement.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
}
function createCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  let color = getRandomColor();
  circle.style.background = color;
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${x}px`;
  circle.style.left = `${y}px`;
  board.append(circle);
}
function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createCircle();
  }
});
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

