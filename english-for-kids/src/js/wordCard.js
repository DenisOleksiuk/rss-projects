class WordCard {
  constructor(parent, data) {
    this.parent = parent;
    this.data = data;
    this.rotateBtn = null;
  }

  render() {
    const {
      image,
      alt,
      word,
      translation
    } = this.data;

    const htmlCard = document.createElement('div');
    htmlCard.classList.add('card');
    htmlCard.innerHTML = `
    <div class="card__inner">
      <div class="card__front">
        <img class="card__img" src=${image} alt=${alt}>
        <div class="card__info">
          <h2 class="card__title">${word}</h2>
        </div>
        <div class="card__rotate--btn">
          <img class="card__rotate--icon" src="assets/images/rotate.svg" alt="rotate">
        </div>
      </div>
      <div class="card__back">
        <img class="img" src=${image} alt=${alt}">
        <h2 class="card__title">${translation}</h2>
      </div>
    </div>
    `;
    const btn = document.querySelector('.card__rotate--btn');
    console.log(btn);
    this.parent.append(htmlCard);
  }

  rotateCard(e) {
    this.rotateBtn = document.querySelectorAll('.card__rotate--btn');

    console.log(e);
  }
}

export { WordCard };
