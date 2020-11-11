import header from './header.js';
import modal from './modal.js';
import Puzzle from './puzzle.js';

const mainMenu = document.querySelector('.modal-window');
const start = document.querySelector('.start');
const proceed = document.querySelector('.proceed');
const pause = document.querySelector('.pause');
const settingBtn = document.querySelector('.setting');

// function resumeGame() {
//   const board = document.querySelector('.area');
//   mainMenu.style.display = 'none';
//   board.hidden = false;
// }

function startGame() {
  header.show();
  header.startTimer();
  modal.hide();
  const board = document.querySelector('.area');
  board.remove();
  new Puzzle(4, 15).render();
  const newBoard = document.querySelector('.area');
  newBoard.hidden = false;
}

function pauseGame() {
  const board = document.querySelector('.area');
  board.style.display = 'none';
  modal.show();
}

function setting() {
  modal.setting();
}

start.addEventListener('click', startGame);
// proceed.addEventListener('click', resumeGame);
pause.addEventListener('click', pauseGame);
// settingBtn.addEventListener('click', setting);
// settingBtn.addEventListener('click', setting);
