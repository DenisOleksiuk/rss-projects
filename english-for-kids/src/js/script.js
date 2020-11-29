import { cardData } from './cardData.js';
import { WordCard } from './wordCard.js';

const humb = document.querySelector('.humb');
const menu = document.querySelector('.menu');
const cardsParent = document.querySelector('.cards');
const categoryCards = document.querySelectorAll('.category');
const nav = document.querySelector('.navigation');

// const adjective = new Audio('assets/mp3/adjectives/awful.mp3');

function active() {
  humb.classList.toggle('humb__active');
  menu.classList.toggle('menu__active');
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

function handleCardEvents(event) {
  if (event.target === cardsParent) return;

  if (event.target.closest('.category')) {
    showCategoryCards(event.target.closest('.category').id);
  } else if (event.target.alt === 'rotate') {
    const card = event.target.closest('.card__inner');
    rotate(card);
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

humb.addEventListener('click', active);
cardsParent.addEventListener('click', handleCardEvents);
nav.addEventListener('click', handleMenuClick);
