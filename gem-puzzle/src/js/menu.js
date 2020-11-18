import header from './header.js';
import Puzzle from './puzzle.js';

class Menu {
  render(parent) {
    let becauseOfLinter = parent;
    becauseOfLinter = document.querySelector('.board');
    this.mainMenu = document.createElement('div');
    this.mainMenu.className = 'main-menu';
    this.mainMenu.innerHTML = /* html */ `
      <h1 class="title">Главное меню</h1>
      <p class="proceed">Продолжить игру</p>
      <p class="start">Новая игра</p>
      <p class="save">Сохранить игру</p>
      <p class="score">Лучший результат</p>
      <p class="setting">Настройки</p>
      <p class="back"></p>
    `;
    becauseOfLinter.append(this.mainMenu);

    const menu = document.querySelector('.main-menu');
    const title = menu.querySelector('.title');
    const proceed = menu.querySelector('.proceed');
    const start = menu.querySelector('.start');
    const save = menu.querySelector('.save');
    const score = menu.querySelector('.score');
    const settingBtn = menu.querySelector('.setting');
    this.elements = {
      menu,
      title,
      proceed,
      start,
      save,
      score,
      settingBtn
    };
    this.elements.proceed.addEventListener('click', this.continue.bind(this));
    this.elements.start.addEventListener('click', this.newGame.bind(this));
    this.elements.settingBtn.addEventListener('click', this.createSetting.bind(this));
  }

  settingBack() {
    const select = document.querySelector('.select-box');
    this.value = +select.value;
    this.pieces = this.value ** 2;
    this.remove();
    this.render();
  }

  createSetting() {
    this.menu = document.querySelector('.main-menu');
    this.menu.innerHTML = /* html */ `
    <div class="setting-menu">
      <label class="change-field">Выбрать поле: </label>
      <select class="select-box">
        <option class="select-option" value="3">3x3</option>
        <option class="select-option" value="4" selected="">4x4</option>
        <option class="select-option" value="5">5x5</option>
        <option class="select-option" value="6">6x6</option>
        <option class="select-option" value="7">7x7</option>
        <option class="select-option" value="8">8x8</option>
      </select>
      <button class="setting-btn" data-screen="main">Назад</button>
    </div>
    `;
    const btn = document.querySelector('.setting-btn');
    btn.addEventListener('click', this.settingBack.bind(this));
  }

  show() {
    this.elements.menu.hidden = false;
  }

  hide() {
    if (!header.elements.header.hidden) {
      header.elements.pauseBtn.classList.remove('paused');
      header.paused = false;
      this.elements.menu.remove();
    }
  }

  pauseGame() {
    const pause = document.querySelector('.pause');
    if (pause.classList.contains('paused')) {
      this.render();
    } else {
      this.remove();
    }
  }

  continue() {
    header.resumeTimer();
    this.hide();
  }

  // eslint-disable-next-line class-methods-use-this
  newGame() {
    header.show();
    header.startTimer();
    const board = document.querySelector('.board');
    if (board) board.remove();
    const puzzle = new Puzzle(this.value);
    puzzle.render(document.body);
    this.elements.start.addEventListener('click', this.newGame.bind(this));
  }

  remove() {
    this.mainMenu.remove();
  }
}
export default Menu;
