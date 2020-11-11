import header from './header.js';

class Puzzle {
  constructor(size) {
    this.size = size;
    this.elements = {
      gems: null,
      board: null
    };
  }

  render() {
    this.elements.gems = this.puzzleSolve();
    this.elements.board = document.createElement('div');
    this.elements.board.className = 'area';
    this.elements.board.hidden = true;
    this.elements.board.append(this.createGems(this.elements.gems));
    document.body.append(this.elements.board);
    this.movePuzzle();
  }

  createGems(arr) {
    this.fragment = document.createDocumentFragment();
    const x = 420 / 4;
    const y = 400 / 4;
    arr.forEach((i) => {
      const chip = document.createElement('div');
      if (i) {
        chip.classList.add('chip');
        chip.id = i;
        chip.textContent = i;
        if (i > 0 && i < 5) {
          chip.style.backgroundPosition = '0 0';
        }
      } else {
        chip.classList.add('empty');
        chip.id = 0;
      }
      switch (i) {
        case 1: chip.style.backgroundPosition = '0 0';
          break;
        case 2: chip.style.backgroundPosition = `${-x}px 0`;
          break;
        case 3: chip.style.backgroundPosition = `${-x * 2}px 0`;
          break;
        case 4: chip.style.backgroundPosition = `${-x * 3}px 0`;
          break;
        case 5: chip.style.backgroundPosition = `0 ${y}px`;
          break;
        default:
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
        if (moving - 4 === empty || moving + 4 === empty
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

  puzzleShuffle(size) {
    this.gemPieces = [];
    for (let i = 1; i <= size; i += 1) this.gemPieces.push(i);
    for (let i = this.gemPieces.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.gemPieces[i], this.gemPieces[j]] = [this.gemPieces[j], this.gemPieces[i]];
    }
    return this.gemPieces;
  }

  puzzleSolve() {
    const array = this.puzzleShuffle(this.size);
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
new Puzzle(15).render();
export default Puzzle;
