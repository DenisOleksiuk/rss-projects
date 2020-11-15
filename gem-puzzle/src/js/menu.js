import header from './header.js';
import Puzzle from './puzzle.js';

class Menu {
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  render() {
    const parentFor = document.querySelector('.board');
    this.wrraper = document.createElement('div');
    this.wrraper.className = 'main-menu';
    this.wrraper.innerHTML = /* html */ `
      <h1 class="title">Главное меню</h1>
      <p class="proceed">Продолжить игру</p>
      <p class="start">Новая игра</p>
      <p class="save">Сохранить игру</p>
      <p class="score">Лучший результат</p>
      <p class="setting">Настройки</p>
      <p class="back"></p>
    `;
    parentFor.append(this.wrraper);

    const menu = document.querySelector('.main-menu');
    const title = menu.querySelector('.title');
    const proceed = menu.querySelector('.proceed');
    const start = menu.querySelector('.start');
    const save = menu.querySelector('.save');
    const score = menu.querySelector('.score');
    const settingBtn = menu.querySelector('.setting');
    const back = menu.querySelector('.back');
    this.elements = {
      menu,
      title,
      proceed,
      start,
      save,
      score,
      settingBtn,
      back
    };
    this.elements.start.addEventListener('click', this.newGame);
    this.elements.proceed.addEventListener('click', this.addClass);
    // this.elements.save.addEventListener('click', this.newGame);
    // this.elements.score.addEventListener('click', this.newGame);
  }

  show() {
    this.elements.modal.hidden = false;
  }

  hide() {
    this.elements.modal.hidden = true;
  }

  resumeGame() {
    const board = document.querySelector('.area');
    console.log(this.elements);
    this.elements.menu.style.display = 'none';
  }

  // eslint-disable-next-line class-methods-use-this
  newGame() {
    header.show();
    header.startTimer();
    const board = document.querySelector('.board');
    if (board) board.remove();
    const puzz = new Puzzle(4, 15);
    puzz.render();
  }

  addClass() {
    console.log('qwe');
    // this.elements.menu.classList.add('hidden');
  }

  remove() {
    this.wrraper.remove();
  }

  setting() {
    this.elements.title.textContent = 'Поле 3х3';
    this.elements.proceed.textContent = 'Поле 4х4';
    this.elements.start.textContent = 'Поле 5х5';
    this.elements.save.textContent = 'Поле 6х6';
    this.elements.score.textContent = 'Поле 7х7';
    this.elements.settingBtn.textContent = 'Поле 8х8';
    this.elements.back.textContent = 'Назад';
  }
}

export default new Menu(document.body);
