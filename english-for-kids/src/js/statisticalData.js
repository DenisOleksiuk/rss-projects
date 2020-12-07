function deleteStatistics() {
  delete localStorage.wordStats;
}

function makeStatWord(str) {
  return {
    word: str,
    asked: 0,
    hit: 0,
    miss: 0,
    train: 0
  };
}

class Statistic {
  constructor(parent, words) {
    this.parent = parent;

    this.words = JSON.parse(localStorage.wordStats || 0) || Object.fromEntries(Object.entries(words)
      .map(([cat, items]) => [cat, items.map((item) => makeStatWord(item.word))]));
  }

  render() {
    this.stat = document.createElement('section');
    this.stat.classList.add('statistics');
    this.stat.innerHTML = /* html */ `
    <div class="statistics__row" data-rev="col">
      <div class="statistics__title" data-rev="col">Category / Word</div>
      <div class="statistics__ask" data-rev="col">Asked</div>
      <div class="statistics__hit" data-rev="col">Hit</div>
      <div class="statistics__miss" data-rev="col">Miss</div>
      <div class="statistics__persent" data-rev="col">% Wrong</div>
      <div class="statistics__train" data-rev="col">Train</div>
    </div>

    ${Object.entries(this.words).map(([cat, items]) => /* html */ `
      <div class="statistics__category">${cat}</div>
      ${items.map(({
    word, asked, hit, miss, train
  }) => /* html */ `
      <div class="statistics__row">
        <div class="name">${word}</div>
        <div class="asked">${asked}</div>
        <div class="hits">${hit}</div>
        <div class="miss">${miss}</div>
        <div class="percents">${Math.round((miss / (hit + miss)) * 100) || 0}</div>
        <div class="train">${train}</div>
      </div>
    `).join('')
}
`).join('')}
    `;
    this.parent.append(this.stat);
  }

  renderBtns() {
    this.btns = document.createElement('div');
    this.btns.classList.add('statistics__btns');
    this.btns.setAttribute('hidden', '');
    this.btns.innerHTML = /* html */ `
    <div class="statistics__wrraper">
      <button class="statistics__btn">Repeat difficult words</button>
      <button class="statistics__btn-del">Reset</button>
    </div>
  `;

    this.parent.after(this.btns);

    const reset = document.querySelector('.statistics__btn-del');
    reset.addEventListener('click', deleteStatistics);
  }

  increase(cat, word, stat) {
    const wordItem = this.words[cat].find((item) => item.word === word);
    wordItem[stat] += 1;
    localStorage.wordStats = JSON.stringify(this.words);
  }

  hideBtns() {
    this.btns.hidden = !this.btns.hidden;
  }

  removeStats() {
    this.stat.remove();
  }
}

export {
  Statistic
};
