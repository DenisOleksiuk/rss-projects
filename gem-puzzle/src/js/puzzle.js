export default function createPuzzle() {
  const Puzzle = {
    elements: {
      area: null,
      gems: [],
      time: 0,
      counter: 0
    },

    audio: {
      click: new Audio('./assets/button18.wav'),
      victory: new Audio('./assets/win.wav')
    },

    timer: {
      min: 0,
      sec: 0
    },

    init() {
      this.elements.gems = this.puzzleSolve();
      this.elements.area = document.createElement('div');
      this.elements.area.className = 'area';
      this.elements.area.append(this.createGems(this.elements.gems));
      document.body.append(this.elements.area);
      this.movePuzzle();
      // this.startTimer();
    },

    createGems(arr) {
      const fragment = document.createDocumentFragment();
      arr.forEach((i) => {
        const chip = document.createElement('div');
        if (i) {
          chip.classList.add('chip');
          chip.id = i;
          chip.textContent = i;
        } else {
          chip.classList.add('empty');
          chip.id = 0;
        }
        fragment.appendChild(chip);
      });
      return fragment;
    },

    movePuzzle() {
      const chep = document.querySelectorAll('.chip');
      const count = document.querySelector('.counter');
      count.textContent = this.elements.counter;
      this.elements.counter += 1;
      chep.forEach((each) => {
        each.addEventListener('click', (e) => {
          const empty = this.elements.gems.indexOf(0);
          const moving = this.elements.gems.indexOf(+e.target.id);
          if (moving - 4 === empty || moving + 4 === empty
            || moving - 1 === empty || moving + 1 === empty) {
            this.elements.gems[empty] = this.elements.gems[moving];
            this.elements.gems[moving] = 0;
            this.elements.area.innerHTML = '';
            this.elements.area.append(this.createGems(this.elements.gems));
            document.body.append(this.elements.area);
            const win = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
            this.audio.click.play();
            if (JSON.stringify(this.elements.gems) === JSON.stringify(win)) {
              this.audio.victory.play();
              alert(`Ура! Вы решили головоломку за ${this.addZero(this.timer.min)} минут, ${this.addZero(this.timer.sec)} секунд и ${this.elements.counter} ходов`);
              this.movePuzzle();
              this.timer.min = 0;
              this.timer.sec = 0;
              this.elements.counter = 0;
              this.elements.area.innerHTML = '';
              this.elements.gems = this.puzzleSolve();
              this.elements.area.append(this.createGems(this.elements.gems));
            }
            this.movePuzzle();
          }
        });
      });
    },

    puzzleSolve() {
      const gemPieces = [];
      let k = 0;
      do {
        const piece = Math.floor(Math.random() * 16);
        if (!gemPieces.includes(piece)) {
          gemPieces.push(piece);
        }
      } while (gemPieces.length < 16);
      for (let i = 0; i < gemPieces.length - 1; i += 1) {
        for (let j = 0; j < i; j += 1) {
          if (gemPieces[j] > gemPieces[i]) {
            k += 1;
          }
        }
      }
      if (k % 2 !== 0) {
        return this.puzzleSolve();
      }
      return gemPieces;
    }
  };
  Puzzle.init();
}
