import header from './header.js';

class Puzzle {
  constructor(size, arr) {
    this.boardSize = size;
    this.arr = arr;
    this.elements = {
      gems: [],
      board: null
    };
  }

  render() {
    this.elements.gems = this.puzzleSolve();
    this.elements.board = document.createElement('div');
    this.elements.board.className = 'area';
    this.elements.board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
    this.elements.board.hidden = true;
    this.elements.board.append(this.createGems(this.elements.gems));
    document.body.append(this.elements.board);
    this.movePuzzle();
  }

  createGems(arr) {
    this.fragment = document.createDocumentFragment();
    const boardX = 420 / this.boardSize;
    const boardY = 400 / this.boardSize;
    arr.forEach((i) => {
      const chip = document.createElement('div');
      // find the row and colm gems for the position img
      let xImg = Math.floor((i % this.boardSize) || this.boardSize) * boardY - 1 * boardY;
      let yImg = Math.ceil(i / this.boardSize) * boardX - 1 * boardX;
      if (i) {
        chip.classList.add('chip');
        chip.style.width = `calc(${384 + 'px' / this.boardSize})`;
        chip.style.backgroundPosition = `${-xImg}px ${-yImg}px`;
        chip.id = i;
        chip.textContent = i;
      } else {
        chip.classList.add('empty');
        chip.id = 0;
      }
      this.fragment.appendChild(chip);
    });
    return this.fragment;
  }

  movePuzzle() {
    const chep = document.querySelectorAll('.chip');
    const audio = new Audio('./assets/button18.wav');
    chep.forEach((each) => {
      each.addEventListener('click', (e) => {
        header.stepCounter();
        const empty = this.elements.gems.indexOf(0);
        const moving = this.elements.gems.indexOf(+e.target.id);
        if (moving - this.boardSize === empty || moving + this.boardSize === empty
          || moving - 1 === empty || moving + 1 === empty) {
          this.elements.gems[empty] = this.elements.gems[moving];
          this.elements.gems[moving] = 0;
          this.elements.board.innerHTML = '';
          this.elements.board.append(this.createGems(this.elements.gems));
          document.body.append(this.elements.board);
          audio.play();
          const winPos = [...this.elements.gems].sort((a, b) => a - b);
          winPos.shift(0);
          winPos.push(0);
          if (JSON.stringify(this.elements.gems) === JSON.stringify(winPos)) {
            const victory = new Audio('./assets/win.wav');
            victory.play();
            alert(`Ура! Вы решили головоломку за ${header.elements.timer.textContent} секунд, и ${header.elements.moveCounter.textContent} ходов`);
            this.movePuzzle();
            this.elements.board.innerHTML = '';
            this.elements.gems = this.puzzleSolve();
            this.elements.board.append(this.createGems(this.elements.gems));
            header.resetHeader();
          }
          this.movePuzzle();
        }
      });
    });
  }

  puzzleShuffle(arr) {
    this.gemPieces = [];
    for (let i = 1; i <= arr; i += 1) this.gemPieces.push(i);
    for (let i = this.gemPieces.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.gemPieces[i], this.gemPieces[j]] = [this.gemPieces[j], this.gemPieces[i]];
    }
    return this.gemPieces;
  }

  puzzleSolve() {
    const array = this.puzzleShuffle(this.arr);
    let k = 0;
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        if (array[j] > array[i]) {
          k += 1;
        }
      }
    }
    if (k % 2 !== 0) {
      return this.puzzleSolve();
    }
    array.push(0);
    return array;
  }
}
new Puzzle(8, 63).render();
export default Puzzle;
