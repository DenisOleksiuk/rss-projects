import header from './header.js';

function generateShuffledRange(maxNum) {
  const gemPieces = [];
  for (let i = 1; i <= maxNum; i += 1) gemPieces.push(i);
  for (let i = gemPieces.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [gemPieces[i], gemPieces[j]] = [gemPieces[j], gemPieces[i]];
  }
  return gemPieces;
}

class Puzzle {
  constructor(size = 4) {
    this.boardSize = size;
    this.gemCount = this.boardSize ** 2 - 1;
    this.widthBoard = 400;
  }

  render(parent) {
    if (document.documentElement.clientWidth < 500) this.widthBoard = 300;
    this.gems = this.solve();
    this.board = document.createElement('div');
    this.board.className = 'board';
    this.board.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`;
    this.widthAndHeightChips = this.widthBoard / this.boardSize;
    this.board.style.setProperty('--chipSize', `${this.widthAndHeightChips - 4}px`);
    parent.append(this.board);
    this.board.append(this.createGems(this.gems));
    this.movePuzzle();
  }

  createGems(arr) {
    this.fragment = document.createDocumentFragment();
    arr.forEach((el, i) => {
      // 3 it is padding
      const chip = document.createElement('div');
      const top = this.widthAndHeightChips * Math.trunc((i / this.boardSize)) + 2;
      const left = this.widthAndHeightChips * (i % this.boardSize) + 2;
      chip.style.top = `${top}px`;
      chip.style.left = `${left}px`;
      // find the row and colm gems for the position img
      let xImg = Math.floor((el % this.boardSize) - 1) * this.widthAndHeightChips;
      let yImg = Math.ceil(el / this.boardSize - 1) * this.widthAndHeightChips;
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
    const chips = document.querySelectorAll('.chip');
    const zero = document.querySelector('.empty');
    chips.forEach((el) => {
      const elem = el;

      const mouseDown = (eventDown) => {
        elem.classList.add('move');
        const whereLeft = elem.style.left;
        const whereTop = elem.style.top;
        elem.style.zIndex = 44;
        const parentTop = this.board.getBoundingClientRect().y;
        const parentLeft = this.board.getBoundingClientRect().x;
        let shiftX = eventDown.clientX - elem.getBoundingClientRect().left;
        let shiftY = eventDown.clientY - elem.getBoundingClientRect().top;
        const leftDiff = Math.abs(
          Math.trunc(parseFloat(zero.style.left) - parseFloat(elem.style.left))
        );
        const topDiff = Math.abs(
          Math.trunc(parseFloat(zero.style.top) - parseFloat(elem.style.top))
        );

        function moveAt(pageX, pageY) {
          elem.style.left = pageX - shiftX - parentLeft + 'px';
          elem.style.top = pageY - shiftY - parentTop + 'px';
        }
        moveAt(eventDown.pageX, eventDown.pageY);

        const mouseMove = (event) => {
          moveAt(event.pageX, event.pageY);
          elem.ondragstart = () => {
            return false;
          };
        };
        document.addEventListener('mousemove', mouseMove);

        const mouseUp = (eventUp) => {
          elem.style.zIndex = 1;
          elem.classList.remove('move');
          document.removeEventListener('mousemove', mouseMove);
          if (leftDiff + topDiff === this.checkDifference()) {
            elem.style.left = zero.style.left;
            elem.style.top = zero.style.top;
            [zero.style.left, zero.style.top] = [whereLeft, whereTop];
            const empty = this.gems.indexOf(0);
            const moving = this.gems.indexOf(+eventUp.target.id);
            this.gems[empty] = this.gems[moving];
            this.gems[moving] = 0;
            header.stepCounter();
            const audio = new Audio('./assets/gem.wav');
            if (header.audio) audio.play();
            const winPos = [...this.gems].sort((a, b) => a - b);
            winPos.shift(0);
            winPos.push(0);
            if (JSON.stringify(this.gems) === JSON.stringify(winPos)) {
              const victory = new Audio('./assets/win.wav');
              victory.play();
              alert(`Ура! Вы решили головоломку за ${header.elements.timer.textContent} секунд, и ${header.elements.moveCounter.textContent} ходов`);
              this.board.innerHTML = '';
              this.board.append(this.createGems(this.gems));
              this.gems = this.solve();
              header.resetHeader();
            }
          } else {
            elem.style.left = whereLeft;
            elem.style.top = whereTop;
          }
          elem.removeEventListener('mouseup', mouseUp);
        };
        elem.addEventListener('mouseup', mouseUp);
      };
      elem.addEventListener('mousedown', mouseDown);
    });
  }

  checkDifference() {
    return Math.trunc(this.widthBoard / this.boardSize);
  }

  solve() {
    const array = generateShuffledRange(this.gemCount);
    let k = 0;
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < i; j += 1) {
        if (array[j] > array[i]) {
          k += 1;
        }
      }
    }
    if (k % 2 !== 0) {
      return this.solve();
    }
    array.push(0);
    return array;
  }
}
export default Puzzle;
