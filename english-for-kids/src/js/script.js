import { cardData } from './cardData.js';
import { WordCard } from './wordCard.js';

const humb = document.querySelector('.humb');
const menu = document.querySelector('.menu');
const cardsParent = document.querySelector('.cards');
const category = document.querySelectorAll('.category');

// const adjective = new Audio('assets/mp3/adjectives/awful.mp3');

function active() {
  humb.classList.toggle('humb__active');
  menu.classList.toggle('menu__active');
}

// function rotateBtn(n) {
//   const parent = n.target.closest('.card__inner');
//   parent.classList.toggle('card__rotate');
//   adjective.play();
// }

function getIdCard(card) {
  return card.target.closest('.category').id;
}

function switchCards(cardElement) {
  if (cardElement.target === cardsParent) return;
  category.forEach((mainCard) => {
    mainCard.setAttribute('hidden', '');
  });

  for (let i = 0; i < cardData[getIdCard(cardElement)].length; i += 1) {
    const cardObj = cardData[getIdCard(cardElement)];
    const card = new WordCard(document.querySelector('.cards'), cardObj[i]);
    card.render();
    card.rotateCard('cardElement');
  }

  cardsParent.removeEventListener('click', switchCards);
}

humb.addEventListener('click', active);
cardsParent.addEventListener('click', switchCards);
