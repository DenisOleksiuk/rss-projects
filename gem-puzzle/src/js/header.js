function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, 0)} : ${String(seconds % 60).padStart(2, 0)}`;
}

class Header {
  constructor(parent) {
    this.parent = parent;
    this.time = 0;
    this.step = 0;
    this.paused = false;
    this.audio = false;
    this.render();
    const { pauseBtn } = this.elements;
    pauseBtn.onclick = () => {
      if (this.paused) {
        this.paused = false;
        this.resumeTimer();
        pauseBtn.classList.remove('paused');
      } else {
        this.paused = true;
        this.pauseTimer();
        pauseBtn.classList.add('paused');
      }
    };
  }

  render() {
    this.parent.innerHTML = /* html */`
      <header hidden>
        <div class="info">
          <span class="description">Время</span>
          <span class="time">00 : 00</span>
        </div>
        <div class="audio">
        <i class="fas fa-volume-mute"></i>
      </div>
        <div class="muves">
          <span class="description">Ходы </span>
          <span class="counter">0</span>
        </div>
        <button class="pause">
          <span>Пауза</span>
          <span>Возобновить</span>
        </button>
      </header>
    `;
    const header = this.parent.querySelector('header');
    const timer = header.querySelector('.time');
    const moveCounter = header.querySelector('.counter');
    const pauseBtn = header.querySelector('.pause');
    const wrraper = header.querySelector('.audio');
    this.elements = {
      header, timer, moveCounter, pauseBtn, wrraper
    };
  }

  show() {
    this.elements.header.hidden = false;
  }

  hide() {
    this.elements.header.hidden = true;
  }

  toggleAudio() {
    this.audio = !this.audio;
    if (this.audio) {
      this.elements.wrraper.innerHTML = '<i class="fa fa-volume-up audio"></i>';
    } else {
      this.elements.wrraper.innerHTML = '<i class="fa fa-volume-mute audio"></i>';
    }
  }

  showTime() {
    return this.elements.timer.innerText;
  }

  stepCounter() {
    this.step += 1;
    this.elements.moveCounter.textContent = this.step;
  }

  resetHeader() {
    this.time = 0;
    this.step = 0;
    this.paused = false;
    this.elements.timer.innerText = '00 : 00';
    this.elements.pauseBtn.classList.remove('paused');
  }

  updateTimer() {
    this.elements.timer.innerText = formatTime(this.time);
  }

  startTimer() {
    this.resetHeader();
    this.resumeTimer();
  }

  pauseTimer() {
    clearInterval(this.timer);
  }

  resumeTimer() {
    this.timer = setInterval(() => {
      this.time += 1;
      this.updateTimer();
    }, 1000);
  }
}
export default new Header(document.body);
