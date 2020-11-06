export default function createPuzzle() {
  const Puzzle = {
    elements: {
      area: null,
      gems: [],
      counter: 0
    },

    init() {
      this.elements.gems = this.puzzleSolve();
      this.elements.area = document.createElement('div');
      this.elements.area.className = 'area';
      this.elements.area.append(this.createGems(this.elements.gems));
      document.body.append(this.elements.area);
      this.movePuzzle();
    },

    createGems(arr) {
      const fragment = document.createDocumentFragment();
      arr.forEach((i) => {
        const chep = document.createElement('div');
        if (i) {
          chep.classList.add('chep');
          chep.id = i;
          chep.textContent = i;
        } else {
          chep.classList.add('empty');
          chep.id = 0;
        }
        fragment.appendChild(chep);
      });
      return fragment;
    },

    movePuzzle() {
      const chep = document.querySelectorAll('.chep');
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
            if (JSON.stringify(this.elements.gems) === JSON.stringify(win)) {
              alert('Вы выйграли');
              this.movePuzzle();
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

      for (let i = 0; i < gemPieces.length; i += 1) {
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
