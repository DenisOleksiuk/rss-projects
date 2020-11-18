import header from './header.js';
import Puzzle from './puzzle.js';
import Menu from './menu.js';
const puzzle = new Puzzle();
const menu = new Menu();
puzzle.render(document.body);
menu.render(document.querySelector('.board'));

const audioBtn = document.querySelector('.audio');
const pauseBtn = document.querySelector('.pause');

function audio() {
  header.toggleAudio();
}

pauseBtn.addEventListener('click', menu.pauseGame.bind(menu));
audioBtn.addEventListener('click', audio);
