import { cardData } from './cardData.js';
import { WordCard } from './wordCard.js';

const cardsParent = document.querySelector('.cards');
const categoryCards = document.querySelectorAll('.category');
const nav = document.querySelector('.navigation');
const switcher = document.querySelector('.switcher');
const footer = document.querySelector('.footer');

function toggleGameMode() {
  const switcherInput = switcher.querySelector('.switcher__input');
  const play = footer.querySelector('.play');
  const playInput = play.querySelector('.play__input');
  const playBtn = footer.querySelector('.play__btn');

  switcherInput.checked = !switcherInput.checked;
  footer.hidden = !footer.hidden;
  playBtn.hidden = !playBtn.hidden;

  if (!switcherInput.checked) {
    cardsParent.classList.add('cards__play');
  } else {
    cardsParent.classList.remove('cards__play');
  }

  play.addEventListener('click', () => {
    playInput.checked = !playInput.checked;
  });
}

function navMenu(event) {
  const humb = document.querySelector('.humb');
  const menu = document.querySelector('.menu');
  const ul = document.querySelector('.menu__list');
  if (event.target.closest('.humb')) {
    humb.classList.toggle('humb__active');
    menu.classList.toggle('menu__active');
  } else if (event.target !== ul && event.target !== menu) {
    humb.classList.remove('humb__active');
    menu.classList.remove('menu__active');
  }
}

function showCategories() {
  cardsParent.querySelectorAll('.card').forEach((card) => card.remove());
  categoryCards.forEach((card) => card.removeAttribute('hidden'));
}

function showCategoryCards(category) {
  categoryCards.forEach((card) => card.setAttribute('hidden', ''));
  cardsParent.querySelectorAll('.card').forEach((card) => card.remove());

  const words = cardData[category];
  for (let i = 0; i < words.length; i += 1) {
    const card = new WordCard(document.querySelector('.cards'), words[i]);
    card.render();
  }
}

function handleBackRotate(event) {
  const rotatedCard = event.target.closest('.card__rotate');
  if (rotatedCard === null) {
    cardsParent.querySelector('.card__rotate').classList.remove('card__rotate');
    document.body.removeEventListener('mousemove', handleBackRotate);
  }
}

function rotate(element) {
  const card = element;
  card.classList.add('card__rotate');
  card.ontransitionend = () => {
    document.body.addEventListener('mousemove', handleBackRotate);
    card.ontransitionend = null;
  };
}

function audioVoice(element) {
  const audio = element.querySelector('audio');
  audio.play();
}

function handleCardEvents(event) {
  if (event.target === cardsParent) return;
  const card = event.target.closest('.card__inner');
  if (event.target.closest('.category')) {
    showCategoryCards(event.target.closest('.category').id);
  } else if (event.target.alt === 'rotate') {
    rotate(card);
  } else if (card) {
    audioVoice(card);
  }
}

function handleMenuClick(event) {
  if (event.target.tagName === 'A') {
    const { id } = event.target.dataset;
    if (id === 'main') {
      showCategories();
    } else {
      showCategoryCards(id);
    }
  }
}

switcher.addEventListener('click', toggleGameMode);
document.body.addEventListener('click', navMenu);
cardsParent.addEventListener('click', handleCardEvents);
nav.addEventListener('click', handleMenuClick);
