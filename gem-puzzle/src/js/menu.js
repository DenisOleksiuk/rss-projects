export default function mainMenu() {
  const Menu = {
    elements: {
      modal: null,
      title: null,
      end: null,
      start: null,
      save: null,
      score: null,
      setting: null
    },

    init() {
      // reflow
      this.elements.modalWindow = document.createElement('div');
      this.elements.title = document.createElement('h1');
      this.elements.start = document.createElement('p');
      this.elements.end = document.createElement('p');
      this.elements.save = document.createElement('p');
      this.elements.score = document.createElement('p');
      this.elements.setting = document.createElement('p');
      this.elements.modalWindow.append(this.elements.title, this.elements.end,
        this.elements.start, this.elements.save,
        this.elements.score, this.elements.setting);
      document.body.append(this.elements.modalWindow);

      // repain
      this.elements.modalWindow.className = 'modal-window';
      this.elements.title.className = 'title';
      this.elements.end.className = 'end';
      this.elements.start.className = 'start';
      this.elements.save.className = 'save';
      this.elements.score.className = 'score';
      this.elements.setting.className = 'setting';
      this.elements.title.textContent = 'Главное меню';
      this.elements.end.textContent = 'Продолжить игру';
      this.elements.start.textContent = 'Новая игру';
      this.elements.save.textContent = 'Сохранить игру';
      this.elements.score.textContent = 'Лучший результат';
      this.elements.setting.textContent = 'Настройки';
    }
  };
  Menu.init();
}
