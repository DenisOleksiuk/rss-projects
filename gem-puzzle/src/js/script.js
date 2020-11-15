import header from './header.js';
import Puzzle from './puzzle.js';
import menu from './menu.js';

// const mainMenu = document.querySelector('.main-menu');
const start = document.querySelector('.start');
const audioBtn = document.querySelector('.audio');
const proceed = document.querySelector('.proceed');
const pause = document.querySelector('.pause');
const settingBtn = document.querySelector('.setting');
const back = document.querySelector('.back');

// function resumeGame() {
//   console.log(menu.elements.proceed.style);
//   menu.addClass();
// }

function newGame() {
  header.show();
  header.startTimer();
  const board = document.querySelector('.board');
  if (board) board.remove();
  const puzz = new Puzzle(4, 15);
  puzz.render();
}

function pauseGame() {
  if (pause.classList.contains('paused')) {
    menu.render();
  } else {
    menu.remove();
  }
}

function setting() {
  // const settingBtn = document.querySelector('.setting');
  menu.setting();
}

function backup() {
  const modalWindow = document.querySelector('.modal-window');
  modalWindow.hidden = true;
  menu.render();
}

function audio() {
  header.toggleAudio();
}

start.addEventListener('click', newGame);
// proceed.addEventListener('click', resumeGame);
pause.addEventListener('click', pauseGame);
settingBtn.addEventListener('click', setting);
back.addEventListener('click', backup);
audioBtn.addEventListener('click', audio);
