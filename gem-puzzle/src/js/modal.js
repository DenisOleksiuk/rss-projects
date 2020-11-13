class Menu {
  constructor(parent) {
    this.parent = parent;
    this.render();
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'modal-window';
    this.element.innerHTML = /* html */`
      <h1 class="title">Главное меню</h1>
      <p class="proceed">Продолжить игру</p>
      <p class="start">Новая игра</p>
      <p class="save">Сохранить игру</p>
      <p class="score">Лучший результат</p>
      <p class="setting">Настройки</p>
      <p class="back"></p><p class="back"></p>
    `;
    this.parent.append(this.element);

    const modal = this.parent.querySelector('.modal-window');
    const title = modal.querySelector('.title');
    const proceed = modal.querySelector('.proceed');
    const start = modal.querySelector('.start');
    const save = modal.querySelector('.save');
    const score = modal.querySelector('.score');
    const settingBtn = modal.querySelector('.setting');
    const back = modal.querySelector('.back');
    this.elements = {
      modal, title, proceed, start, save, score, settingBtn, back
    };
  }

  show() {
    this.elements.modal.hidden = false;
  }

  hide() {
    this.elements.modal.hidden = true;
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
