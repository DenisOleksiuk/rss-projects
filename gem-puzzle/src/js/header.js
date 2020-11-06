export default function createHeader() {
  const Header = {
    timer: {
      min: 0,
      sec: 0
    },

    element: {
      header: null,
      info: null,
      descr: null,
      time: null,
      moves: null,
      move: null,
      counter: null,
      pause: null,
      resume: null
    },

    init() {
      this.element.header = document.createElement('header');
      this.element.info = document.createElement('div');
      this.element.descr = document.createElement('span');
      this.element.time = document.createElement('span');
      this.element.moves = document.createElement('div');
      this.element.move = document.createElement('span');
      this.element.counter = document.createElement('span');
      this.element.pause = document.createElement('button');
      this.element.resume = document.createElement('button');
      this.element.info.append(this.element.descr, this.element.time);
      this.element.moves.append(this.element.move, this.element.counter);
      this.element.header.append(
        this.element.info, this.element.moves, this.element.pause, this.element.resume
      );
      document.body.prepend(this.element.header);

      this.element.info.className = 'info';
      this.element.descr.className = 'description';
      this.element.time.className = 'time';
      this.element.moves.className = 'muves';
      this.element.move.className = 'description';
      this.element.counter.className = 'counter';
      this.element.pause.className = 'pause';
      this.element.resume.className = 'pause';
      this.element.pause.classList.add('visible');
      this.element.descr.textContent = 'Time ';
      this.element.time.textContent = '00 : 00';
      this.element.move.textContent = 'Moves ';
      this.element.pause.textContent = 'Pause Game';
      this.element.resume.textContent = 'Resume Game';
      this.element.counter.textContent = 0;

      // const info = document.querySelector('.info');
      // info.addEventListener('click', this.start.bind(this));
      // this.start();
    }
  };
  Header.init();
}
