import { cardData } from './cardData.js';
import { WordCard } from './wordCard.js';

const humb = document.querySelector('.humb');
const menu = document.querySelector('.menu');
const cardsAll = document.querySelector('.cards');
const category = document.querySelectorAll('.category');
const rotate = document.querySelectorAll('.card__rotate--btn');

const adjective = new Audio('assets/mp3/adjectives/awful.mp3');

function active() {
  humb.classList.toggle('humb__active');
  menu.classList.toggle('menu__active');
}

function rotateBtn(n) {
  const parent = n.target.closest('.card__inner');
  parent.classList.toggle('card__rotate');
  adjective.play();
}

function getTargetCard(card) {
  return card.target.closest('.category').id;
}

function switchCards(id) {
  category.forEach((mainCard) => {
    mainCard.setAttribute('hidden', '');
  });

  for (let i = 0; i < cardData[getTargetCard(id)].length; i += 1) {
    const cardObj = cardData[getTargetCard(id)];
    const card = new WordCard(document.querySelector('.cards'), cardObj[i]);
    card.render();
  }

  cardsAll.removeEventListener('click', switchCards);
}

humb.addEventListener('click', active);
cardsAll.addEventListener('click', switchCards);

rotate.forEach(items => {
  items.addEventListener('click', rotateBtn);
});