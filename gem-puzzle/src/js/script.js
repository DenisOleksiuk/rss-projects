import createHeader from './header.js';
import createPuzzle from './puzzle.js';
import modalWindow from './modal.js';

createHeader();
modalWindow();
createPuzzle();

const modal = document.querySelector('.modal-window');
const pause = document.querySelector('.pause');
const resume = document.querySelector('.resume');
const start = document.querySelector('.start');
const end = document.querySelector('.end');
const time = document.querySelector('.time');
const score = document.querySelector('.score');
let minutes = 0;
let seconds = 0;

function addZero(n) {
  return n < 10 ? `0${n}` : n;
}

function startTimer() {
  time.innerHTML = `${addZero(minutes)} : ${addZero(seconds)}`;
  seconds += 1;
  if (seconds > 59) {
    minutes += 1;
    seconds = 0;
  }
  setTimeout(startTimer, 1000);
}

function paused() {
  const field = document.querySelector('.area');
  modal.style.display = 'block';
  field.style.display = 'none';
  pause.style.display = 'none';
  resume.style.display = 'block';
}

function resumeGame() {
  const field = document.querySelector('.area');
  modal.style.display = 'none';
  field.style.display = 'grid';
  pause.style.display = 'block';
  resume.style.display = 'none';
}

function newGame() {
  const field = document.querySelector('.area');
  minutes = 0;
  seconds = 0;
  modal.style.display = 'none';
  field.remove();
  createPuzzle();
  startTimer();
  const newField = document.querySelector('.area');
  newField.style.display = 'grid';
  pause.style.display = 'block';
  resume.style.display = 'none';
}

function proceed() {
  const field = document.querySelector('.area');
  modal.style.display = 'none';
  field.style.display = 'grid';
  pause.style.display = 'block';
  resume.style.display = 'none';
}

function scoreResult() {
  modal.innerHTML = '';
}

pause.addEventListener('click', paused);
resume.addEventListener('click', resumeGame);
start.addEventListener('click', newGame);
score.addEventListener('click', scoreResult);
end.addEventListener('click', proceed);
