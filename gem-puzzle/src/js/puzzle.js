import header from './header.js';

class Puzzle {
  constructor(size, arr) {
    this.boardSize = size;
    this.arr = arr;
    this.colRow = 400 / this.boardSize;
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
    this.elements.board.style.setProperty('--chipSize', `${this.colRow - 4}px`);
    this.elements.board.hidden = true;
    document.body.append(this.elements.board);
    this.elements.board.append(this.createGems(this.elements.gems));
    this.movePuzzle();
  }

  createGems(arr) {
    this.fragment = document.createDocumentFragment();
    arr.forEach((el, i) => {
      // 3 it is padding
      const chip = document.createElement('div');
      const top = this.colRow * Math.trunc((i / this.boardSize)) + 2;
      const left = this.colRow * (i % this.boardSize) + 2;
      chip.style.top = `${top}px`;
      chip.style.left = `${left}px`;
      // find the row and colm gems for the position img
      let xImg = Math.floor((el % this.boardSize) - 1) * this.colRow;
      let yImg = Math.ceil(el / this.boardSize - 1) * this.colRow;
      if (el) {
        chip.classList.add('chip');
        chip.style.backgroundPosition = `${-xImg}px ${-yImg}px`;
        chip.id = el;
        chip.textContent = el;
      } else {
        chip.classList.add('empty');
        chip.id = 0;
      }
      this.fragment.appendChild(chip);
    });
    return this.fragment;
  }

  movePuzzle() {
    const chip = document.querySelectorAll('.chip');
    const zero = document.querySelector('.empty');

    chip.forEach((el) => {
      const elem = el;
      el.addEventListener('mouseup', (e) => {
        const audio = new Audio('./assets/button18.wav');
        const empty = this.elements.gems.indexOf(0);
        const moving = this.elements.gems.indexOf(+e.target.id);
        const leftDiff = Math.abs(parseInt(zero.style.left, 10) - parseInt(elem.style.left, 10));
        const topDiff = Math.abs(parseInt(zero.style.top, 10) - parseInt(elem.style.top, 10));
        if (leftDiff + topDiff === 100) {
          [zero.style.left, zero.style.top, elem.style.left, elem.style.top] = [
            elem.style.left, elem.style.top, zero.style.left, zero.style.top
          ];
          this.elements.gems[empty] = this.elements.gems[moving];
          this.elements.gems[moving] = 0;
          header.stepCounter();
          audio.play();
          const winPos = [...this.elements.gems].sort((a, b) => a - b);
          winPos.shift(0);
          winPos.push(0);
          if (JSON.stringify(this.elements.gems) === JSON.stringify(winPos)) {
            const victory = new Audio('./assets/win.wav');
            victory.play();
            alert(`Ура! Вы решили головоломку за ${header.elements.timer.textContent} секунд, и ${header.elements.moveCounter.textContent} ходов`);
            this.elements.board.innerHTML = '';
            this.elements.board.append(this.createGems(this.elements.gems));
            this.elements.gems = this.puzzleSolve();
            header.resetHeader();
          }
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
new Puzzle(4, 15).render();
export default Puzzle;
