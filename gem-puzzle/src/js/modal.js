export default function modalWindow() {
  class Menu {
    constructor() {
      this.modal = null;
      this.title = null;
      this.end = null;
      this.start = null;
      this.save = null;
      this.score = null;
      this.setting = null;
    }

    init() {
      // reflow
      this.modal = document.createElement('div');
      this.title = document.createElement('h1');
      this.start = document.createElement('p');
      this.end = document.createElement('p');
      this.save = document.createElement('p');
      this.score = document.createElement('p');
      this.setting = document.createElement('p');
      this.modal.append(this.title, this.end,
        this.start, this.save,
        this.score, this.setting);
      document.body.append(this.modal);

      // repain
      this.modal.className = 'modal-window';
      this.title.className = 'title';
      this.end.className = 'end';
      this.start.className = 'start';
      this.save.className = 'save';
      this.score.className = 'score';
      this.setting.className = 'setting';
      this.title.textContent = 'Главное меню';
      this.end.textContent = 'Продолжить игру';
      this.start.textContent = 'Новая игру';
      this.save.textContent = 'Сохранить игру';
      this.score.textContent = 'Лучший результат';
      this.setting.textContent = 'Настройки';
    }
  }
  const mainMenu = new Menu();
  mainMenu.init();
}
