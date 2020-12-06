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
    const stat = document.createElement('section');
    stat.classList.add('statistics');

    const btns = document.createElement('div');
    btns.classList.add('statistics__btns');

    stat.innerHTML = /* html */ `
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
      `).join('')}
    `).join('')}
    `;

    btns.innerHTML = /* html */`
    <div class="statistics__wrraper">
      <button class="statistics__btn">Repeat difficult words</button>
      <button class="statistics__btn-del">Reset</button>
    </div>
  `;

    this.parent.append(stat);
    this.parent.after(btns);

    const reset = document.querySelector('.statistics__btn-del');
    reset.addEventListener('click', deleteStatistics);
  }

  increase(cat, word, stat) {
    const wordItem = this.words[cat].find((item) => item.word === word);
    wordItem[stat] += 1;
    localStorage.wordStats = JSON.stringify(this.words);
  }
}

export { Statistic };
